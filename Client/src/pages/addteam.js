//imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addteam.css';

const AddTeam = () => {
    //vars
    const [semester, setSemester] = useState('');
    const [teamName, setTeamName] = useState('');
    const [userData, setUserData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

    //get semester and users
    useEffect(() => {
        GetSemester();
        GetUser();
    }, []);

    //get current semester from db
    const GetSemester = async () => {
        try {
            const response = await axios.get("http://localhost:3001/searchSemester");
            let semesterData = response.data;
            setSemester(semesterData[semesterData.length - 1].Semester);
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };

    //get list of all users
    const GetUser = async () => {
        try {
            const response = await axios.get('http://localhost:3001/searchUser');
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    //update users team based on selection
    const updateUserInDatabase = async (currUser) => {
        try {
            await axios.post("http://localhost:3001/updateUser", {
                params: {
                    user: currUser,
                    team: teamName,
                }
            });
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    //add project to database
    const addProjectInDatabase = async (userListStr) => {
        try {
            await axios.post("http://localhost:3001/insertProj", {
                params: {
                    table: semester,
                    title: "Default Title",
                    advisor: "Default Advisor",
                    users: userListStr,
                    content: "Default Project Description",
                    image: "Default Image",
                    presentation1: "Default Presentation 1",
                    presentation2: "Default Presentation 2",
                    finalShowcase: "Default Final Showcase",
                    team: teamName
                }
            });
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    //handle user being selected
    const handleUserSelect = (userName) => {
        if (selectedUsers.includes(userName)) {
            setSelectedUsers((prev) => prev.filter((name) => name !== userName));
        } else {
            setSelectedUsers((prev) => [...prev, userName]);
        }
    };

    //handle removal of user
    const handleRemoveUser = (userName) => {
        setSelectedUsers((prev) => prev.filter((name) => name !== userName));
    };

    //handle submit button being pressed
    const handleSubmit = async (e) => {
        e.preventDefault();
        let userList = "";
        for (let i = 0; i < selectedUsers.length; i++) {
            updateUserInDatabase(selectedUsers[i]);
            userList += selectedUsers[i] + ", ";
        }
        userList = userList.substring(0, userList.length - 2);
        addProjectInDatabase(userList);
        window.location.href = '/account';

    };

    // Filter users based on search box
    const filteredUsers = userData.filter((user) =>
        user.User.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="add-team-container">
            <h2>Add a New Team</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="teamName">Team Name:</label>
                    <input
                        type="text"
                        id="teamName"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                    />
                </div>

                {/* Selected users as tags */}
                <div className="selected-users">
                    {selectedUsers.map((userName) => (
                        <span key={userName} className="user-tag">
                            {userName}
                            <button
                                type="button"
                                onClick={() => handleRemoveUser(userName)}
                                className="remove-button"
                            >
                                X
                            </button>
                        </span>
                    ))}
                </div>

                {/* Searchable user list */}
                <div className="form-group">
                    <label htmlFor="userSearch">Add Users:</label>
                    <input
                        type="text"
                        id="userSearch"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search users..."
                    />
                    <div className="user-list">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.User}
                                className={`user-item ${selectedUsers.includes(user.User) ? 'selected' : ''
                                    }`}
                                onClick={() => handleUserSelect(user.User)}
                            >
                                {user.User}
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit">Add Team</button>
            </form>
        </div>
    );
};

export default AddTeam;
