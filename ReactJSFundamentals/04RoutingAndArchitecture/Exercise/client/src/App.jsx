import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import Create from './components/Create/Create.jsx';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }

    this.logout = this.logout.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  logout() {
    this.setState({ user: null });
  }

  setUser(user) {
    this.setState({ user });
  }

  render() {
    return (
      <div className="App">
      <header>
        <a href="/" className="logo">Interactive IMDB</a>
        <div className="header-right">
          <a href="/">Home</a>
          {this.state.user
          ? (<span>
              <a href="/profile">Welcome {this.state.user.username}!</a>
              <span>
                <a href="/create">Create</a>
              </span>
              <a href="/" onClick={this.logout}>Logout</a>
            </span>)
          : (<span>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </span>)}
        </div>
      </header>

        <div>
          <Route path="/" component={Home}></Route>
          <Route path="/register" render={() => <Register setUser={this.setUser} />}></Route>
          <Route path="/login" render={() => <Login setUser={this.setUser} />}></Route>
          <Route path="/create" component={Create}></Route>
        </div>
      </div>
    );
  }
}

export default App;
