import React, { Component } from 'react';

class CreateForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            imageUrl: ''
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

        const game = {
            title: this.state.title,
            description: this.state.description,
            imageUrl: this.state.imageUrl
        };
        
        this.props.createGame(game);
    }

    render() {
        return (
            <div className="create-form">
                <h1>Create game</h1>
                <form onSubmit={this.handleSubmit} >
                    <label>Title</label>
                    <input type="text" name="title" onChange={this.handleChange} />
                    <label>Description</label>
                    <textarea type="text" name="description" onChange={this.handleChange} />
                    <label>ImageUrl</label>
                    <input type="text" name="imageUrl" onChange={this.handleChange} />
                    <button type="submit">Create</button>
                </form>
            </div>
        )
    }
};

export default CreateForm;
