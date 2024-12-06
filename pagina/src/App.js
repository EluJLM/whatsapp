import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RecordPage from './pages/RecordPage.js';

const App = () => {
    return (
            <Routes>
                <Route path="/record/:codigo/:linkngrok/:name/:address/:description/:alternative" element={<RecordPage />} />
            </Routes>
    );
};

export default App;
