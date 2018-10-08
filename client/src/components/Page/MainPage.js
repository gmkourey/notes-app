import React from 'react';
import Navbar from '../TopNav/TopNav';
import { withStyles } from '@material-ui/core/styles';
import LeftDrawer from '../LeftDrawer/LeftDrawer'
import RightDrawer from '../RightDrawer/RightDrawer';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import AuthUserContext from '../AuthUserContext';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import Content from '../Content/Content';

// import { firebase } from '../../firebase';

const styles = {
  root: {
    flexGrow: 1
  },
  appFrame: {
    height: '100vh', // Important
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    // display: 'flex',
    width: '100%'
  }
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // authUser: null,
      leftOpen: false,
      rightOpen: false,
      // content: 
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

  // componentDidMount() {
  //   firebase.auth.onAuthStateChanged(authUser => {
  //     authUser
  //       ? this.setState({ authUser })
  //       : this.setState({ authUser: null });
  //   });
  // }

  render() {
    const { classes } = this.props;

    return(
      <>        
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <Navbar
              leftOpen={this.state.leftOpen}
              rightOpen={this.state.rightOpen}
              handleLeftDrawer={this.handleLeftDrawer}
              handleRightDrawer={this.handleRightDrawer}
            />
            <Grid container>
              <Grid item md={2}>
                <LeftDrawer
                  leftOpen={this.state.leftOpen}
                  handleLeftDrawer={this.handleLeftDrawer}
                />
              </Grid>

              <Grid item md={8}>
                <main>
                  <Content/>
                </main>
              </Grid>

              <Grid item md={2}>
                <RightDrawer
                  rightOpen={this.state.rightOpen}
                  handleRightDrawer={this.handleRightDrawer}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(MainPage);