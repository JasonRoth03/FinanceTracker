import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8080/api/login", {username, password});
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        }catch (error){
            console.log('login failed', error);
        }
    }
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
