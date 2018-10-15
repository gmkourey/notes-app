import React from 'react';
import Navbar from '../TopNav/TopNav';
import LeftDrawer from '../LeftDrawer/LeftDrawer'
import Grid from '@material-ui/core/Grid';
import Content from '../Content/Content';
import DeleteAlert from '../DeleteAlert/DeleteAlert';
import { firebase } from '../../firebase';

import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = {
  root: {
    flexGrow: 1
  },
  appFrame: {
    height: '100vh', // Important
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
  },
  scroll: {
    overflowY: 'scroll',
    height: 'calc(100vh - 40px)'
  }
}

class MainPage extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      leftOpen: false,
      selectedNoteID: null,
      selectedNoteBody: null,
      deleteAlertOpen: false,
      theme: 'light',
      text: 'black'
    };
  }

  handleLeftDrawer = () => {
    this.setState({
      leftOpen: !this.state.leftOpen
    });
  };

  handleSelectedNote = (id, content) => {

    this.setState({
      selectedNoteID: id,
      selectedNoteBody: content
    })
  }

  handleDeleteAlert = () => {
    this.setState({
      deleteAlertOpen: true
    })
  }

  handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ deleteAlertOpen: false });
  };

  componentDidMount() {
    this._isMounted = true;
      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser != null && this._isMounted) this.setState({ leftOpen: true })
        if (!authUser && this._isMounted) this.setState({ leftOpen: false })
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleThemeToggle = () => {
    if (this.state.theme === 'light') {
      this.setState({ theme: 'dark', text: 'white' })
    }
    else {
      this.setState({ theme: 'light', text: 'black' })
    }
  }

  render() {
    const { classes } = this.props;

    const theme = createMuiTheme({
      palette: {
        type: this.state.theme,
      },
    });

    return(
      <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <Navbar
              leftOpen={this.state.leftOpen}
              handleLeftDrawer={this.handleLeftDrawer}
              handleThemeToggle={this.handleThemeToggle}
            />
            <DeleteAlert
              deleteAlertOpen={this.state.deleteAlertOpen}
              handleAlertClose={this.handleAlertClose}
            />
            <Grid container spacing={32}>
              <Grid item md={2}>
                <LeftDrawer
                  leftOpen={this.state.leftOpen}
                  handleLeftDrawer={this.handleLeftDrawer}
                  handleSelectedNote={this.handleSelectedNote}
                  handleDeleteAlert={this.handleDeleteAlert}
                />
              </Grid>

              <Grid item md={9} xs={12}>
                <main>
                  <Content
                    selectedNoteID={this.state.selectedNoteID}
                    selectedNoteBody={this.state.selectedNoteBody}
                    text={this.state.text}
                  />
                </main>
              </Grid>
            </Grid>
          </div>
        </div>
      </MuiThemeProvider>
      </>
    );
  }
}

export default withStyles(styles, {withTheme: true} )(MainPage);