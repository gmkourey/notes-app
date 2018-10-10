// Import React!
import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import API from "../utils/API";
// import AuthUserContext from './AuthUserContext';
import {firebase} from '../firebase';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
})

// Define our app...
class NoteArea extends React.Component {
  // Set the initial value when the app is first constructed.

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      this.setState({ email: authUser.email })
    })
}

  state = {
    value: initialValue,
    email: "test",
    id:this._id
  }

  holder = []


  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    //   console.log(this.state.email);
    // authUser => authUser
    //     ? (
    //       console.log("Getting user info from firebase...");
    //       console.log(authUser);
    // ) : (
    //     console.log("No user")
    // )
    this.setState({ value })

    API.updateNote({content: JSON.stringify(value), userId: this.state.email,_id:this.state._id});
     console.log(value)
  }

  // Render the editor.
  render() {
    return <Editor value={this.state.value} onChange={this.onChange} />
  }
}

export default NoteArea;