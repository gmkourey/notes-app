import React, { Component } from 'react';
import API from '../../utils/API';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderShared from '@material-ui/icons/FolderShared';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popover from '@material-ui/core/Popover';


const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
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
    targetId: null, // id for context menu to access
    open: false,
    positionTop: 300, // should these be null by default?
    positionLeft: 400,
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

  // User hits enter
  keyPress(event, id, index) {
    if (event.keyCode === 13) {
      this.handleBlur(event, id, index);
    }
  }

  // User clicks out of active field
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

  // User right clicks on note title in sidebar
  handleContextMenu = (event, id) => {
    event.preventDefault();
    
    console.log(event);
    console.log(id); // logs id of note that was right clicked

    // notes:
    // currently user can't have the context menu open, then immediately close and open a new context menu with one click
    
    this.setState({ 
      positionTop: event.clientY,
      positionLeft: event.clientX,
      open: !this.state.open,
      targetId: id
    });
  }

  // Closes context menu. Needs event so we can prevent default when user right clicks outside an open context menu.
  handleClose = (event) => {
    event.preventDefault();
    // this.setState({ anchorEl: null });
    // if (this.anchorEl.contains(event.target)) {
    //   return;
    // }
    this.setState({ open: false });
  };

  loadNotes = () => {
    console.log('Ran loadNotes function from NoteList.js.')
    API.getNotes()
      .then(res => this.setState({ notes: res.data }))
      .catch(err => console.log(err));
  }

  // need to select the "next" note when one note is deleted, otherwise the body stays the same
  deleteNote = (event, id) => {
    console.log('Delete method called.');
    this.handleClose(event);
    API.deleteNote(id)
      .then(res => this.loadNotes())
      .catch(err => console.log(err));
  }
 
  render() {
    const { classes } = this.props;
    const {
      targetId,
      open,
      positionTop,
      positionLeft,
    } = this.state;
    

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
                onChange={(e) => this.handleChange(e, note._id, index)}
                onBlur={(e) => this.handleBlur(e, note._id, index)}
                onKeyDown={(e) => this.keyPress(e, note._id, index)}
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
                aria-owns={open ? 'simple-menu' : null}
                aria-haspopup="true"
                onContextMenu={(e) => this.handleContextMenu(e, note._id)}
                // onClickAway={this.handleClose}
              />
            )}
          </>
          );
        })}
        <Popover
          open={open}
          anchorEl={this.anchorEl}
          anchorReference="anchorPosition"
          anchorPosition={{ top: positionTop, left: positionLeft }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          hideBackdrop
        >
        
        <ClickAwayListener 
          onContextMenu={(e) => this.handleClose(e)} // if ContextMenu is called instead, it does not work
          onClickAway={(e) => this.handleClose(e)}        
        >
          <MenuList>
            <MenuItem className={classes.menuitem}>
              <ListItemIcon className={classes.icon}>
                <FolderShared/>
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Share"/>
            </MenuItem>
            <MenuItem className={classes.menuitem} onClick={(e) => this.deleteNote(e, targetId)}>
              <ListItemIcon className={classes.icon}>
                <DeleteIcon/>
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Delete"/>
            </MenuItem>
          </MenuList>
        </ClickAwayListener>
        </Popover>
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