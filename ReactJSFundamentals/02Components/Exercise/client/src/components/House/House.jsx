import React from 'react';
import './House.css';

const House = (props) => {
    return (
        <div className="House" onMouseEnter={() => props.onHoverE(props.id)}>
            <img alt='' src={props.imageUrl}></img>
        </div>
    );
}

export default House;
