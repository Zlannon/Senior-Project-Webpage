import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './review.css';

const Review = () => {
    const [semester, setSemester] = useState('');
    const [peerReviewData, setPeerReviewData] = useState({
        review1: ["Team Alpha", "Team Beta"],
        review2: ["Team Gamma", "Team Delta"],
        review3: ["Team Epsilon", "Team Zeta"],
    });

    let user = localStorage.getItem("username");

    useEffect(() => {
        getSemester();
    }, []);

    useEffect(() => {
        getReview();
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

    const getReview = async () => {
        try {
            const response = await axios.get("http://localhost:3001/searchReview");
            let reviewData = response.data[0].Team;


            let review = {
                'review1': [],
                'review2': [],
                'review3': []
            };

            reviewData = reviewData.split(',');

            let reviews = [];
            let tmp = [];
            for (let i = 0; i < reviewData.length; i++) {
                tmp.push(reviewData[i]);
                if ((i + 1) % 3 === 0 && i !== 0) {
                    reviews.push(tmp);
                    tmp = [];
                }
            }

            reviews.forEach((reviews) => {
                if (user === reviews[1]) {
                    review['review' + String(reviews[2])].push(reviews[0]);
                }
            });

            setPeerReviewData(review);

        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };

    return (
        <div className="review-container">
            <div className="review-box">
                <h2>Peer Review #1</h2>
                <ul>
                    {peerReviewData.review1.map((team, index) => (
                        <li key={index}>{team}</li>
                    ))}
                </ul>
            </div>
            <div className="review-box">
                <h2>Peer Review #2</h2>
                <ul>
                    {peerReviewData.review2.map((team, index) => (
                        <li key={index}>{team}</li>
                    ))}
                </ul>
            </div>
            <div className="review-box">
                <h2>Peer Review #3</h2>
                <ul>
                    {peerReviewData.review3.map((team, index) => (
                        <li key={index}>{team}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Review;
