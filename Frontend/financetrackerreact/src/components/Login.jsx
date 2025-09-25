import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './modules/auth.css'
import AuthCard from './AuthCard.jsx'

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${apiUrl}/api/login`, {username, password});
            localStorage.setItem("token", response.data.token);
            setError("");
            navigate("/dashboard");
        }catch (error){
            // show server-provided message if available, otherwise a generic message
            let msg = 'Login failed. Please check your credentials.';
            if (error && error.response) {
                const d = error.response.data;
                if (typeof d === 'string' && d.trim()) {
                    msg = d;
                } else if (d && typeof d === 'object' && d.message) {
                    msg = d.message;
                } else if (error.message) {
                    msg = error.message;
                }
            } else if (error && error.message) {
                msg = error.message;
            }
            setError(msg);
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
                <input type="text" value={username} onChange={(e) => { setUsername(e.target.value); setError(""); }} placeholder="Username" required/>
                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="Password" required/>
                {error && <div className="form-error">{error}</div>}
                <button className="submit-button" type="submit">Login</button>
            </form>
        </AuthCard>
    );
}

export default Login;
