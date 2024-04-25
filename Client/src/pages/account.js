//imports
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './account.css';

const Account = () => {
    //variables
    const [userData, setUserData] = useState([]);
    const [semester, setSemester] = useState('');
    const [peerReviews, setPeerReviews] = useState({});

    //grab logged in user
    let user = localStorage.getItem("username");

    //sign out user and reload page
    const handleSignOut = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('team');
        window.location.reload();
    };

    //get the current semester
    useEffect(() => {
        getSemester();
    }, []);

    //get the users
    useEffect(() => {
        GetUser();
    }, [semester]);


    //get the current semester
    const getSemester = async () => {
        try {
            //read from db
            const response = await axios.get("http://localhost:3001/searchSemester");
            let semesterData = response.data;
            //load data
            setSemester(semesterData[semesterData.length - 1].Semester);
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };


    //get the list of users
    const GetUser = async () => {
        try {
            //read from db
            const response = await axios.get("http://localhost:3001/searchUser");
            const data = response.data;

            //load data
            setUserData(data);
        } catch (error) {
            console.log(error);
        }
    };

    //add peer review list to db
    const postReview = async () => {
        try {
            //post to db
            await axios.post("http://localhost:3001/insertReview", {
                params: {
                    reviews: peerReviews,
                }
            });

        } catch (error) {
            console.log(error);
        }
    };

    //randomize peer reviews
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    //assign users random teams to peer review
    const handlePeerReview = () => {
        const users = userData.map((u) => u.User);
        const teams = [...new Set(userData.map((u) => u.Team))];

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
            {/*conditional rendering for admin, user, and guest*/}
            {user ? (
                user === 'Admin' ? (
                    <div className="welcome-box">
                        <h2>Hello {user}!</h2>
                        <div className="button-box">
                            {/*admin buttons*/}
                            <Link to="/createannouncement" className="button">Create Announcement</Link>
                            <Link to="/archiveprojects" className="button">Archive Projects</Link>
                            <Link to="/addteam" className="button">Create New Team</Link>
                            <button onClick={handlePeerReview} className="button">Assign Peer Reviews</button>
                            <button onClick={handleSignOut} className="button">Sign Out</button>
                        </div>
                    </div>
                ) : (
                    <div className="welcome-box">
                        <h2>Hello {user}!</h2>
                            <div className="button-box">
                                {/*user buttons*/}
                                <Link to="/peerreview" className="button">Peer Review List</Link>
                                <button onClick={handleSignOut} className="button">Sign Out</button>
                        </div>
                    </div>
                )
            ) : (
                <div className="welcome-box">
                    <h2>Hello Guest!</h2>
                        <div className="button-box">
                            {/*guest buttons*/}
                        <Link to="/signin" className="button">Sign In</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Account;
