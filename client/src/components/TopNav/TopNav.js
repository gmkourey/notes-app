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
import AccountMenu from '../AccountMenu/AccountMenu';

import AuthUserContext from '../AuthUserContext';
// import { auth } from '../../firebase';
// import * as routes from '../../constants/routes';

const styles = {
  root: {
    flexGrow: 1,
  },
};

// const Navbar = (props) => {
class Navbar extends React.Component {

  render() {
    const { classes } = this.props;
    return(
      <AppBar position="static" color="default" // style={{maxHeight: 35}}
        className={classNames(classes.appBar, {
          [classes[`appBarShift-left`]]: this.props.leftOpen,
          [classes[`appBarShift-right`]]: this.props.rightOpen
        })}
      >
        <Toolbar>
        <AuthUserContext.Consumer>
          {authUser => authUser
            ? (
            <>
              <IconButton
                color="inherit"
                aria-label="Open left  drawer"
                onClick={this.props.handleLeftDrawer}
                className={classNames(classes.menuButton, this.props.leftOpen && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" style={{flex: 1}}>
                grantsnotes
              </Typography>
              <AccountMenu/>
              <IconButton
                color="inherit"
                aria-label="Open right drawer"
                onClick={this.props.handleRightDrawer}
                className={classNames(classes.menuButton, this.props.rightOpen && classes.hide)}
              >
                <Settings />
              </IconButton>
            </>
            ) : (
            <>
              <Typography variant="title" color="inherit" style={{flex: 1}}>
                grantsnotes
              </Typography>
              <AccountMenu/>
            </>
            )
          }
        </AuthUserContext.Consumer>
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);