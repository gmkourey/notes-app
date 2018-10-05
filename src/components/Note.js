import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
<<<<<<< HEAD
import API from "../utils/API";

=======
import Input from './Input.js'
>>>>>>> 0741c5e648f53b163c8173192fd6244de03b6746
import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';
import * as routes from '../constants/routes';

class Note extends Component {
    state = {
        title: "",
        body: ""
    }

<<<<<<< HEAD
    handleFormSubmit = event => {
        event.preventDefault();

        if(this.state.title && this.state.body) {
            API.saveNote({
                title: this.state.title,
                body: this.state.body
            })
            .catch(err => console.log(err))
        }
    }
=======
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };
>>>>>>> 0741c5e648f53b163c8173192fd6244de03b6746

    render() {
        return(
            <div>
                <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    placeholder="Title (required)"
                />
                <Input
                    value={this.state.body}
                    onChange={this.handleInputChange}
                    name="body"
                    placeholder="Note Body (required)"
                />

            </div>
        );
    }
}

export default Note;