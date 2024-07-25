import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './modules/login.css'

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("https://financetrackerapplication-i36vv3llhq-uk.a.run.app/api/login", {username, password});
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
    return(
        <div className="app-container">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                    <button className="submit-button" type="submit">Login</button>
                </form>
                <button className="register-button" onClick={handleRegister} type="button" >Register Page</button>
            </div>
        </div>
    );
}

export default Login;
