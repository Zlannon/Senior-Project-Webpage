import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home';
import Navbar from './navbar';

function Router() {
    let body = (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )

    return <div id='Router'>
        {body}
    </div>
}

export default Router;