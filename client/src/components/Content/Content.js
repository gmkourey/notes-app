import React from 'react';
import AuthUserContext from '../AuthUserContext';
// import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import Typography from '@material-ui/core/Typography';

class Content extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     content: 
  //   };
  // }

  render() {

    return (
      <AuthUserContext.Consumer>
        {authUser => authUser
          ? (
            <>
            {/* For testing */}
            {console.log("Getting user info from firebase...")}
            {console.log(authUser)}
            <Typography>{'You\'re logged in.'}</Typography>
            <Typography>{'Component for draft-js goes here'}</Typography>
            </>
          ) : (
            // <SignInPage/>
            <SignUpPage/>
            // This page needs info about the app, ie. landing page
          )
        }
      </AuthUserContext.Consumer>
    )
  }
}

export default Content;