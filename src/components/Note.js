import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';
import * as routes from '../constants/routes';

class Note extends Component {
    state = {
        user: {}
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