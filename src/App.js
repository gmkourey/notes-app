import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Navbar from './components/TopNav/TopNav';
import LeftDrawer from './components/LeftDrawer/LeftDrawer';
import RightDrawer from './components/RightDrawer/RightDrawer';
import Typography from '@material-ui/core/Typography';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

// const styles = theme => ({
// const theme = createMuiTheme({
//   root: {
//     flexGrow: 1,
//   },
//   appFrame: {
//     height: '100vh',
//     zIndex: 1,
//     overflow: 'hidden',
//     position: 'relative',
//     display: 'flex',
//     width: '100%',
//   }
// });
// const drawerWidth = 240;

// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   appFrame: {
//     height: '100vh', // Important
//     zIndex: 1,
//     overflow: 'hidden',
//     position: 'relative',
//     display: 'flex',
//     width: '100%',
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     position: 'absolute',
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   'appBarShift-left': {
//     marginLeft: drawerWidth,
//   },
//   'appBarShift-right': {
//     marginRight: drawerWidth,
//   },
//   menuButton: {
//     marginLeft: 12,
//     marginRight: 20,
//   },
//   hide: {
//     display: 'none',
//   },
//   drawerPaper: {
//     position: 'relative',
//     width: drawerWidth,
//   },
//   drawerHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: '0 8px',
//     ...theme.mixins.toolbar,
//   },
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing.unit * 3,
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   'content-left': {
//     marginLeft: -drawerWidth,
//   },
//   'content-right': {
//     marginRight: -drawerWidth,
//   },
//   contentShift: {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   'contentShift-left': {
//     marginLeft: 0,
//   },
//   'contentShift-right': {
//     marginRight: 0,
//   },
// });

class App extends Component {
  constructor() {
    super();
    this.state = {
      leftOpen: false,
      rightOpen: false
    };
    this.handleLeftDrawer = this.handleLeftDrawer.bind(this);
    // this.handleRightDrawer = this.handleRightDrawer.bind(this);
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

  render() {
    // const { classes, theme } = this.props;
    // const classes = styles.theme;
    return (
      <React.Fragment>
        {/* <div> */}
      <div className='root'>
      <div className='appFrame'>
        <Navbar
          leftOpen={this.state.leftOpen}
          rightOpen={this.state.rightOpen}
          handleLeftDrawer={this.handleLeftDrawer}
          handleRightDrawer={this.handleRightDrawer}
        />
        <LeftDrawer
          leftOpen={this.state.leftOpen}
          rightOpen={this.state.rightOpen}
          handleLeftDrawer={this.handleLeftDrawer}
          handleRightDrawer={this.handleRightDrawer}
        />
        {/* <main>
          <Typography>{'Test from app.js.'}</Typography>
        </main> */}
        {/* <RightDrawer
          rightOpen={this.state.rightOpen}
          handleRightDrawer={this.handleRightDrawer}
        /> */}
         </div>
       </div>
      {/* </div> */}
      </React.Fragment>
    );
  }
}

// App.protoTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

export default App;
