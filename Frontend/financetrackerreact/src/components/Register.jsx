import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:8080/api/register", {username, password});
            navigate("/")
        }catch (error){
            console.log('register failed',error)
        }
    }

    return(
        <>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                <button type="submit">Register</button>
            </form>
        </>
    );
}
export default Register;
