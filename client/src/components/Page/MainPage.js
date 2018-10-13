import React from 'react';
import Navbar from '../TopNav/TopNav';
// import { withStyles } from '@material-ui/core/styles';
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
    // display: 'flex',
    width: '100%'
  },
  scroll: {
    overflowY: 'scroll',
    height: 'calc(100vh - 40px)'
  }
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // authUser: null,
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
    // console.log(`Selected note function fired in Mainpage. Setting state for selected note:\n id: ${id} \n content: ${content}`);

    this.setState({
      selectedNoteID: id,
      selectedNoteBody: content
    })
    console.log(this.state.selectedNoteID + "\n" + this.state.selectedNoteBody)
  }

  handleDeleteAlert = () => {
    console.log("Delete alert function fired.");
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
    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser != null) this.setState({ leftOpen: true })
      if (!authUser) this.setState({ leftOpen: false })
    })
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
            <Grid container className={classes.scroll}>
              <Grid item md={2}>
                <LeftDrawer
                  leftOpen={this.state.leftOpen}
                  handleLeftDrawer={this.handleLeftDrawer}
                  handleSelectedNote={this.handleSelectedNote}
                  handleDeleteAlert={this.handleDeleteAlert}
                />
              </Grid>

              <Grid item md={8}>
                <main>
                  <Content
                    selectedNoteID={this.state.selectedNoteID}
                    selectedNoteBody={this.state.selectedNoteBody}
                    text={this.state.text}
                  />
                </main>
              </Grid>

              {/* <Grid item md={2}>
              </Grid> */}
            </Grid>
          </div>
        </div>
      </MuiThemeProvider>
      </>
    );
  }
}

export default withStyles(styles, {withTheme: true} )(MainPage);