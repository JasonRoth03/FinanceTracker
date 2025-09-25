import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './modules/auth.css';
import AuthCard from './AuthCard.jsx'

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            await axios.post(`${apiUrl}/api/register`, {firstName, lastName, username, password});
            navigate("/")
        }catch (error){
            console.log('register failed',error)
        }
    }

    const handleLogin = () => {
        navigate("/");
    }

    return (
        <AuthCard title="Register" secondaryLabel="Login Page" onSecondaryClick={handleLogin}>
            <form onSubmit={handleRegister} className="styled-form">
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                       placeholder="First Name" required/>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                       placeholder="Last Name" required/>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                       placeholder="Username" required/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                       placeholder="Password" required/>
                <button className="submit-button" type="submit">Register</button>
            </form>
        </AuthCard>
    );
}

export default Register;
