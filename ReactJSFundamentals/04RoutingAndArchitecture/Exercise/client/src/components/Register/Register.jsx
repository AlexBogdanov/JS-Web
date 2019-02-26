import React, { Component } from 'react';

import { register } from './../../services/fetcher';

import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      confPassword: ''
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
    
    if (this.state.password !== this.state.confPassword) {
      console.log('Passwords do not match!');
      return;
    }
    
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    register(user)
      .then(data => data.json())
      .then(data => {
        console.log('User successfully registered');
        this.props.setUser(data);
        this.props.history.push('/');
    }).catch(console.log);
  }

  render() {
    return (
      <div className="Register">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
            <label>Username</label>
            <input type="text" name="username" onChange={this.handleChange} />
            <label>Email</label>
            <input type="text" name="email" onChange={this.handleChange} />
            <label>Password</label>
            <input type="password" name="password" onChange={this.handleChange} />
            <label>Confirm password</label>
            <input type="password" name="confPassword" onChange={this.handleChange} />
            <button type="submit">Sign Up</button>
          </form>
      </div>
    );
  }
}

export default Register;
