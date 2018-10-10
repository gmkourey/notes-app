import React, { Component } from 'react';
import API from '../../utils/API';
import TextField from '@material-ui/core/TextField';
import {firebase} from "../../firebase";

class NoteList extends Component {
  state = {
    notes: this.props.notes,
    isEditable: [],
    val: [],
    email: "",
  };

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      this.setState({ email: authUser.email }, function() {
        this.loadNotes();
      })
    })
    console.log("NoteList.js componentDidMount()")

  }

  componentWillReceiveProps(props) {
    console.log(this.props.notes);
    console.log("NoteList.js componentWilLReceiveProps()");
    // unclear how this is working currently, but it's needed to render newly creates notes
    // without the conditional, it clears the notes list AFTER the notes list is loaded initially
    if (this.props.notes.length) {
      this.setState({notes: this.props.notes});
    }
  }

  handleDoubleClick (event, index) {
    let edit = this.state.isEditable.map((val, index) => {
      return (val = false);
    });
    let isEditable = edit.slice();
    isEditable[index] = true;
    this.setState({ isEditable });
  }

  handleChange (event, id, index) {
    const notes = this.state.notes;
    if (event.target.value !== this.state.notes[index].title) {
      API.updateNote(id, {title: event.target.value} )
      .then(res => this.forceUpdate())
      .catch(err => console.log(err));
    }

    notes[index].title = event.target.value;
    // this.forceUpdate();
  }

  keyPress(event, id, index) {
    if (event.keyCode === 13) {
      this.handleBlur(event, id, index);
    }
  }

  handleBlur (event, id, index) {
    // console.log(event.target.value);
    // console.log(this.state.notes[index].title)
    // console.log(id);
    // if (event.target.value != this.state.notes[index].title) {
    //   API.updateNote(id, {title: event.target.value} )
    //   .then(res => this.loadNotes())
    //   .catch(err => console.log(err));
    // }
    
    let edit = this.state.isEditable.map((val, index) => {
      return (val = false);
    });
    let isEditable = edit.slice();
    isEditable[index] = false;
    this.setState({ isEditable });
  }

  handleFocus (event) {
    event.target.select();
  }

  loadNotes = () => {
    console.log('Ran loadNotes function from NoteList.js.')
    console.log(this.state.email);
    API.getNotes(this.state.email)
      .then(res => this.setState({ notes: res.data }))
      .catch(err => console.log(err));
  }
 
  render() {
    return(
      <>
      {this.state.notes.length ? (
        <>
        {this.state.notes.map((note, index) => {
          return (
          <>
            {this.state.isEditable[index] ? (
              // Editable text field
              <TextField
                key={note._id}
                autoFocus
                onFocus={this.handleFocus}
                defaultValue={note.title}
                variant="filled"
                onChange={(event) => this.handleChange(event, note._id, index)}
                onBlur={(event) => this.handleBlur(event, note._id, index)}
                onKeyDown={(event) => this.keyPress(event, note._id, index)}
              />
              // </form>
            ) : (
              // Read only text field
              <TextField
                key={note._id}
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={note.title}
                onClick={() => this.props.handleSelectedNote(note.body)}
                // onClick={this.props.handleSelectedNote}
                onDoubleClick={(e) => this.handleDoubleClick(e, index)}
              />
            )}
          </>
          );
        })}
        </>
      ) : (
        // <>
        <p>No notes</p>
        // </>
      )}
      </>
    );
  }
}

export default NoteList;