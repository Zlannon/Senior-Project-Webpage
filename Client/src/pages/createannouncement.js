import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './createannouncement.css';

const CreateAnnouncement = () => {
    const [semester, setSemester] = useState('');
    const [title, setTitle,] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    useEffect(() => {
        getSemester();
    }, []);

    const getSemester = async () => {
        try {
            const response = await axios.get("http://localhost:3001/searchSemester");
            let semesterData = response.data;
            setSemester(semesterData[semesterData.length - 1].Semester);
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };

    const createAnnouncementInDatabase = async () => {
        try {

            const pad = (num) => String(num).padStart(2, '0');

            const now = new Date();
            const day = pad(now.getDate());
            const month = pad(now.getMonth() + 1);
            const year = now.getFullYear();
            const hours = now.getHours();
            const minutes = pad(now.getMinutes());

            const period = hours >= 12 ? 'PM' : 'AM'; 
            const formattedHours = hours % 12 || 12;

            const formattedDate = `${day}/${month}/${year} at ${formattedHours}:${minutes} ${period}`;

            const response = await axios.post('http://localhost:3001/insertAnnounce', {
                params: {
                    table: semester,
                    title: title,
                    desc: content,
                    adv: "admin",
                    date: formattedDate,
                }
            });

        } catch (error) {
            console.error('Error creating announcement:', error);
            setError('An error occurred while creating the announcement. Please try again.');
        } finally {
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        createAnnouncementInDatabase();

        window.location.href = '/account';

    };

    return (

        <div className="announcement-page">
            <h2 className="announcement-header">Create Announcement</h2>
                <div className="announcement-box">
                    <form onSubmit={handleSubmit} className="announcement-form">
                    <div className="form-group">
                        <label htmlFor="title">Announcement Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Announcement Content:</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={handleContentChange}
                            rows={6}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating...' : 'Create Announcement'}
                        </button>
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                </form>
                </div>
        </div>


        
    );
};

export default CreateAnnouncement;
