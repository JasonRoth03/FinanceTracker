import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './modules/register.css';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            await axios.post("https://financetrackerapplication-i36vv3llhq-uk.a.run.app/api/register", {firstName, lastName, username, password});
            navigate("/")
        }catch (error){
            console.log('register failed',error)
        }
    }

    const handleLogin = () => {
        navigate("/");
    }

    return (
        <div className="app-container">
            <div className="login-container">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
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
                <button className="register-button" onClick={handleLogin} type="button">Login Page</button>
            </div>
        </div>
    );
}

export default Register;
