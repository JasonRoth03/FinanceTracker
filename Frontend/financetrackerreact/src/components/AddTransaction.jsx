import {useState} from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function AddTransaction({fetchData}){
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date());
    const [category, setCategory] = useState("");
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleNewTransaction = async (e) => {
        e.preventDefault();
        const transactionData = {
            description,
            amount,
            date,
            category,
        }
        try{
            const token = localStorage.getItem("token");
            await axios.post(`${apiUrl}/api/expenses/`, transactionData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchData();
        }catch (error){
            console.log('new transaction failed',error);
        }
    }
    return(
        <div className="add-transaction-container">
            <h3>Add a Transaction</h3>
            <form className="styled-form" onSubmit={handleNewTransaction}>
                <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} required/>
                <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} required/>
                <input type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} required/>
                <input type="text" placeholder="Category" onChange={(e) => setCategory(e.target.value)} required/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddTransaction
