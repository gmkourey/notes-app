import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Input from './Input.js'
import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';
import * as routes from '../constants/routes';

class Note extends Component {
    state = {
        title: "",
        body: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

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