import React from 'react';

import AuthUserContext from './AuthUserContext';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';
import Typography from '@material-ui/core/Typography';



const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <Typography variant="subtitle1">
          Account: {authUser.email}
        </Typography>
        {console.log(authUser)}
        <PasswordChangeForm />

      </div>
      
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);