import React, { useState } from 'react';
import axios from 'axios';
import './archive.css';

const Archive = () => {
    const [semesterName, setSemesterName] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const archiveInDatabase = async () => {
        try {
            const formattedSemesterName = semesterName.replace(/ /g, '_') + '_';
            await axios.post("http://localhost:3001/archive", {
                params: {
                    semester: formattedSemesterName,
                    semesterReadable: semesterName
                }
            });
        } catch (err) {
            setStatusMessage('Error inserting semester.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        archiveInDatabase();
        window.location.href = '/account';
    };

    return (
        <div className="archive-page">
            <h2 className="archive-header">Create New Semester</h2>
            <div className="archive-box">
                <form onSubmit={handleSubmit} className="archive-form">
                    <div className="form-group">
                        <label htmlFor="semester-name">New Semester Name:</label>
                        <input
                            type="text"
                            id="semester-name"
                            value={semesterName}
                            onChange={(e) => setSemesterName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <p> Warning: submitting this form will prevent changes to previous semesters </p>
                    </div>
                    <div className="form-group">
                        <button type="submit"> Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Archive;
