import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from "./components/PrivateRoute.jsx";
import dashboard from "./components/Dashboard";

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute component={dashboard} />} />
        </Routes>
    </Router>
);

export default App;
