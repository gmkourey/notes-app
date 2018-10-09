import React, { Component } from 'react';
import API from '../../utils/API';
import TextField from '@material-ui/core/TextField';

import Menu from '@material-ui/core/Menu';

import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
// import Paper from '@material-ui/core/Paper';
import FolderShared from '@material-ui/icons/FolderShared';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});

class NoteList extends Component {
  state = {
    notes: this.props.notes,
    isEditable: [],
    val: [],
    anchorEl: null, // context menu anchor
    targetId: null // id for context menu to access
  };

  componentDidMount() {
    console.log("NoteList.js componentDidMount()")
    this.loadNotes();
  }

  // is this necessary? 
  componentWillReceiveProps(props) {
    console.log(this.props.notes);
    console.log("NoteList.js componentWilLReceiveProps()");
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

  handleContextMenu = (event, id) => {
    event.preventDefault();
      console.log('Right clicked');
      this.setState({ 
        anchorEl: event.currentTarget,
        targetId: id
      });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  loadNotes = () => {
    console.log('Ran loadNotes function from NoteList.js.')
    API.getNotes()
      .then(res => this.setState({ notes: res.data }))
      .catch(err => console.log(err));
  }

  // need to select the "next" note when one note is deleted, otherwise the body stays the same
  deleteNote = (id) => {
    console.log('Delete method called.');
    this.setState({ anchorEl: null });
    API.deleteNote(id)
      .then(res => this.loadNotes())
      .catch(err => console.log(err));
  }
 
  render() {
    const { anchorEl, targetId } = this.state;
    const { classes } = this.props;

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
            ) : (
              // Read only text field
              <TextField
                key={note._id}
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={note.title}
                onClick={() => this.props.handleSelectedNote(note.body)}
                onDoubleClick={(e) => this.handleDoubleClick(e, index)}
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onContextMenu={(e) => this.handleContextMenu(e, note._id)}
              />
            )}
          </>
          );
        })}
        {/* <Paper> */}
        {/* {console.log(targetId)} */}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuList>
            <MenuItem className={classes.menuitem}>
              <ListItemIcon className={classes.icon}>
                <FolderShared/>
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Share"/>
            </MenuItem>
            <MenuItem className={classes.menuitem} onClick={() => this.deleteNote(targetId)}>
              <ListItemIcon className={classes.icon}>
                <DeleteIcon/>
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Delete"/>
            </MenuItem>
          </MenuList>
        </Menu>
        {/* </Paper> */}
        {/* <div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
            <MenuItem onClick={this.handleClose}>My account</MenuItem>
            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
          </Menu>
        </div> */}
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

NoteList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NoteList);