import React from 'react';
import AuthUserContext from '../AuthUserContext';
import SignUpPage from '../SignUp';
import Note from "../Note";
import NoteArea from "../NoteArea";

// import Typography from '@material-ui/core/Typography';
// import SignInPage from '../SignIn';

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
            {/* {console.log("Getting user info from firebase...")}
            {console.log(authUser)} */}
            <NoteArea />
            <div>
              {this.props.selectedNote}
            </div>
            {/* <Typography>{'You\'re logged in.'}</Typography>
            <Typography>{'Component for draft-js goes here'}</Typography> */}
            <Note/>
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