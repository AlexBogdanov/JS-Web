import React from 'react';
import './HouseDetails.css';

const HouseDetails = ({ type, imageUrl, description, price }) => {
    return (
        <div className="HouseDetails">
            <h2>{type}</h2>
            <div className="image">
                <img src={imageUrl}></img>
            </div>
            <p>Description: {description}</p>
            <p>Price: {price}</p>
        </div>
    );
};

export default HouseDetails;
