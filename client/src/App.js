import 'materialize-css';
import {BrowserRouter as Router} from 'react-router-dom'
import { Button, Card, Row, Col } from 'react-materialize';
import {useRoutes} from "./routes";

function App() {
    const routes = useRoutes(false)
    return (
        <Router>
            <div className="container">
                {routes}
            </div>
        </Router>
    );
}

export default App;
