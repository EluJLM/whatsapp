import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RecordPage from './pages/RecordPage.js';

import "./App.css"

const App = () => {
    return (
            <Routes>
                <Route path="/record/" element={<RecordPage />} />
                <Route path="/record/:linkngrok/:codigo/:number" element={<RecordPage />} />
                <Route path="/record/:linkngrok/:codigo/:number/:name/:alternative/:email/:address/:description" element={<RecordPage />} />
            </Routes>
    );
};

export default App;
