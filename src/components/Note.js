import React from 'react';
import { withRouter } from 'react-router-dom';
import API from "../utils/API";

import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';
import * as routes from '../constants/routes';

class Note extends Component {
    state = {
        user: {}
    }

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

    render() {
        return(
            <form>
            <h3>Note Title</h3>
            <input type="text" id="titleInput">
            <h3>Note Body</h3>
            <input type="text" id="bodyInput">
            <button type="submit" id="submit">Submit</button>
            </form>
        )
    }
}

export default NotePage;