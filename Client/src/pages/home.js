import React, { useState, useRef, useEffect } from 'react';
import './home.css';
import './common.css';
import Dropdown from './dropdown';


function Home() {
    const [showForm, setShowForm] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const formOverlayRef = useRef(null);

    const openForm = (cardData) => {
        setSelectedCard(cardData);
        setShowForm(true);
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
        console.log('Selected option:', selectedOption);
    };

    const cardsData = [
        {
            id: 1,
            title: 'Card Title 1',
            content: 'Card content goes here. You can add more details or text.',
            imagePath: 'path/to/your/image1.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },

        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },
        {
            id: 2,
            title: 'Card Title 2',
            content: 'Another card content. Customize it as needed.',
            imagePath: 'path/to/your/image2.jpg',
        },

    ];

    const dropdownOptions = [
        { label: 'Current Projects', value: 'curr' },
        { label: 'Previous Projects', value: 'prev' },
    ];

    return (
        <div>
            <Dropdown options={dropdownOptions} onSelect={handleDropdownChange} />

            <main>
                {cardsData.map((card) => (
                    <div key={card.id} className="card" onClick={() => openForm(card)}>
                        <img className="card-image" src={card.imagePath} alt={`Card Image ${card.id}`} />
                        <div className="card-content">
                            <h2 className="card-title">{card.title}</h2>
                            <p className="card-text">{card.content}</p>
                        </div>
                    </div>
                ))}

                {showForm && selectedCard && (
                    <div className="form-overlay" ref={formOverlayRef}>
                        <div className="form">
                            <span className="close-btn" onClick={closeForm}>
                                &times;
                            </span>
                            <h2>{selectedCard.title}</h2>
                            <p>{selectedCard.content}</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;
