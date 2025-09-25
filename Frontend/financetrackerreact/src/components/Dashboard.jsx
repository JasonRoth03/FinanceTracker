import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AddTransaction from "./AddTransaction.jsx";
function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [name, setName] = useState("");
    const [total, setTotal] = useState(0);
    const apiUrl = import.meta.env.VITE_API_URL;

    let fetchData = React.useCallback( async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiUrl}/api/expenses/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setExpenses(response.data);
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

    const handleDelete = async (e) => {
        const id = e.target.getAttribute("expense-id");
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
            <header>
                <h1>FinanceTracker</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>
            <h3 className="welcome-message">Welcome {name}</h3>
            <h2 className="expenses-title">Total Expenses: ${total}</h2>
            <AddTransaction fetchData={fetchData}/>
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>Expense</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) =>{
                        return (
                            <tr key={expense.id}>
                                <td>{expense.description}</td>
                                <td>{expense.amount}</td>
                                <td>{expense.category}</td>
                                <td>{expense.date}</td>
                                <td>
                                    {/* eslint-disable-next-line react/no-unknown-property */}
                                    <button onClick={handleDelete} expense-id={expense.id}>Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
