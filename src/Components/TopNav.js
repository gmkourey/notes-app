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


const styles = {
  root: {
    flexGrow: 1,
  },
};

const Navbar = (props) => {
  const { classes } = props;
  return(
    <div className={classes.root}>
      <AppBar position="static" color="default"
          // className={classNames(classes.appBar, {
          // [classes.appBarShift]: open,
          // [classes[`appBarShift-${anchor}`]]: open,
        // })}
        >
        {/* <Toolbar disableGutters={!open}> */}
        <Toolbar>
          <IconButton
            // color="inherit"
            // aria-label="Open drawer"
            // onClick={this.handleDrawerOpen}
            // className={classNames(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Test
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);