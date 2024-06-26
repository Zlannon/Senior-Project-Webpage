import React from 'react';

//render dropdown for different semesters
const Dropdown = ({ options, onSelect }) => {
    return (
        <div className="dropdown">
            <select onChange={(e) => onSelect(e.target.value)}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
