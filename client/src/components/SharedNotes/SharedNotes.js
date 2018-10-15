import React, { Component } from 'react';
import API from '../../utils/API';
import TextField from '@material-ui/core/TextField';
import {firebase} from '../../firebase';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FolderSharedSharp from '@material-ui/icons/FolderSharedSharp';
import InsertDriveFileOutlined from '@material-ui/icons/InsertDriveFileOutlined'

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
    cursor: 'pointer !important',
  },
  itemText: {
    padding: '0',
  },
  collapser: {
    marginRight: '0',
  },
});

// function getModalStyle() {
//   const top = 50;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

class SharedNotes extends Component {
  _isMounted = false;

  state = {
    notes: this.props.notes,
    isEditable: [],
    val: [],
    email: "",
    targetId: null, // id for context menu to access
    contextOpen: false,
    positionTop: 300,
    positionLeft: 400,
    modalOpen: false,
    sharedUser: null,
    toggleShared: true,
    isLoading: false,
    selectedSharedIndex: this.props.selectedSharedIndex,
  };

  componentDidMount() {
    this._isMounted = true;
    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser != null && this._isMounted) this.setState({ email: authUser.email, isLoading: true }, function() {
        this.loadNotes();
      })
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSharedIndex !== prevProps.selectedSharedIndex) {
      this.setState({ selectedSharedIndex: this.props.selectedSharedIndex });
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
      }
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
  handleContextMenu = (event, id) => {
    event.preventDefault();
    
    console.log(event);
    console.log(id); // logs id of note that was right clicked
    
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
  };

  loadNotes = () => {
    API.getSharedNotes(this.state.email)
      .then(res => this.setState({ notes: res.data }))
      .catch(err => console.log(err));    
  }

  handleSharedToggle = () => {
    this.setState({ toggleShared: !this.state.toggleShared });
  }

  handleSelectRefresh = (id) => {
    API.getSharedNotes(this.state.email)
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

  handleOpen = (event) => {
    event.preventDefault();
    this.handleClose(event);
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  // need to select the "next" note when one note is deleted, otherwise the body stays the same
  deleteNote = (event, id) => {
    this.handleClose(event);
    API.deleteNote(id)
      .then(res => this.loadNotes())
      .catch(err => console.log(err));
  }
 
  render() {
    const { classes } = this.props;
    const {
      contextOpen,
    } = this.state;

    return(
    <>
      {this.state.notes.length ? (
      <>
        <List>
          <ListItem button onClick={this.handleSharedToggle}>
            <ListItemIcon>
              <FolderSharedSharp />
            </ListItemIcon>
            <ListItemText className={classes.itemText} primary="Shared with me" />
            <ListItemIcon className={classes.collapser}>
              {this.state.toggleShared ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
          </ListItem>
        {this.state.notes.map((note, index) => {
          return (
            <Collapse in={this.state.toggleShared} timeout="auto" unmountOnExit key={note._id}>
              <List component="div" disablePadding>
                <ListItem 
                  button
                  className={`${classes.nested} ${classes.noteListItem}`}
                  selected={this.state.selectedSharedIndex === index}
                >
                <TextField
                  className={classes.noteField}
                  key={note._id}
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
                  onClick={() => {this.handleSelectRefresh(note._id); this.props.handleSharedIndex(index); }}
                  aria-owns={contextOpen ? 'simple-menu' : null}
                  aria-haspopup="true"
                  onContextMenu={(e) => this.handleContextMenu(e, note._id)}
                />
                </ListItem>
              </List>
            </Collapse>
            );
          })}
        </List>
      </>
      ) : (
      <>
        {this.state.isLoading ? (
          <></>
        ) : (
          <></>
        )}
        </>
      )
      }
      </>
    );
  }
}

SharedNotes.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SharedNotes);