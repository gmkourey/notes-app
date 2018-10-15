// Import React!
import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import API from '../utils/API';
// import AuthUserContext from './AuthUserContext';
import {firebase} from '../firebase';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  scroll: {
    overflowY: 'scroll',
    height: 'calc(100vh - 90px)'
  }
}

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
                text: "Welcome to GrantsNotes!",
              },
            ],
          },
        ],
      },
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: "",
              },
            ],
          },
        ],
      },
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: "You can use the panel on the left to create a new note and get started.",
              },
            ],
          },
        ],
      }
    ],
  },
})


class NoteArea extends React.Component {

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if(this.state.email === null) {
      this.setState({ email: authUser.email })
      }
    })
  }

  // componentWillReceiveProps() {
  componentDidUpdate(prevProps) {

    if (this.props.selectedNoteID !== prevProps.selectedNoteID) {
      let contentStr = this.props.selectedNoteBody;
      let contentObj = JSON.parse(contentStr);
      let slateContent = Value.fromJSON(contentObj);

      this.setState({ 
        value: slateContent,
        id: this.props.selectedNoteID,
      })
    }
  }

  state = {
    value: initialValue,
    id: "",
    email: "test",
  }

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {

    this.setState({ value })
    if (this.props.selectedNoteBody) {
      API.updateNote(this.state.id, { content: JSON.stringify(value) });
    }
    
  }

  // Render the editor.
  render() {
    const { classes } = this.props;
    return(
      <Paper>
      <Editor
        className={classes.scroll} 
        value={this.state.value} 
        onChange={this.onChange}
        style={{
          'minHeight':'calc(100vh - 90px)',
          margin: '20px 0 30px 0',
          padding: '10px',
          color: this.props.text,
        }}
      />
      </Paper>
    ) 
  }
}

export default withStyles(styles)(NoteArea);