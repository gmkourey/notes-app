import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import SharedNotes from '../SharedNotes/SharedNotes';
import AddSharp from '@material-ui/icons/AddSharp';
import VerticalAlignBottomSharp from '@material-ui/icons/VerticalAlignBottomSharp';
import Tooltip from '@material-ui/core/Tooltip';
import NoteList from '../NoteList/NoteList';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';

import API from '../../utils/API';
import {firebase} from "../../firebase";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: '100vh', // Important
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    // display: 'flex',
    width: '100%',
    borderBottom: ""
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
    // marginLeft: 0
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
    // marginLeft: 0
  },
  menuButton: {
    padding: '5px',
    borderRadius: 0,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100vh',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '225px',
      height: `calc(100vh - 74px)`
    },
  },
  headerPaper: {
    position: 'relative',
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '225px',
    },
  },
  drawerHeaderL: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});


class LeftDrawer extends Component {
  _isMounted = false;

  state = {
    title: "Untitled",
    body: "",
    notes: [],
    email: "",
    selectedIndex: null,
    selectedSharedIndex: null,
  }

  constructor(props) {
    super(props);
    this.handleNewNote = this.handleNewNote.bind(this);
    this.handleSelectedNote = this.props.handleSelectedNote.bind(this);
    this.handleDeleteAlert = this.props.handleDeleteAlert.bind(this);
    this.child = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser != null && this._isMounted) this.setState({ email: authUser.email })
      })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleNewNote () {

    const initialValue = {
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
                    text: "",
                  },
                ],
              },
            ],
          },
        ],
      },
    }

    API.saveNote({
      title: "Untitled",
      userId: this.state.email,
      content: JSON.stringify(initialValue)
    })
      .then(this.child.current.refreshNewNote(this.state.email));
  };

  handleSelectedIndex = (index) => {
    this.setState({ selectedIndex: index, selectedSharedIndex: null });
  }

  handleSharedIndex = (index) => {
    this.setState({ selectedSharedIndex: index, selectedIndex: null })
  }

  render() {
    const { classes } = this.props;

    const drawer = (
      <>
        <Divider/>
        <NoteList
          notes={this.state.notes}
          handleSelectedNote={this.handleSelectedNote}
          handleDeleteAlert={this.props.handleDeleteAlert}
          innerRef={this.child}
          selectedIndex={this.state.selectedIndex}
          handleSelectedIndex={this.handleSelectedIndex}
        />
        <SharedNotes
          notes={this.state.notes}
          handleSelectedNote={this.handleSelectedNote}
          selectedSharedIndex={this.state.selectedSharedIndex}
          handleSharedIndex={this.handleSharedIndex}
        />
      </>
    )

    const header = (
      <div className={classes.drawerHeaderL} style={{ minHeight: '34px', maxHeight: '34px'}}>
        <Tooltip title="New note">
          <IconButton 
            className={classes.menuButton}
            onClick={this.handleNewNote}>
            <AddSharp
              title={this.state.title}
              body={this.state.body}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Close notes panel">
          <IconButton 
            className={classes.menuButton}
            onClick={this.props.handleLeftDrawer}>
            <VerticalAlignBottomSharp
              style={{
                transform: 'rotate(90deg)',
              }}
            />
          </IconButton>
        </Tooltip>
      </div>
    )

    return (
        <>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={this.props.leftOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {header}
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden smDown implementation="css">
            <Drawer
              variant="persistent"
              open={this.props.leftOpen}
              classes={{
                paper: classes.headerPaper,
              }}
            >
              {header}
            </Drawer>
            <Drawer
              variant="persistent"
              open={this.props.leftOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
        </Hidden>
        </>
    );
  }
}

LeftDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(LeftDrawer);