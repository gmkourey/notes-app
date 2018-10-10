import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class DeleteAlert extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          className={classes.alert}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.deleteAlertOpen}
          autoHideDuration={2000}
          onClose={this.props.handleAlertClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Note deleted</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.props.handleAlertClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

DeleteAlert.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteAlert);