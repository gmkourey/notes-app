import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import AuthUserContext from '../AuthUserContext';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  account: {
    borderRadius: 0
  },
  menu: {
    top: '9px !important',
    zIndex: 1201
  }
});

class AccountMenuList extends React.Component {
  state = {
    open: false,
  };

  handleAccountToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <div>
          <IconButton
            color="inherit"
            aria-label="Account"
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={this.handleAccountToggle}
          >
            <AccountCircle/>  
          </IconButton>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal 
            className={classNames(classes.menu)}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                className={classNames(classes.account)}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <AuthUserContext.Consumer>
                        {authUser => authUser
                          ? (
                            <>
                            <MenuItem onClick={this.handleClose}>
                              <Link to={routes.ACCOUNT} style={{ textDecoration: 'none', color: "#000"}}>
                                Account
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={auth.doSignOut}>Logout</MenuItem>
                            </>
                          ) : (
                            <MenuItem onClick={this.handleClose}>
                              <Link to={routes.SIGN_IN} style={{ textDecoration: 'none', color: "#000"}}>
                                Sign in
                              </Link>
                            </MenuItem>
                          )
                        }
                      </AuthUserContext.Consumer>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

AccountMenuList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountMenuList);