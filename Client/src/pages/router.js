import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home';
import Navbar from './navbar';
import Account from './account';

function Router() {
    let body = (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />} />
            </Routes>
        </BrowserRouter>
    )

    return <div id='Router'>
        {body}
    </div>
}

export default Router;