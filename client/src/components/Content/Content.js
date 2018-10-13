import React from 'react';
import AuthUserContext from '../AuthUserContext';
import SignUpPage from '../SignUp';
// import Note from "../Note";
import NoteArea from "../NoteArea";

class Content extends React.Component {
  render() {

    return (
      <AuthUserContext.Consumer>
        {authUser => authUser
          ? (
            <>
            {/* For testing */}
            {/* {console.log("Getting user info from firebase...")}
            {console.log(authUser)} */}
            <NoteArea 
              selectedNoteBody={this.props.selectedNoteBody}
              selectedNoteID={this.props.selectedNoteID}
              text={this.props.text}
            />
            </>
          ) : (
            <SignUpPage/>
            // This page needs info about the app, ie. landing page
          )
        }
      </AuthUserContext.Consumer>
    )
  }
}

export default Content;