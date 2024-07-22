import { Navigate} from "react-router-dom";

function privateRoute({component: Component}) {
    const token = localStorage.getItem('token');

    return token ? <Component /> : <Navigate to={"/"} replace/>
}
export default privateRoute;
