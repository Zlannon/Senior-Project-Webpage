import React, { useState, useRef, useEffect } from 'react';
import './home.css';
import Dropdown from './dropdown';
import axios from 'axios';

function Home() {
    const [dropdownOptions, setDropdown] = useState([]);
    const [semester, setSemester] = useState('');
    const [ratings, setRatings] = useState({});
    const [ratingData, setRatingData] = useState({});
    const [comments, setComments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedAdvisor, setEditedAdvisor] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [editedImage, setEditedImage] = useState('');
    const [editedPresentation1, setEditedPresentation1] = useState('');
    const [editedPresentation2, setEditedPresentation2] = useState('');
    const [editedFinalShowcase, setEditedFinalShowcase] = useState('');
    const [cardsData, setCardsData] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentEditMode, setCommentEditMode] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const formOverlayRef = useRef(null);


    useEffect(() => {
        getSemester();
    }, []);

    useEffect(() => {
        GetRating();
        GetComment();
    }, [semester]);

    useEffect(() => {
        GetData();
    }, [semester, ratings]);

    let user = localStorage.getItem("username");
    let team = localStorage.getItem("team");

    const getSemester = async () => {
        try {
            const response = await axios.get("http://localhost:3001/searchSemester");
            let semesterData = response.data;
            setSemester(semesterData[semesterData.length - 1].Semester);

            let options = [];
            semesterData.reverse();
            semesterData.forEach((semester) => {
                options.push({ label: semester.SemesterReadable, value: semester.Semester });
            });
            setDropdown(options);
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };

    const GetData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/searchProj", {
                params: {
                    table: semester
                }
            });
            const data = JSON.parse(JSON.stringify(response.data));

            const sortedCardsData = data.sort((a, b) => {
                return ratings[b.Team] - ratings[a.Team];
            });

            setCardsData(sortedCardsData);
        } catch (error) {
            console.log(error);
        }
    };

    const GetRating = async () => {
        try {
            const username = localStorage.getItem("username");
            const response = await axios.get("http://localhost:3001/searchRate", {
                params: {
                    table: semester
                }
            });

            const ratingsData = response.data;


            const ratingsCountByTeam = {};
            const ratingsByTeam = {};

            ratingsData.forEach((rating) => {
                const team = rating.Team;
                if (ratingsCountByTeam[team]) {
                    ratingsCountByTeam[team]++;
                } else {
                    ratingsCountByTeam[team] = 1;
                }

                if (username === rating.User) {
                    ratingsByTeam[team] = true;
                } else {
                    ratingsByTeam[team] = false;
                }
            });

            setRatingData(ratingsByTeam);
            setRatings(ratingsCountByTeam);
        } catch (error) {
            console.log(error);
        }
    };


    const GetComment = async () => {
        try {
            const response = await axios.get("http://localhost:3001/searchComm", {
                params: {
                    table: semester
                }
            });

            setComments(JSON.parse(JSON.stringify((response.data))));
        } catch (error) {
            console.log(error);
        }
    };

    const openForm = (cardData) => {
        setSelectedCard(cardData);
        setShowForm(true);
        setEditMode(false);
        setEditedTitle(cardData.Title);
        setEditedAdvisor(cardData.Advisor);
        setEditedContent(cardData.Description);
        setEditedImage(cardData.Image);
        setEditedPresentation1(cardData.Presentation1);
        setEditedPresentation2(cardData.Presentation2);
        setEditedFinalShowcase(cardData.FinalShowcase);
        const sortedCardsData = [...cardsData].sort((a, b) => {
            return ratings[b.Team] - ratings[a.Team];
        });
        setCardsData(sortedCardsData);
    };


    const closeForm = () => {
        setSelectedCard(null);
        setShowForm(false);
    };

    const handleOutsideClick = (event) => {
        if (
            formOverlayRef.current &&
            formOverlayRef.current.contains(event.target) &&
            event.target.className === 'form-overlay'
        ) {
            closeForm();
        }
    };

    useEffect(() => {
        const handleMouseDown = () => {
            document.addEventListener('mouseup', handleOutsideClick);
        };

        document.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleOutsideClick);
        };
    }, []);

    const handleDropdownChange = (selectedOption) => {
        setSemester(selectedOption);
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = async () => {
        try {
            updateProjectInDatabase();
            const updatedCardsData = cardsData.map((card) =>
                card.Team === selectedCard.Team ? { ...card, Title: editedTitle, Description: editedContent, Advisor: editedAdvisor, Image: editedImage, Presentation1: editedPresentation1, Presentation2: editedPresentation2, FinalShowcase: editedFinalShowcase } : card
            );
            setCardsData(updatedCardsData);
            closeForm();

        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const updateProjectInDatabase = async () => {
        try {
            await axios.post("http://localhost:3001/updateProj", {
                params: {
                    table: semester,
                    title: editedTitle,
                    advisor: editedAdvisor,
                    content: editedContent,
                    image: editedImage,
                    presentation1: editedPresentation1,
                    presentation2: editedPresentation2,
                    finalShowcase: editedFinalShowcase,
                    team: selectedCard.Team
                }
            });
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const deleteCommentInDatabase = async (commentUser, commentComm, commentTeam) => {
        try {
            await axios.post("http://localhost:3001/removeComm", {
                params: {
                    table: semester,
                    user: commentUser,
                    comment: commentComm,
                    team: commentTeam,
                }
            });
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const handleCommentDelete = async (commentUser, commentComm, commentTeam) => {
        try {

            deleteCommentInDatabase(commentUser, commentComm, commentTeam);

            const updatedComments = comments.map((comm) =>
                (comm.Team === commentTeam && comm.Comment === commentComm && comm.User === commentUser) ? {} : comm
            );

            setComments(updatedComments);

        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const addCommentInDatabase = async () => {
        try {
            await axios.post("http://localhost:3001/insertComm", {
                params: {
                    table: semester,
                    team: selectedCard.Team,
                    user: user,
                    comment: newComment,
                },
            });
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const handleCommentSubmit = async () => {
        try {
            if (newComment.trim() === '') {
                return;
            }

            addCommentInDatabase();
            comments.push({ User: user, Comment: newComment, Team: selectedCard.Team });
            setNewComment('');
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleCommentEdit = (commentUser, commentContent, commentTeam) => {
        setCommentEditMode({ user: commentUser, content: commentContent, team: commentTeam });
        setEditedComment(commentContent);
    };


    const editCommentInDatabase = async (commentUser, commentOld, commentEdit, commentTeam) => {
        try {
            await axios.post("http://localhost:3001/updateComm", {
                params: {
                    table: semester,
                    user: commentUser,
                    oldComment: commentOld,
                    newComment: commentEdit,
                    team: commentTeam,
                },
            });
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const handleCommentSave = async () => {
        try {
            const { user, content, team } = commentEditMode;

            editCommentInDatabase(user, content, editedComment, team);

            const updatedComments = comments.map((comm) =>
                comm.Team === team && comm.User === user && comm.Comment === content
                    ? { ...comm, Comment: editedComment }
                    : comm
            );

            setComments(updatedComments);
            setCommentEditMode(null);
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleCommentCancel = () => {
        setCommentEditMode(null);
    };

    const removeLikeInDatabase = async () => {
        try {
            await axios.post("http://localhost:3001/deleteRate", {
                params: {
                    table: semester,
                    user: user,
                    team: selectedCard.Team,
                },
            });
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const addLikeInDatabase = async () => {
        try {
            await axios.post("http://localhost:3001/insertRate", {
                params: {
                    table: semester,
                    user: user,
                    team: selectedCard.Team,
                },
            });
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const handleLike = () => {

        addLikeInDatabase();

        setRatingData((prev) => ({
            ...prev,
            [selectedCard.Team]: true,
        }));

        setRatings((prev) => ({
            ...prev,
            [selectedCard.Team]: (prev[selectedCard.Team] || 0) + 1,
        }));
    }

    const handleRemoveLike = () => {

        removeLikeInDatabase();

        setRatingData((prev) => ({
            ...prev,
            [selectedCard.Team]: false,
        }));

        setRatings((prev) => ({
            ...prev,
            [selectedCard.Team]: Math.max(0, (prev[selectedCard.Team] || 0) - 1),
        }));
    }

    return (
        <div>
            <Dropdown options={dropdownOptions} onSelect={handleDropdownChange} />
            <main>
                {cardsData.length === 0 ? (
                    <div className="no-projects-message">
                        There are no projects for this semester. Please wait for an admin to add new projects or view archived projects through the dropdown menu.
                    </div>
                ) : (
                    cardsData.map((card) => (
                        <div key={card.id} className="card" onClick={() => openForm(card)}>
                            <img className="card-image" src={card.Image} alt={`Card Image ${card.id}`} />
                            <div className="card-content">
                                <h2 className="card-title">{card.Title}</h2>
                                <p className="card-text">{card.Description}</p>
                            </div>
                        </div>
                    ))
                )}

                {showForm && selectedCard && (
                    <div className="form-overlay" ref={formOverlayRef}>
                        <div className="form">
                            <span className="close-btn" onClick={closeForm}>
                                &times;
                            </span>
                            <div className="ratings-info">
                                <h3>Number of Likes: {ratings[selectedCard.Team] || 0}</h3>
                                {user && ratingData[selectedCard.Team] ? (
                                    <button onClick={handleRemoveLike}>Remove Like</button>
                                ) : user && !ratingData[selectedCard.Team] ? (
                                    <button onClick={handleLike}>Like</button>
                                ) : null}
                            </div>
                            {editMode ? (
                                <div className="form-edit-mode">
                                    <div className="form-input">
                                        <h3>Title:</h3>
                                        <input
                                            type="text"
                                            value={editedTitle}
                                            onChange={(e) => setEditedTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <h3>Advisor:</h3>
                                        <input
                                            type="text"
                                            value={editedAdvisor}
                                            onChange={(e) => setEditedAdvisor(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <h3>Content:</h3>
                                        <textarea
                                            value={editedContent}
                                            onChange={(e) => setEditedContent(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="form-input">
                                        <h3>Image Path:</h3>
                                        <input
                                            type="text"
                                            value={editedImage}
                                            onChange={(e) => setEditedImagePath(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <h3>Presentation 1 Path:</h3>
                                        <input
                                            type="text"
                                            value={editedPresentation1}
                                            onChange={(e) => setEditedPresentation1(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <h3>Presentation 2 Path:</h3>
                                        <input
                                            type="text"
                                            value={editedPresentation2}
                                            onChange={(e) => setEditedPresentation2(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <h3>Presentation 3 Path:</h3>
                                        <input
                                            type="text"
                                            value={editedFinalShowcase}
                                            onChange={(e) => setEditedFinalShowcase(e.target.value)}
                                        />
                                    </div>
                                    <button onClick={handleSaveClick}>Save</button>
                                </div>
                            ) : (
                                <>
                                        <h2>{selectedCard.Title}</h2>
                                        {(team === selectedCard.Team || team === "-1") && (
                                            <button onClick={handleEditClick}>Edit</button>
                                        )}
                                    <div className="description-image-container">
                                            <div className="description-container">
                                                <h3>Team:</h3>
                                                <p>{selectedCard.Team}</p>
                                                <h3>Members:</h3>
                                                <p>{selectedCard.Members}</p>
                                                <h3>Advisor:</h3>
                                                <p>{selectedCard.Advisor}</p>
                                                <h3>Description:</h3>
                                                <p>{selectedCard.Description}</p>
                                        </div>
                                        <img className="card-image-2" src={selectedCard.Image} alt={`Card Image ${selectedCard.id}`} />
                                    </div>
                                    <div className="video-container">
                                        <div className="video">
                                            <h3>Presentation 1</h3>
                                            <iframe
                                                id="player"
                                                type="text/html"
                                                width="350"
                                                height="200"
                                                src={`https://www.youtube.com/embed/${selectedCard.Presentation1}`}
                                                frameBorder="0"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        <div className="video">
                                            <h3>Presentation 2</h3>
                                            <iframe
                                                id="player"
                                                type="text/html"
                                                width="350"
                                                height="200"
                                                src={`https://www.youtube.com/embed/${selectedCard.Presentation2}`}
                                                frameBorder="0"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        <div className="video">
                                            <h3>Final Showcase</h3>
                                            <iframe
                                                id="player"
                                                type="text/html"
                                                width="350"
                                                height="200"
                                                src={`https://www.youtube.com/embed/${selectedCard.FinalShowcase}`}
                                                frameBorder="0"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                        </div>
                                        {}
                                        <div className="comments-section">
                                            <h3>Comments:</h3>
                                            {comments
                                                .filter((comment) => comment.Team === selectedCard.Team)
                                                .map((comment) => (
                                                    <div key={comment.id} className="comment-item">
                                                        {(commentEditMode?.user === comment.User &&
                                                            commentEditMode?.team === comment.Team &&
                                                            commentEditMode?.content === comment.Comment) ? (
                                                            <div className="comment-display">
                                                                    <textarea
                                                                        value={editedComment}
                                                                        onChange={(e) => setEditedComment(e.target.value)}
                                                                    ></textarea>
                                                            <div className="comment-actions">
                                                                <button onClick={handleCommentSave}>Save</button>
                                                                <button onClick={handleCommentCancel}>Cancel</button>
                                                                    </div>
                                                                </div>
                                                        ) : (
                                                            <div className="comment-display">
                                                                <strong>{comment.User}:</strong>
                                                                <p>{comment.Comment}</p>
                                                                {(user === comment.User) && (
                                                                    <div className="comment-actions">
                                                                        <button
                                                                            onClick={() =>
                                                                                handleCommentEdit(comment.User, comment.Comment, comment.Team)
                                                                            }
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleCommentDelete(comment.User, comment.Comment, comment.Team)}
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                        </div>
                                        {user && (
                                            <div className="add-comment">
                                                <h3>Add Comment:</h3>
                                                <textarea
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    placeholder="Type your comment here..."
                                                ></textarea>
                                                <button onClick={handleCommentSubmit}>Add Comment</button>
                                            </div>
                                        )}
                                    </>
                            )}

                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;