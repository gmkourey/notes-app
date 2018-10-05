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


class App extends Component {
  constructor() {
    super();
    this.state = {
      leftOpen: false,
      rightOpen: false
    };
    // this.handleLeftDrawer = this.handleLeftDrawer.bind(this);
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
      {/* <div className='root'> */}
      {/* <div className='appFrame'> */}
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
        <main>
          <Typography>{'Test from app.js.'}</Typography>
        </main>
        {/* <RightDrawer
          rightOpen={this.state.rightOpen}
          handleRightDrawer={this.handleRightDrawer}
        /> */}
         {/* </div> */}
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
