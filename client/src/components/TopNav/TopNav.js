import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuSharp from '@material-ui/icons/MenuSharp';
import AccountMenu from '../AccountMenu/AccountMenu';
import AuthUserContext from '../AuthUserContext';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// const theme = createMuiTheme({
//   palette: {
//     // type: 'dark',
//     primary: {
//       main: '#c8e6c9',
//     },
//     secondary: {
//       main: '#e8f5e9',
//     },
//   },
// });

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
  },
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
              <FormControlLabel
                control={
                  <Switch
                    onChange={this.props.handleThemeToggle}
                    value="theme"
                    color="default"
                  />
                }
              />
              <AccountMenu/>
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