import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../constants/routes';

import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Navbar from './TopNav/TopNav';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      // marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

// const PasswordForgetPage = () =>
//   <div>
//     <h1>PasswordForget</h1>
//     <PasswordForgetForm />
//   </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const { classes } = this.props;

    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <>
      <Navbar />
      <CssBaseline />
      <main className={classes.layout}>
      <Paper className={classes.paper}>
      <form className={classes.form} onSubmit={this.onSubmit}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            type="email"
            // autoComplete="email"
            margin="normal"
            value={this.state.email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
          />

          
        </FormControl>
        <Button disabled={isInvalid} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          Reset My Password
        </Button>
      </form>
      </Paper>
      </main>
      </>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>


PasswordForgetForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

// export default PasswordForgetPage;
export default withStyles(styles)(PasswordForgetForm);
export {
  PasswordForgetForm,
  PasswordForgetLink,
};