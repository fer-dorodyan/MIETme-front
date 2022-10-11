// in App Component wird "RoutesMap" aufgerufen

import './App.css';
import {BrowserRouter} from "react-router-dom"
import {RoutesMap} from './routes/RoutesMap';

function App() {
    return (
        <BrowserRouter>
            <RoutesMap/>
        </BrowserRouter>
    );
}


export default App;

