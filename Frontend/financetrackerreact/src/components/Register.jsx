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
    const [error, setError] = useState("");
    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            await axios.post(`${apiUrl}/api/register`, {firstName, lastName, username, password});
            setError("");
            navigate("/")
        }catch (error){
            // prefer server-provided message when available
            const msg = error && error.response && error.response.data ? error.response.data : 'Registration failed.';
            setError(msg);
            console.log('register failed', error)
        }
    }

    const handleLogin = () => {
        navigate("/");
    }

    return (
        <AuthCard title="Register" secondaryLabel="Login Page" onSecondaryClick={handleLogin}>
            <form onSubmit={handleRegister} className="styled-form">
          <input type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value); setError(""); }}
              placeholder="First Name" required/>
          <input type="text" value={lastName} onChange={(e) => { setLastName(e.target.value); setError(""); }}
              placeholder="Last Name" required/>
          <input type="text" value={username} onChange={(e) => { setUsername(e.target.value); setError(""); }}
              placeholder="Username" required/>
          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Password" required/>
          {error && <div className="form-error">{error}</div>}
          <button className="submit-button" type="submit">Register</button>
            </form>
        </AuthCard>
    );
}

export default Register;
