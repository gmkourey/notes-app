import React from 'react';
import AuthUserContext from '../AuthUserContext';
import SignUpPage from '../SignUp';
import NoteArea from "../NoteArea";

class Content extends React.Component {
  render() {

    return (
      <AuthUserContext.Consumer>
        {authUser => authUser
          ? (
            <>
            <NoteArea 
              selectedNoteBody={this.props.selectedNoteBody}
              selectedNoteID={this.props.selectedNoteID}
              text={this.props.text}
            />
            </>
          ) : (
            <SignUpPage/>
          )
        }
      </AuthUserContext.Consumer>
    )
  }
}

export default Content;