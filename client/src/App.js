import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/Page/MainPage';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import AccountPage from './components/Account';
// import Note from "./components/Note";

import withAuthentication from './components/withAuthentication';
import routes from './constants/routes';

// currently unused components, shouldn't need them in the end
// import Navigation from './components/Navigation';
// import LandingPage from './components/Landing';
// import HomePage from './components/Home';

const App = () =>
  <Router>
    <>
      <Switch>
        <Route exact path={routes.LANDING} component={MainPage} />
        <Route exact path={routes.SIGN_UP} component={SignUpPage} />
        <Route exact path={routes.SIGN_IN} component={SignInPage} />
        <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route exact path={routes.HOME} component={MainPage} />
        <Route exact path={routes.ACCOUNT} component={AccountPage} />
      </Switch>
    </>
  </Router>

export default withAuthentication(App);
