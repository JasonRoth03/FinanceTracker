import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AddTransaction from "./AddTransaction.jsx";
function Dashboard() {
    const [expenses, setExpenses] = useState([]);

    let fetchData = React.useCallback( async () => {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/expenses/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        setExpenses(response.data);
    }, []);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/");
    };

    return(
        <div>
            <h2>DashBoard</h2>
            <button onClick={handleLogout}>Logout</button>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id}>{expense.description}: ${expense.amount}</li>
                ))}
            </ul>
            <AddTransaction fetchData={fetchData} />
        </div>
    );
}
export default Dashboard;
