import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AddTransaction from "./AddTransaction.jsx";
import Header from './Header.jsx'
function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [name, setName] = useState("");
    const [total, setTotal] = useState(0);
    const apiUrl = import.meta.env.VITE_API_URL;

    let fetchData = React.useCallback( async () => {
        const token = localStorage.getItem("token");
        try{
            const response = await axios.get(`${apiUrl}/api/expenses/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Ensure we always store an array in state to avoid .map runtime errors
            const data = response && response.data ? response.data : [];
            setExpenses(Array.isArray(data) ? data : []);
        }catch(err){
            console.error('fetchData error', err);
            // On error, keep expenses as empty array to avoid crashing the UI
            setExpenses([]);
        }
    }, [apiUrl]);

    let fetchName = React.useCallback( async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiUrl}/api/user/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        setName(response.data.firstName + " " + response.data.lastName);
    }, [apiUrl]);

    useEffect(() => {
        fetchData();
        fetchName();
    }, [fetchData, fetchName]);

    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/");
    };

    useEffect(() => {
        let t = 0;
        for(const e of expenses){
            t += e.amount;
        }
        setTotal(t);
    },[expenses])

    const handleDelete = async (id) => {
        if (!id) return;
        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(`${apiUrl}/api/expenses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Delete successful", response.data);
            await fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className="dashboard-container">
                        <Header onLogout={handleLogout} />
            <h3 className="welcome-message">Welcome {name}</h3>
            <h2 className="expenses-title">Total Expenses: ${total}</h2>
            <AddTransaction fetchData={fetchData}/>
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(expenses) && expenses.length ? (
                        expenses.map((expense) => {
                            // defensive rendering in case some fields are missing
                            const id = expense && (expense._id || expense.id) ? (expense._id || expense.id) : Math.random().toString(36).slice(2,9);
                            const desc = expense && expense.description ? expense.description : '';
                            const amt = expense && typeof expense.amount === 'number' ? expense.amount : 0;
                            const dt = expense && expense.date ? new Date(expense.date).toLocaleDateString() : '';
                            const cat = expense && expense.category ? expense.category : '';
                            return (
                                <tr key={id}>
                                    <td>{desc}</td>
                                    <td>{new Intl.NumberFormat(undefined, {style: 'currency', currency: 'USD'}).format(amt)}</td>
                                    <td>{dt}</td>
                                    <td>{cat}</td>
                                    <td>
                                        <button className="delete-btn" onClick={() => handleDelete(id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan="5">No expenses found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
