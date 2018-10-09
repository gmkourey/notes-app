import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
import API from "../utils/API";

import PropTypes from 'prop-types';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';




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
  // avatar: {
  //   margin: theme.spacing.unit,
  //   backgroundColor: theme.palette.secondary.main,
  // },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

// const SignUpPage = ({ history }) =>

//   <div>
//     <h1>SignUp</h1>
//     <SignUpForm history={history} />
//   </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
  

  this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });

      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

      if(this.state.username && this.state.email) {
        
        API.saveUser({
            username: this.state.username,
            email: this.state.email
        })}
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      // error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';


    return (
      <React.Fragment>
          <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography variant="headline">Sign up for free!</Typography>
              <form className={classes.form} onSubmit={this.onSubmit}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Account Name</InputLabel>
                  <Input
                    onChange={event => this.setState(byPropKey('username', event.target.value))}
                    type="text"
                    placeholder="Your account name."
                    autoFocus 
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input 
                    id="email"
                    name="email"
                    autoComplete="email"
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    placeholder="Your email address will be used for logging in."
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="passwordOne"
                    autoComplete="current-password"
                    placeholder="Password must be at least 6 characters long."
                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Confirm password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="passwordTwo"
                    autoComplete="current-password"
                    placeholder="Type your password again."
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                  />
                </FormControl>
                <Button
                  disabled={isInvalid}
                  type="submit"
                  fullWidth
                  variant="raised"
                  color="primary"
                  className={classes.submit}
                >
                  Create Account
                </Button>
                <FormControl margin="normal" fullWidth>
                  <a href="#">Already have an account?</a>
                </FormControl>
              </form>
            </Paper>
          </main>
        </React.Fragment>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
// export default withRouter(SignUpPage);
export default withStyles(styles)(SignUpForm);
export {
  SignUpForm,
  SignUpLink,
};