import React from 'react';

import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';

// trying to implement the user frontend
// import Navbar from './TopNav/TopNav';
// import LeftDrawer from './LeftDrawer/LeftDrawer';
// import RightDrawer from './RightDrawer/RightDrawer';
// import Typography from '@material-ui/core/Typography';

const withAuthentication = (Component) =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        leftOpen: false,
        rightOpen: false
      };
    }

    handleLeftDrawer = () => {
      this.setState({
        leftOpen: !this.state.leftOpen
      });
    };
  
    handleRightDrawer = () => {
      this.setState({
        rightOpen: !this.state.rightOpen
      })
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      });
    }

    render() {
      const { authUser } = this.state;

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

export default withAuthentication;