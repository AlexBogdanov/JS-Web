import React from 'react';

const Details = ({ firstName, lastName, phone, email }) => {
    return (
        <div>
            <div id="details">
                <h1>Details</h1>
                <div className="content">
                    <div className="info">
                        <div className="col">
                            <span className="avatar">&#9787;</span>
                        </div>
                        <div className="col">
                            <span className="name">{firstName}</span>
                            <span className="name">{lastName}</span>
                        </div>
                    </div>
                    <div className="info">
                        <span className="info-line">&phone; {phone}</span>
                        <span className="info-line">&#9993; {email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
