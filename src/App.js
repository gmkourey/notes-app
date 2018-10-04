import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/TopNav';
import PersistentDrawer from './Components/LeftDrawer'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <Navbar/> */}
        <PersistentDrawer/>
      </React.Fragment>
    );
  }
}

export default App;
