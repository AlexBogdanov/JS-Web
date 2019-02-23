import React, {Component} from 'react';
import './App.css';
import AppHeader from "./components/App/AppHeader.jsx";
import AppContent from "./components/App/AppContent.jsx";
import AppFooter from "./components/App/AppFooter.jsx";

import { register, login, getGames, createGame } from './services/fetcher';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            games: [],
            hasFetched: false,
            loginForm: false,
        }

        this.switchForm = this.switchForm.bind(this);
    }

    registerUser(user) {
        register(user)
            .then(data => data.json())
            .then(data => {
                this.setState({ user: data.username });
            }).catch(console.log);
    }

    loginUser(user) {
        login(user)
            .then(data => data.json())
            .then(data => {
                this.setState({ user: data.username });
            }).catch(console.log);
    }

    logout(event) {
        event.preventDefault();
        sessionStorage.clear();
       this.setState({ user: null });
    }

    componentWillMount() {
        const user = sessionStorage.getItem('user');
        this.setState({ user: user ? user : null });

        getGames()
            .then(data => data.json())
            .then(data => this.setState({ games: data.games }))
            .catch(console.log);
    }

    createGame(game) {
        createGame(game)
            .then(data => data.json())
            .then(data => {
                debugger;

                this.setState(prevState => (
                    { games: [...prevState.games, data.game] }
                ));
            }).catch(console.log);
    }

    switchForm() {
        this.setState((prevState) => ({ loginForm: !prevState.loginForm }));
    }

    render() {
        return (
            <main>
                <AppHeader
                    user={this.state.user}
                    logout={this.logout.bind(this)}
                    switchForm={this.switchForm.bind(this)}
                    loginForm={this.state.loginForm}
                />
                <AppContent
                    registerUser={this.registerUser.bind(this)}
                    loginUser={this.loginUser.bind(this)}
                    games={this.state.games}
                    createGame={this.createGame.bind(this)}
                    user={this.state.user}
                    loginForm={this.state.loginForm}
                />
                <AppFooter/>
            </main>
        )
    }
}

export default App;


