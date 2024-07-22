import {useState} from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function AddTransaction({fetchData}){
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date());
    const [categoryId, setCategoryId] = useState("");

    const handleNewTransaction = async (e) => {
        e.preventDefault();
        const transactionData = {
            description,
            amount,
            date,
            categoryId,
        }
        try{
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:8080/api/expenses/", transactionData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            fetchData();
        }catch (error){
            console.log('new transaction failed',error);
        }
    }
    return(
        <div>
            <h3>Add a Transaction</h3>
            <form onSubmit={handleNewTransaction}>
                <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} required/>
                <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} required/>
                <input type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} required/>
                <input type="text" placeholder="Category" onChange={(e) => setCategoryId(e.target.value)} required/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddTransaction
