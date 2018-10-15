import React, { Component } from 'react';
import API from '../../utils/API';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import {firebase} from '../../firebase';
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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import FolderSharp from '@material-ui/icons/FolderSharp';
import InsertDriveFileOutlined from '@material-ui/icons/InsertDriveFileOutlined';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
    justifyContent: 'flex-end',
  },
  noteField: {
    justifyContent: 'flex-end',
    width: '100%',
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
    paddingBottom: '10px',
    '&:after': {
      borderBottom: 'none',
    },
    '&:before': {
      borderBottom: 'none',
    }
  },
  noteFieldIcon: {
    transform: 'translate(-10px,5px)'
  },
  noteListItem: {
    padding: '0',
    paddingLeft: '12%',
  },
  input: {
    cursor: 'default !important',
  },
  itemText: {
    padding: '0',
    font: '12px',
  },
  collapsers: {
    marginRight: '0',
  },
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
    isMounted: false,
    notes: this.props.notes,
    isEditable: [],
    val: [],
    email: "",
    targetId: null, // id for context menu to access
    targetIndex: null, // index for context menu delete action to check
    contextOpen: false,
    positionTop: 300,
    positionLeft: 400,
    modalOpen: false,
    sharedUser: null,
    toggleNotes: true,
    toggleShared: true,
    isLoading: false,
    selectedIndex: this.props.selectedIndex,
  };

  componentDidMount() {
    this.setState({ isMounted: true }, () => {
      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser != null && this.state.isMounted) this.setState({ email: authUser.email, isLoading: true }, function() {
          this.loadNotes();
        })
      })
    });
  }

  componentWillUnount() {
    this.setState({ isMounted: false });
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedIndex !== prevProps.selectedIndex) {
      this.setState({ selectedIndex: this.props.selectedIndex });
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
  }

  handleShareChange = (event) => {
    this.setState({sharedUser: event.target.value});
  }

  handleSharedSubmit = () => {
    API.getNote(this.state.targetId)
    .then(res => {
      let sharedUserArray = res.data.sharedWith;
      if(sharedUserArray.indexOf(this.state.sharedUser) === -1 || this.state.sharedUser === null) {

        API.addSharedUser(this.state.targetId, this.state.sharedUser)
      } else {
      }
      this.handleModalClose();
    })
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
  handleContextMenu = (event, id, index) => {
    event.preventDefault();
    
    this.setState({ 
      positionTop: event.clientY,
      positionLeft: event.clientX,
      contextOpen: !this.state.contextOpen,
      targetId: id,
      targetIndex: index,
    });
  }

  // Closes context menu. Needs event so we can prevent default when user right clicks outside an open context menu.
  handleCloseContext = (event) => {
    event.preventDefault();
    this.setState({ contextOpen: false });
  };

  loadNotes = () => {
    API.getNotes(this.state.email)
      .then(res => this.setState({ notes: res.data }, () => this.setState({ isLoading: false })))
      .catch(err => console.log(err));    
  }

  refreshNewNote = (email) => {
    API.getNotes(email)
      .then(res => this.setState({ notes: res.data }, () => {this.handleSelectRefresh(this.state.notes[0]._id);}))
      .catch(err => console.log(err));

    // this seems clunky
    setTimeout(
      function() {
        let edit = this.state.isEditable.map((val) => {
          return (val = false);
        });
        this.props.handleSelectedIndex(0);
        let isEditable = edit.slice();
        isEditable[0] = true;
        this.setState({ isEditable });
      }
      .bind(this),
      310
    );
  }

  handleSelectRefresh = (id) => {
    // console.log("Hit handleSelectRefresh function.");
    // console.log("Running GET for " + this.state.email);
    API.getNotes(this.state.email)
    .then(res => this.setState({ notes: res.data }, () => {
      let newContent;
      for (var i = 0; i < this.state.notes.length; i++) {
        if (this.state.notes[i]._id === id) {

          newContent = this.state.notes[i].content;
          this.props.handleSelectedNote(id, newContent);
        }
      }
    }))
    .catch(err => console.log(err));
  }

  handleOpenModal = (event) => {
    event.preventDefault();
    this.handleCloseContext(event);
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  // When user deletes a note, select the note with the same index or index-1 if it's the last note
  handleDeleteRefresh = (targetIndex) => {
    API.getNotes(this.state.email)
    .then(res => this.setState({ notes: res.data }, () => {
      let index;
      if (targetIndex === this.state.notes.length) {
        index = targetIndex - 1;
      }
      else {
        index = targetIndex;
      }
      let note = this.state.notes[index]

      if (this.state.notes.length) {
        this.props.handleSelectedNote(note._id, note.content);
        this.props.handleSelectedIndex(index);
      }
    }))
    .catch(err => console.log(err));
  }

  // need to select the "next" note when one note is deleted, otherwise the body stays the same
  deleteNote = (event, id, targetIndex) => {
    this.handleCloseContext(event);
    API.deleteNote(id)
      .then(res => {
        if (targetIndex === this.state.selectedIndex) this.handleDeleteRefresh(targetIndex)
        else this.loadNotes()
        })
      .catch(err => console.log(err));
  };

  handleNotesToggle = () => {
    this.setState({ toggleNotes: !this.state.toggleNotes });
  };
 
  render() {
    const { classes } = this.props;
    const {
      targetId,
      targetIndex,
      contextOpen,
      positionTop,
      positionLeft,
    } = this.state;

    return(
      <>
      {this.state.notes.length ? (
        <>
        <List>
          <ListItem button onClick={this.handleNotesToggle}>
            <ListItemIcon>
              <FolderSharp />
            </ListItemIcon>
            <ListItemText className={classes.itemText} primary="My notes" />
            <ListItemIcon className={classes.collapsers}>
              {this.state.toggleNotes ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
          </ListItem>
        {this.state.notes.map((note, index) => {
          return (
          <Collapse in={this.state.toggleNotes} timeout="auto" unmountOnExit key={note._id}>
            <List component="div" disablePadding>
            <ListItem
              button
              className={`${classes.nested} ${classes.noteListItem}`}
              selected={this.state.selectedIndex === index}
            >
            {this.state.isEditable[index] ? (
              // Editable text field
              <TextField
                className={`${classes.noteField} ${classes.noteFieldEdit}`}
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
                    <ListItemIcon className={classes.noteFieldIcon} position="start">
                      <InsertDriveFileOutlined />
                    </ListItemIcon>
                  ),
                }}
              />
            ) : (
              // Read only text field
              <TextField
                className={classes.noteField}
                key={note._id}
                selected={this.state.selected}
                InputProps={{
                  readOnly: true,
                  className: classes.input,
                  disableUnderline: true,
                  startAdornment: (
                    <ListItemIcon position="start">
                      <InsertDriveFileOutlined />
                    </ListItemIcon>
                  ),
                }}
                defaultValue={note.title}
                onClick={() => {this.handleSelectRefresh(note._id); this.props.handleSelectedIndex(index); }}
                onDoubleClick={(e) => this.handleDoubleClick(e, index)}
                aria-owns={contextOpen ? 'simple-menu' : null}
                aria-haspopup="true"
                onContextMenu={(e) => this.handleContextMenu(e, note._id, index)}
              />
            )}
            </ListItem>
            </List>
          </Collapse>
          );
        })}
        </List>
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
          onContextMenu={(e) => this.handleCloseContext(e)}
          onClickAway={(e) => this.handleCloseContext(e)}        
        >
          <MenuList>
            <MenuItem 
              className={classes.menuitem}
              onClick={(e) => {this.handleOpenModal(e)}}
            >
              <ListItemIcon className={classes.icon}>
                <FolderShared/>
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Share"/>
            </MenuItem>
            <MenuItem 
              className={classes.menuitem}
              onClick={(e) => { this.deleteNote(e, targetId, targetIndex); this.props.handleDeleteAlert(); }}>
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
          <Button 
            variant="contained"
            color="default"
            className={classes.button}
            onClick={() => this.handleSharedSubmit()}
          >
            Share
          </Button>
        </div>
        </Modal>
        </>
      ) : (
        <>
        {this.state.isLoading ? (
          <Fade
            in={this.state.isLoading}
            style={{
              transitionDelay: this.state.isLoading ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress style={{ color: green[500] }}/>
          </Fade>
        ) : (
          <p>No notes to display.</p>
        )}
        </>
      )}
      </>
    );
  }
}

NoteList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NoteList);