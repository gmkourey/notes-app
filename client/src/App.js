import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import MainPage from './components/Page/MainPage';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import AccountPage from './components/Account';
// import Note from "./components/Note";

import withAuthentication from './components/withAuthentication';
import * as routes from './constants/routes';

// currently unused components, shouldn't need them in the end
// import Navigation from './components/Navigation';
// import LandingPage from './components/Landing';
// import HomePage from './components/Home';


//dark theme
const style1 = {
  filter: 'invert(.85)'
}

const style2 = {
  filter: 'invert(0)'
}





class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      style : style1
    }

  }
  toggleClass(){
    console.log("toggle clicked")
    console.log(this.state);
    
    if(this.state.style=="style1"){
        this.setState({style:"style2"})
    }
    else
        this.setState({style:"style1"})
    }

  render(){
    return(
      <Router>
        <>
          {/* <Navigation /> */}

          {/* <Route exact path={routes.LANDING} component={LandingPage} /> */}
          <Route 
            exact path={routes.LANDING} 
            render={(props) => <MainPage {...props} style={this.state.style} />}
          />
          <Route exact path={routes.SIGN_UP} component={SignUpPage} 
          render={(props) => <SignUpPage {...props} style={this.state.style} />}
          />
          <Route exact path={routes.SIGN_IN} component={SignInPage} 
          render={(props) => <SignInPage {...props} style={this.state.style} />}
          />
          <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} 
          render={(props) => <PasswordForgetPage {...props} style={this.state.style} />}
          />
          <Route exact path={routes.HOME} component={MainPage}
          render={(props) => <MainPage {...props} style={this.state.style} />}
          />
          <Route exact path={routes.ACCOUNT} component={AccountPage} 
          render={(props) => <AccountPage {...props} style={this.state.style}/>}
          />
          {/* <Route exact path={routes.NOTE} component={Note}/> */}

        </>
      </Router>
    )
  }
}

export default withAuthentication(App);
