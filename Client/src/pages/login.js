import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);


    useEffect(() => {
        GetUsers();
    }, []);

    const GetUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3001/searchUser");
            setUsers(JSON.parse(JSON.stringify(response.data)));
        } catch (error) {
            console.log(error);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (username.toLowerCase() === 'admin' && password === 'password') {
            localStorage.setItem('username', 'Admin');
            localStorage.setItem('team', '-1');
            window.location.href = '/account';
        } else {
            const userExists = users.find(user => user.GID === username && user.Password === password);

            if (userExists) {
                localStorage.setItem('username', userExists.User);
                localStorage.setItem('team', userExists.Team);
                window.location.href = '/account';
            } else {
                setError('Invalid username or password');
            }
        }
    };


    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label>Gator ID:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
