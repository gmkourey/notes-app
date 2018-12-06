import React from 'react';
import { Link } from 'react-router-dom';
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
import Tooltip from '@material-ui/core/Tooltip';
import * as routes from '../../constants/routes';

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
        className={classes.appBar}
      >
        <Toolbar className={classNames(classes.toolBar)}>
        <AuthUserContext.Consumer>
          {authUser => authUser
            ? (
            <>
              <Tooltip title="Toggle notes panel">
                <IconButton
                  color="inherit"
                  aria-label="Toggle notes panel"
                  onClick={this.props.handleLeftDrawer}
                  className={classNames(classes.menuButton, this.props.leftOpen && classes.hide)}
                >
                  <MenuSharp />
                </IconButton>
              </Tooltip>
              <Typography variant="title" color="inherit" style={{flex: 1}}>
                  GrantsNotes
              </Typography>
              <Tooltip title="Toggle theme">
                <FormControlLabel
                  control={
                    <Switch
                      onChange={this.props.handleThemeToggle}
                      value="theme"
                      color="default"
                    />
                  }
                />
              </Tooltip>
              <AccountMenu/>
            </>
            ) : (
            <>
              <Typography variant="title" color="inherit" style={{flex: 1}}>
                <Link to={routes.LANDING} style={{ textDecoration: 'none', color: "#000"}}>
                  GrantsNotes
                </Link>
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