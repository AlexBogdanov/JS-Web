import React from "react";
import RegisterForm from "./RegisterForm";
import LogInForm from "./LoginForm";
import CreateForm from "../Games/CreateForm.jsx";

class DynamicForm extends React.Component {
    render() {
        return (
            <div>
                <div>
                    {this.props.loginForm && !this.props.user
                    ? <LogInForm loginUser={this.props.loginUser} />
                    : !this.props.loginForm && !this.props.user
                    ? <RegisterForm registerUser={this.props.registerUser} />
                    : <CreateForm createGame={this.props.createGame} />}
                </div>
            </div>
        )
    }
}

export default DynamicForm