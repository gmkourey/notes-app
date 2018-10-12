import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import SharedNotes from "../SharedNotes/SharedNotes"
import AddSharp from '@material-ui/icons/AddSharp';
import VerticalAlignBottomSharp from '@material-ui/icons/VerticalAlignBottomSharp';

import NoteList from '../NoteList/NoteList';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';

import API from '../../utils/API';
import {firebase} from "../../firebase";

// import { Value } from 'slate';

// import Typography from '@material-ui/core/Typography';
// import classNames from 'classnames';

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
    // marginLeft: drawerWidth,
    marginLeft: 0
  },
  'appBarShift-right': {
    // marginRight: drawerWidth,
    marginLeft: 0
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
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '240px'
    },
    height: `calc(100vh - 74px)`
  },
  headerPaper: {
    position: 'relative',
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '240px'
    },
  },
  drawerHeaderL: {
    // position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});


class LeftDrawer extends Component {

  state = {
    title: "Untitled",
    body: "",
    notes: [],
    email: "",
  }

  constructor(props) {
    super(props);
    this.handleNewNote = this.handleNewNote.bind(this);
    this.handleSelectedNote = this.props.handleSelectedNote.bind(this);
    this.handleDeleteAlert = this.props.handleDeleteAlert.bind(this);
    this.child = React.createRef();
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser != null) this.setState({ email: authUser.email }, function() {
      })
    })
  }

  handleNewNote () {
    console.log("Hit handleNewNote function");
    console.log(this.state.title);

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
        />
        <SharedNotes
        notes={this.state.notes}
        handleSelectedNote={this.handleSelectedNote}
        />
      </>
    )

    const header = (
      <div className={classes.drawerHeaderL} style={{ minHeight: '34px', maxHeight: '34px'}}>
        <IconButton 
          className={classes.menuButton}
          onClick={this.handleNewNote}>
          <AddSharp
            title={this.state.title}
            body={this.state.body}/>
        </IconButton>
        <IconButton 
          className={classes.menuButton}
          onClick={this.props.handleLeftDrawer}>
          <VerticalAlignBottomSharp
            style={{
              transform: 'rotate(90deg)',
            }}
          />
        </IconButton>
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