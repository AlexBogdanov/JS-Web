import React from 'react';
import './login.css';

class LogInForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

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
            password: this.state.password
        };
        this.props.loginUser(user);
    }

    render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Usersname</label>
                    <input type="text" name="username" onChange={this.handleChange}/>
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handleChange}/>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default LogInForm;
