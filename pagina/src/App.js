import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate} from 'react-router-dom';
import RecordPage from './pages/record/RecordPage.js';

import "./App.css"
import RecordDefault from './pages/record/RecordDefault.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import Menu from './pages/menu/Menu.js';
import MenuConfig from './pages/menu/MenuConfig.js';
import { MenuProvider } from './utilidades/MenuContext.js';
import Auth from './pages/auth/Auth.js';
import { useState } from 'react';


const App = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);

    useEffect(() => {
        if(login){
            navigate("/dashboardmenu");
        }
    }, [login]);

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
                        <Link to="/menu">Menu</Link>
                    </li>
                    <li>
                        <Link to="/profile">Informacion</Link>
                    </li>
                    </ul>
                </nav>
            </header>
            <MenuProvider>
                <Routes>
                    <Route path="/record/" element={<RecordDefault />} />
                    <Route path="/record/:linkngrok/:codigo/:number" element={<RecordPage />} />
                    <Route path="/record/:linkngrok/:codigo/:number/:name/:alternative/:email/:address/:description" element={<RecordPage />} />
                    
                    <Route path="/menu/*" element={<Menu />}>
                        <Route path="signin" element={<Auth setEstado={setLogin} />}></Route>
                    </Route>
                    <Route path="/dashboardmenu" element={
                        <ProtectedRoute isAuthenticated={login}>
                            <MenuConfig />
                        </ProtectedRoute>
                    }/>
                    
                </Routes>
            </MenuProvider>
        </div>
    );
};

export default App;
