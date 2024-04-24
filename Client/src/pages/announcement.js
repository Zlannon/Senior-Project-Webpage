import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './announcement.css';

const Announcement = () => {
    const [semester, setSemester] = useState('');
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        getSemester();
    }, []);

    useEffect(() => {
        fetchAnnouncements();
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

    const fetchAnnouncements = async () => {
        try {
            const response = await axios.get("http://localhost:3001/searchAnnounce", {
                params: {
                    table: semester
                }
            });

            setAnnouncements(response.data);
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };

    return (
        <div className="announcement-page">
            <h2 className="announcement-header">Announcements</h2>
            {announcements.length > 0 ? (
                <div className="announcement-box">
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="announcement-item">
                            <h3>{announcement.Title}</h3>
                            <p>
                                <strong>Date:</strong> {announcement.Date}
                            </p>
                            <p>{announcement.Description}</p>

                        </div>
                    ))}
                </div>
            ) : (
                <p>No announcements found.</p>
            )}
        </div>
    );
};


export default Announcement;
