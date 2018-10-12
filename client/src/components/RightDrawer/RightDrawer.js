import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';

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
    marginRight: 0 // or marginLeft??
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
    // width: drawerWidth,
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '240px'
    },
    marginRight: 0,
    // marginLeft: `calc(${parentNode.width} - ${drawerWidth}px`,
    // width: 0
    height: '100vh' // Needed if removing root/ app divs
  },
  drawerHeaderR: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class RightDrawer extends Component {
  render() {
    const { classes } = this.props;

    const drawer = (
      <>
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.props.handleRightDrawer}>
            <Close style={{
                width: 15,
                height: 15
              }}
            />
          </IconButton>
          Right Drawer

              <ThemeSwitch/>


        </div>
        
        <Divider/>
        
      </>
    )

    return (
      <>
        <Hidden mdUp>
          <Drawer
              anchor="right"
              variant="temporary"
              open={this.props.rightOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
          </Drawer>
        </Hidden>

        <Hidden smDown>
          <Drawer
            anchor="right"
            variant="persistent"
            open={this.props.rightOpen}
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

RightDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(RightDrawer);