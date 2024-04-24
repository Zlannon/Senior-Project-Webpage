import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './account.css';

const Account = () => {
    const [userData, setUserData] = useState([]);
    const [semester, setSemester] = useState('');
    const [peerReviews, setPeerReviews] = useState({});


    let user = localStorage.getItem("username");

    const handleSignOut = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('team');
        window.location.reload();
    };
    
    useEffect(() => {
        getSemester();
    }, []);

    useEffect(() => {
        GetData();
    }, [semester]);
    
    const getSemester = async () => {
        try {
            const response = await axios.get("http://localhost:3001/searchSemester");
            let semesterData = response.data;
            setSemester(semesterData[semesterData.length - 1].Semester);
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };

    const GetData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/searchUser");
            const data = response.data;

            setUserData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const postReview = async () => {
        try {
            await axios.post("http://localhost:3001/insertReview", {
                params: {
                    reviews: peerReviews,
                }
            });

        } catch (error) {
            console.log(error);
        }
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const handlePeerReview = () => {
        const users = userData.map((u) => u.User);
        const teams = [...new Set(userData.map((u) => u.Team))];
        const totalTeams = teams.length;

        const allAssignments = [];

        for (let round = 1; round <= 3; round++) {
            const shuffledTeams = [...teams];
            shuffleArray(shuffledTeams);

            const roundAssignments = [];

            users.forEach((user) => {
                const assignedTeams = shuffledTeams.slice(0, 2);
                assignedTeams.forEach((team) => {
                    roundAssignments.push([team, user, round]);
                });

                shuffledTeams.push(shuffledTeams.shift());
            });

            allAssignments.push(...roundAssignments);
        }

        alert("Peer Reviews Assigned");

        setPeerReviews(allAssignments);
        postReview();
    };


    return (
        <div className="account-container">
            {user ? (
                user === 'Admin' ? (
                    <div className="welcome-box">
                        <h2>Hello {user}!</h2>
                        <div className="button-box">
                            <Link to="/createannouncement" className="button">Create Announcement</Link>
                            <Link to="/archiveprojects" className="button">Archive Projects</Link>
                            <button onClick={handlePeerReview} className="button">Assign Peer Reviews</button>
                            <button onClick={handleSignOut} className="button">Sign Out</button>
                        </div>
                    </div>
                ) : (
                    <div className="welcome-box">
                        <h2>Hello {user}!</h2>
                            <div className="button-box">
                                <Link to="/peerreview" className="button">Peer Review List</Link>
                                <button onClick={handleSignOut} className="button">Sign Out</button>
                        </div>
                    </div>
                )
            ) : (
                <div className="welcome-box">
                    <h2>Hello Guest!</h2>
                    <div className="button-box">
                        <Link to="/signin" className="button">Sign In</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Account;
