import React from 'react';
import './Street.css'

const Street = (props) => {
    return (
        <div className="Street" onMouseEnter={() => props.onHoverE(props.id)}>
            <p className="street-info">{props.location}</p>
        </div>
    );
};

export default Street;
