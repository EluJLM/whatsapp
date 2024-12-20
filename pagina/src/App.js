import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RecordPage from './pages/RecordPage.js';

import "./App.css"
import RecordDefault from './pages/RecordDefault.js';

const App = () => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/record">Registrarse</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Menu</Link>
                    </li>
                    <li>
                        <Link to="/profile">Informacion</Link>
                    </li>
                    </ul>
                </nav>
            </header>
            <Routes>
                <Route path="/record/" element={<RecordDefault />} />
                <Route path="/record/:linkngrok/:codigo/:number" element={<RecordPage />} />
                <Route path="/record/:linkngrok/:codigo/:number/:name/:alternative/:email/:address/:description" element={<RecordPage />} />
            </Routes>
        </div>
    );
};

export default App;
