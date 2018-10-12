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
import Modal from '@material-ui/core/Modal';
import Typography from "@material-ui/core/Typography";

import AuthUserContext from '../AuthUserContext';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import AccountPage from '../Account';

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
    top: '4px !important',
    zIndex: 1201
  },
  menuButton: {
    padding: '5px',
    marginRight: '15px'
  },
  modalPaper: {
    position: 'absolute',
    // width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class AccountMenuList extends React.Component {
  state = {
    open: false,
    accountModalOpen: false,
  };

  handleAccountToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleAccountClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    
    this.setState({ open: false });
  };

  handleAccountModalOpen = (e) => {
    this.handleAccountClose(e)
    this.setState({ accountModalOpen: true });
  }

  handleAccountModalClose = () => {
    this.setState({ accountModalOpen: false });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <>
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
            className={classNames(classes.menuButton)}
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
                  <ClickAwayListener onClickAway={this.handleAccountClose}>
                    <MenuList>
                      <AuthUserContext.Consumer>
                        {authUser => authUser
                          ? (
                            <>
                            <MenuItem onClick={(e) => this.handleAccountModalOpen(e)}>
                                Account
                            </MenuItem>
                            <MenuItem onClick={auth.doSignOut}>Log out</MenuItem>
                            </>
                          ) : (
                            <MenuItem onClick={this.handleAccountClose}>
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
      <Modal
        aria-labelledby="account-modal"
        aria-describedby="account-modal-description"
        open={this.state.accountModalOpen}
        onClose={this.handleAccountModalClose}
      >
        <div style={getModalStyle()} className={classes.modalPaper}>
          <AccountPage />
        </div>
      </Modal>
      </>
    );
  }
}

AccountMenuList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountMenuList);