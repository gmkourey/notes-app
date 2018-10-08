import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Grid from '@material-ui/core/Grid';

import classNames from 'classnames';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';

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
    display: 'flex',
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
    width: drawerWidth,
    // width: 0
    // height: '100vh' // Needed if removing root/ app divs
  },
  drawerHeaderL: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerHeaderR: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

class LeftDrawer extends React.Component {
  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
         <div className={classes.appFrame}>
        {/* <React.Fragment> */}
        {/* <Grid item xs={4} md={2}> */}
          <Drawer
            variant="persistent"
            open={this.props.leftOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeaderL}>
              Left Drawer
              <IconButton onClick={this.props.handleLeftDrawer}>
                <ChevronLeftIcon/>
              </IconButton>
            </div>
            <Divider />
              Testing
            <Divider />
              Testing
          </Drawer>
        {/* </Grid> */}
          {/* <main style={{ marginLeft: 10 }}> */}
        {/* <Grid item xs={4} md={8}> */}
          <main
            className={classNames(classes.content, classes['content-right content-left'], {
              // [classes.contentShift]: this.props.rightOpen,
              [classes['contentShift-left']]: this.props.leftOpen,
              [classes['contentShift-right']]: this.props.rightOpen
            })}
          >
            <Typography>Test from leftdrawer.js</Typography>
          </main>
        {/* </Grid> */}
        {/* <Grid item xs={4} md={2}> */}
          <Drawer
            anchor="right"
            variant="persistent"
            open={this.props.rightOpen}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeaderR}>
              <IconButton onClick={this.props.handleRightDrawer}>
                <ChevronRightIcon/>
              </IconButton>
              Right Drawer
            </div>
          </Drawer>
        {/* </Grid> */}
        {/* </React.Fragment> */}
         </div>
       </div>
    );
  }
}

LeftDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(LeftDrawer);