import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './Components/Navigation';
import LandingPage from './Components/Landing';
import SignUpPage from './Components/SignUp';
import SignInPage from './Components/SignIn';
import PasswordForgetPage from './Components/PasswordForget';
import HomePage from './Components/Home';
import AccountPage from './Components/Account';

import withAuthentication from './Components/withAuthentication';
import * as routes from './constants/routes';

const App = () =>
  <Router>
    <div>
      <Navigation />

      <hr/>

      <Route exact path={routes.LANDING} component={LandingPage} />
      <Route exact path={routes.SIGN_UP} component={SignUpPage} />
      <Route exact path={routes.SIGN_IN} component={SignInPage} />
      <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.ACCOUNT} component={AccountPage} />
    </div>
  </Router>

export default withAuthentication(App);
