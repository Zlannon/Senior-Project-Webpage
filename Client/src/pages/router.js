//imports
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
import AddTeam from './addteam';

function Router() {

    //route pages to classes for proper rendering
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
                <Route path="/addteam" element={<AddTeam/>} />
            </Routes>
        </BrowserRouter>
    )

    return <div id='Router'>
        {body}
    </div>
}

export default Router;