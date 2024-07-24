import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AddTransaction from "./AddTransaction.jsx";
function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [username, setUsername] = useState("");
    const [categories, setCategories] = useState([]);

    let fetchData = React.useCallback( async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/expenses/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setExpenses(response.data);
    }, []);

    let fetchUsername = React.useCallback( async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/user/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        setUsername(response.data);
    }, []);

    let fetchCategories = React.useCallback( async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/category/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setCategories(response.data);
    }, []);


    useEffect(() => {
        fetchData();
        fetchUsername();
        fetchCategories();
    }, [fetchData, fetchUsername, fetchCategories]);

    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/");
    };

    const handleDelete = async (e) => {
        let id = e.target.getAttribute("expense-id");
        const token = localStorage.getItem("token");
        try{
            const response = await axios.delete(`http://localhost:8080/api/expenses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("Delete successful", response.data);
            fetchData();
        }catch (error){
            console.error(error)
        }

    };

    return(
        <div className="dashboard-container">
            <header>
                <h1>FinanceTracker</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>
            <h3 className="welcome-message">Welcome {username}</h3>
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
                                <td>{categories.find(c => c.id === expense.categoryId).name}</td>
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
