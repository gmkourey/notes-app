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
                text: "Stuff from NoteArea",
              },
            ],
          },
        ],
      },
    ],
  },
})


class NoteArea extends React.Component {

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      this.setState({ email: authUser.email })
    })
  }

  // componentWillReceiveProps() {
  componentDidUpdate(prevProps) {
    console.log('content prop: ' + this.props.selectedNoteBody);
    console.log('id prop: ' + this.props.selectedNoteID);
    console.log("------------------------");

    if (this.props.selectedNoteID !== prevProps.selectedNoteID) {
      let contentStr = this.props.selectedNoteBody;
      let contentObj = JSON.parse(contentStr);
      let slateContent = Value.fromJSON(contentObj);
      
      this.setState({ 
        value: slateContent,
        id: this.props.selectedNoteID
      })
    }

    // if (this.props.selectedNoteBody) {
    //   let contentStr = this.props.selectedNoteBody;
    //   let contentObj = JSON.parse(contentStr);
    //   let slateContent = Value.fromJSON(contentObj);
      
    //   this.setState({ 
    //     value: slateContent,
    //     id: this.props.selectedNoteID
    //   })
    // }
  }

  state = {
    value: initialValue,
    id: "",
    email: "test"
  }

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
<<<<<<< HEAD
      console.log(this.state.email);
      console.log(value);
    // authUser => authUser
    //     ? (
    //       console.log("Getting user info from firebase...");
    //       console.log(authUser);
    // ) : (
    //     console.log("No user")
    // )
=======
      // console.log(this.state.email);

>>>>>>> master
    this.setState({ value })
    // API.saveNote({content: JSON.stringify(value), userId: this.state.email});
    if (this.props.selectedNoteBody) {
      API.updateNote(this.state.id, { content: JSON.stringify(value) });
    }
    
  }

  // Render the editor.
  render() {
    // return <Editor value={this.state.value} onChange={this.onChange} />
    return(
      <Editor 
        value={this.state.value} 
        onChange={this.onChange}
      />
    ) 
  }
}

export default NoteArea;