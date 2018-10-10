import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';

import NoteList from '../NoteList/NoteList';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';

import API from '../../utils/API';

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
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    display: 'block',
    // width: '100%',
    // width: drawerWidth,
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '240px'
    },
    height: '100vh'
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
    notes: []
  }

  constructor(props) {
    super(props);
    this.handleNewNote = this.handleNewNote.bind(this);
    this.handleSelectedNote = this.props.handleSelectedNote.bind(this);
    this.handleDeleteAlert = this.props.handleDeleteAlert.bind(this);
    this.child = React.createRef();
  }

  // componentDidMount() {
  //   console.log("LeftDrawer.js componentDidMount()");
  //   // this.loadNotes();
  // }

  // new note doesn't update the note list until the drawer is closed and opened again
  handleNewNote () {
    console.log("Hit handleNewNote function");
    console.log(this.state.title);

    API.saveNote({
      title: this.state.title,
      body: this.state.body
    })
      // .then(this.child.current.loadNotes());
      .then(this.child.current.refreshNewNote());
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
      </>
    )

    const header = (
      <div className={classes.drawerHeaderL}>
        <IconButton>
          <Add 
            title={this.state.title}
            body={this.state.body}
            onClick={this.handleNewNote}/>
        </IconButton>
          Left Drawer
        <IconButton onClick={this.props.handleLeftDrawer}>
          <Close style={{
              width: 15,
              height: 15
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
              {/* {header} */}
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