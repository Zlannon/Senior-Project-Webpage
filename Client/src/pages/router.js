import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home';
import Navbar from './navbar';
import Account from './account';
import Login from './login';
import Announcement from './announcement';
import CreateAnnouncement from './createannouncement';
import Archive from './archive';
import Review from './peerreview';
import CreateReview from './createpeerreview';

function Router() {

    let body = (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account/>} />
                <Route path="/signin" element={<Login />} />
                <Route path="/announcement" element={<Announcement />} />
                <Route path="/createannouncement" element={<CreateAnnouncement />} />
                <Route path="/archiveprojects" element={<Archive />} />
                <Route path="/peerreview" element={<Review />} />
            </Routes>
        </BrowserRouter>
    )

    return <div id='Router'>
        {body}
    </div>
}

export default Router;