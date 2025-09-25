import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './modules/auth.css'
import AuthCard from './AuthCard.jsx'

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${apiUrl}/api/login`, {username, password});
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        }catch (error){
            console.log('login failed', error);
        }
    }

    const handleRegister = (e) => {
        e.preventDefault();
        navigate("/register");
    }

    return (
        <AuthCard title="Login" secondaryLabel="Register Page" onSecondaryClick={handleRegister}>
            <form onSubmit={handleLogin} className="styled-form">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                <button className="submit-button" type="submit">Login</button>
            </form>
        </AuthCard>
    );
}

export default Login;
