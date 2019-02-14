import React, { Component } from 'react';

import User from './User';
import Details from './Details';

import contacts from './../contacts';

class Contacts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currSelected: 0
        };

        this.showDetails = this.showDetails.bind(this);
    }

    showDetails(index) {
        this.setState({ currSelected: index });
    }

    render() {
        return (
            <div>
                <div className="container">
                <header>&#9993; Contact Book</header>
                <div id="book">
                    <div id="list">
                        <h1>Contacts</h1>
                        <div className="content">
                            {contacts.map((contact, index) => {
                                return(
                                    <div key={index} onClick={() => this.showDetails(index)} >
                                        <User key={index} {...contact}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <Details {...contacts[this.state.currSelected]} />
                </div>
                <footer>Contact Book SPA &copy; 2017</footer>
                </div>
            </div>
        );
    }
};

export default Contacts;
