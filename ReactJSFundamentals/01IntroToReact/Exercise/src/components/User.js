import React from 'react';

const User = ({ firstName, lastName }) => {
    return (
        <div className="contact" data-id="id">
            <span className="avatar small">&#9787;</span>
            <span className="title">{firstName} {lastName}</span>
        </div>
    );
};

export default User;
