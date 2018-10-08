import React, { Component } from 'react';
import API from '../../utils/API';
import Divider from '@material-ui/core/Divider';

class NoteList extends Component {
  state = {
    notes: []
  };

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = () => {
    console.log('Ran loadNotes function.')
    API.getNotes()
      .then(res => this.setState({ notes: res.data }))
      .catch(err => console.log(err));
  }

  render() {

    return(
      <>
      {this.state.notes.length ? (
        <>
        {this.state.notes.map(note => (
        <>
          <div>
            {note.title}
          </div>
          <Divider/>
        </>
        ))}
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