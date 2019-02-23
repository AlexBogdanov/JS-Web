import React from 'react';
import './register.css';

import { registerPost } from './../../services/fetcher';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        this.props.registerUser(user);
    }

    render() {
        return (
            <div className="Register">
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input type="text" name="username" onChange={this.handleChange}/>
                    <label>Email</label>
                    <input type="text" name="email" onChange={this.handleChange}/>
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handleChange}/>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        )
    }
}
export default RegisterForm;