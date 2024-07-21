import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
        </Switch>
    </Router>
);

export default Routes;
