import {useState} from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function AddTransaction({fetchData}){
    const [description, setDescription] = useState("");
    // amountStr holds numeric text only (e.g. "12.34"). The $ prefix is shown visually.
    const [amountStr, setAmountStr] = useState("");
    const [amountFocused, setAmountFocused] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().slice(0,10));
    const [category, setCategory] = useState("");
    const apiUrl = import.meta.env.VITE_API_URL;

    const parseAmount = (str) => {
        if (!str) return 0;
        const cleaned = String(str).replace(/[^0-9.\-]/g, '');
        const val = parseFloat(cleaned);
        return Number.isFinite(val) ? val : 0;
    }

    const handleNewTransaction = async (e) => {
        e.preventDefault();
        const numericAmount = parseAmount(amountStr);
        const transactionData = {
            description,
            amount: numericAmount,
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
            // Clear the form after successful submit
            setDescription("");
            setAmountStr("");
            setDate(new Date().toISOString().slice(0,10));
            setCategory("");
            await fetchData();
        }catch (error){
            console.log('new transaction failed',error);
        }
    }

    const handleAmountChange = (e) => {
        const raw = e.target.value;
        // Keep only digits, optional dot and leading -
        const cleaned = String(raw).replace(/[^0-9.\-]/g, '');
        setAmountStr(cleaned);
    }

    const formatCurrency = (raw) => {
        if (!raw && raw !== 0) return '';
        const cleaned = String(raw).replace(/[^0-9.\-]/g, '');
        const v = parseFloat(cleaned);
        if (!Number.isFinite(v)) return '';
        return new Intl.NumberFormat(undefined, {style: 'currency', currency: 'USD'}).format(v);
    }

    return(
        <div className="add-transaction-container">
            <h3>Add a Transaction</h3>
            <form className="styled-form" onSubmit={handleNewTransaction}>
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                <div className="amount-input-wrapper">
                    <input
                        type="text"
                        inputMode="decimal"
                        className="amount-input"
                        placeholder="Amount"
                        value={amountFocused ? amountStr : (amountStr ? formatCurrency(amountStr) : '')}
                        onChange={handleAmountChange}
                        onFocus={() => setAmountFocused(true)}
                        onBlur={() => setAmountFocused(false)}
                        required
                    />
                </div>
                <input className="date-input" type="date" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} required/>
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddTransaction
