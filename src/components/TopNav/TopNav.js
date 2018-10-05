// this file is unused 

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Settings from '@material-ui/icons/Settings';


const styles = {
  root: {
    flexGrow: 1,
  },
};

// const Navbar = (props) => {
class Navbar extends React.Component {
  // const { classes } = this.props;
  render() {
    const { classes } = this.props;
  return(
    // <div className={classes.root}>
        // <div className={classes.appFrame}>
          <AppBar position="static" color="default"
            className={classNames(classes.appBar, {
              // [classes.appBarShift]: this.props.rightOpen,
              [classes[`appBarShift-left`]]: this.props.leftOpen,
              [classes[`appBarShift-right`]]: this.props.rightOpen
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open left  drawer"
                // onClick={this.handleDrawerOpen}
                onClick={this.props.handleLeftDrawer}
                className={classNames(classes.menuButton, this.props.leftOpen && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" style={{flex: 1}}>
                grantsnotes
              </Typography>
              <IconButton
                color="inherit"
                aria-label="Open right drawer"
                // onClick={this.handleDrawerOpen}
                onClick={this.props.handleRightDrawer}
                className={classNames(classes.menuButton, this.props.rightOpen && classes.hide)}
              >
                <Settings />
              </IconButton>
            </Toolbar>
          </AppBar>
        // </div>
      // </div>
    
    // <div className={classes.root}>
    //   <AppBar position="static" color="default"
    //       className={classNames(classes.appBar, {
    //       [classes.appBarShift]: this.props.open,
    //       [classes[`appBarShift-left`]]: this.props.open,
    //     })}
    //     >
    //     <Toolbar disableGutters={!this.props.open}>
    //       <IconButton
    //         color="inherit"
    //         aria-label="Open drawer"
    //         // onClick={this.handleDrawerOpen}
    //         onClick={this.props.handleLeftDrawer}
    //         className={classNames(classes.menuButton, this.props.open && classes.hide)}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography variant="title" color="inherit">
    //         Test
    //       </Typography>
    //     </Toolbar>
    //   </AppBar>
    // </div>
  );
}
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);