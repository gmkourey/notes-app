import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuSharp from '@material-ui/icons/MenuSharp';
import SettingsSharp from '@material-ui/icons/SettingsSharp';
import AccountMenu from '../AccountMenu/AccountMenu';

import AuthUserContext from '../AuthUserContext';
// import { auth } from '../../firebase';
// import * as routes from '../../constants/routes';

const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: 'none'
  },
  toolBar: {
    maxHeight: '40px',
    minHeight: '40px'
  },
  menuButton: {
    padding: '5px',
    marginRight: '15px'
  }
};

class Navbar extends React.Component {

  render() {
    const { classes } = this.props;
    return(
      <AppBar position="static" color="default"
        className={classNames(classes.appBar, {
          [classes[`appBarShift-left`]]: this.props.leftOpen,
          [classes[`appBarShift-right`]]: this.props.rightOpen
        })}
      >
        <Toolbar className={classNames(classes.toolBar)}>
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
                <MenuSharp />
              </IconButton>
              <Typography variant="title" color="inherit" style={{flex: 1}}>
                GrantsNotes
              </Typography>
              <AccountMenu/>
              <IconButton
                color="inherit"
                aria-label="Open right drawer"
                onClick={this.props.handleRightDrawer}
                className={classNames(classes.menuButton, this.props.rightOpen && classes.hide)}
              >
                <SettingsSharp />
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