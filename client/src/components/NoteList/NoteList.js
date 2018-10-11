import React, { Component } from 'react';
import API from '../../utils/API';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Typography from "@material-ui/core/Typography";
import {firebase} from "../../firebase";
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
import Layers from '@material-ui/icons/Layers';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
    justifyContent: 'flex-end',
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
  noteField: {
    justifyContent: 'flex-end',
    width: '100%'
  },
  modalPaper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  noteFieldEdit: {
    height: '35px',
  },
  noteFieldEditInput: {
    paddingBottom: '10px'
  },
  noteFieldIcon: {
    paddingTop: '10px'
  }
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class NoteList extends Component {
  state = {
    notes: this.props.notes, // does this even do anything?
    isEditable: [],
    val: [],
    email: "",
    targetId: null, // id for context menu to access
    contextOpen: false,
    positionTop: 300, // should these be null by default?
    positionLeft: 400,
    modalOpen: false,
    sharedUser: null
  };  

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      this.setState({ email: authUser.email }, function() {
        this.loadNotes();
      })
    })
    console.log("NoteList.js componentDidMount()")

  }

  // is this necessary? 
  // componentWillReceiveProps(props) {
  //   // console.log(this.props.notes);
  //   console.log("NoteList.js componentWilLReceiveProps()");
  //   if (this.props.notes.length) {
  //     this.setState({notes: this.props.notes});
  //   }
  // }

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

  handleShareChange = (event) => {
    this.setState({sharedUser: event.target.value});
    console.log(this.state.sharedUser);
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
      contextOpen: !this.state.contextOpen,
      targetId: id
    });
  }

  // Closes context menu. Needs event so we can prevent default when user right clicks outside an open context menu.
  handleClose = (event) => {
    event.preventDefault();
    this.setState({ contextOpen: false });
    console.log("handleClose() fired");
  };

  loadNotes = () => {
    console.log('Ran loadNotes function from NoteList.js.')
    console.log(this.state.email);
    API.getNotes(this.state.email)
      .then(res => this.setState({ notes: res.data }, () => {console.log(this.state.notes)}))
      .catch(err => console.log(err));    
  }

  refreshNewNote = (email) => {
    console.log('Ran refreshNewNote function from NoteList.js.');
    API.getNotes(email)
      .then(res => this.setState({ notes: res.data }, () => {this.handleSelectRefresh(this.state.notes[0]._id);}))
      .catch(err => console.log(err));

    // this seems clunky
    setTimeout(
      function() {
        let edit = this.state.isEditable.map((val) => {
          return (val = false);
        });
        let isEditable = edit.slice();
        isEditable[0] = true;
        this.setState({ isEditable });
      }
      .bind(this),
      310
    );
  }

  handleSelectRefresh = (id) => {
    console.log("Hit handleSelectRefresh function.");
    console.log("Running GET for " + this.state.email);
    API.getNotes(this.state.email)
    .then(res => this.setState({ notes: res.data }, () => {
      console.log(this.state.notes);
      let newContent;
      for (var i = 0; i < this.state.notes.length; i++) {
        if (this.state.notes[i]._id === id) {
          console.log("ID match: " + this.state.notes[i]._id);
          console.log(this.state.notes[i].title);

          newContent = this.state.notes[i].content;
          this.props.handleSelectedNote(id, newContent);
        }
      }
    }))
    .catch(err => console.log(err));
  }

  handleOpen = (event) => {
    event.preventDefault();
    this.handleClose(event);
    this.setState({ modalOpen: true });
    console.log("handle open fired");
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
    console.log("handle modal close fired");
  };

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
      contextOpen,
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
                className={[classes.noteField, classes.noteFieldEdit]}
                key={note._id}
                autoFocus={true}
                onFocus={this.handleFocus}
                defaultValue={note.title}
                variant="filled"
                onChange={(e) => this.handleChange(e, note._id, index)}
                onBlur={(e) => this.handleBlur(e, note._id, index)}
                onKeyDown={(e) => this.keyPress(e, note._id, index)}
                InputProps={{
                  className: classes.noteFieldEditInput,
                  startAdornment: (
                    <InputAdornment className={classes.noteFieldIcon} position="start">
                      <Layers />
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              // Read only text field
              <TextField
                className={classes.noteField}
                key={note._id}
                // variant="filled"
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Layers />
                    </InputAdornment>
                  ),
                }}
                defaultValue={note.title}
                onClick={() => this.handleSelectRefresh(note._id)}
                onDoubleClick={(e) => this.handleDoubleClick(e, index)}
                aria-owns={contextOpen ? 'simple-menu' : null}
                aria-haspopup="true"
                onContextMenu={(e) => this.handleContextMenu(e, note._id)}
              />
            )}
          </>
          );
        })}
        <Popover
          open={contextOpen}
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
            <MenuItem className={classes.menuitem}
            onClick={(e) => {this.handleOpen(e);}}>
              <ListItemIcon className={classes.icon}>
                <FolderShared/>
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Share"/>
            </MenuItem>
            <MenuItem 
              className={classes.menuitem}
              onClick={(e) => { this.deleteNote(e, targetId); this.props.handleDeleteAlert(); }}>
              <ListItemIcon className={classes.icon}>
                <DeleteIcon/>
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Delete"/>
            </MenuItem>
          </MenuList>
        </ClickAwayListener>
        </Popover>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modalOpen}
          onClose={this.handleModalClose}
        >
          <div style={getModalStyle()} className={classes.modalPaper}>
            <Typography>
              Who Do You Want To Share With?
            </Typography>
            <TextField
          id="standard-full-width"
          label="Please enter an email below"
          style={{ margin: 8 }}
          placeholder="Email Address"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => this.handleShareChange(event)}
        />
            {/* <SimpleModalWrapped /> */}
          </div>
        </Modal>
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