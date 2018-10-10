// Import React!
import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import API from "../utils/API";
import AuthUserContext from './AuthUserContext';
import {firebase} from '../firebase';


// let selectedContent;

// if (this.props.selectedNoteBody) {
//   selectedContent = this.props.selectedNoteBody;
// }
// else {
//   selectedContent = "A line of text placeholder"
// }


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
                text: "Stuff from NoteArea",
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

    // if (this.props.selectedNoteBody) {
    //   this.setState({ value: this.props.selectedNoteBody, id: this.props.selectedNoteID})
    // }
  }

  // componentWillReceiveProps() {
  //   if (this.props.selectedNoteBody) {

  //     console.log('INIT VALUE' + this.state.value);
  //     let content = this.props.selectedNoteBody;
  //     // console.log(content);
  //     // console.log(JSON.parse(content));

  //     console.log("------------------------")
  //     let slateContent = Value.fromJSON(content);
  //     console.log(slateContent);

  //     this.setState({ 
  //       value: slateContent,
  //       id: this.props.selectedNoteID
  //     })
  //     console.log('NEW VALUE' + this.state.value);
  //   }
  // }

  state = {
    // value: this.props.selectedNoteBody,
    value: initialValue,
    id: "",
    email: "test"
  }

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
      console.log(this.state.email);

      console.log(this.state.content);
      console.log(this.state.id);
    // authUser => authUser
    //     ? (
    //       console.log("Getting user info from firebase...");
    //       console.log(authUser);
    // ) : (
    //     console.log("No user")
    // )
    this.setState({ value })
    // API.saveNote({content: JSON.stringify(value), userId: this.state.email});
    API.updateNote({ id: this.state.id }, { content: JSON.stringify(value) });
  }

  // Render the editor.
  render() {
    // return <Editor value={this.state.value} onChange={this.onChange} />
    return(
      <>
      {/* {this.props.selectedNoteBody ? (
        <Editor
          value={this.state.value}
          onChange={this.onChange}
        />
      ) : (
        <Editor 
          value={this.state.value} 
          onChange={this.onChange}
        />
      )
    } */}
      <Editor 
        value={this.state.value} 
        onChange={this.onChange}
      />
      {console.log(this.props.selectedNoteBody)}
      {console.log(this.props.selectedNoteID)}
      </>
    ) 
  }
}

export default NoteArea;