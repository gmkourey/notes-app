import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/TopNav';
import PersistentDrawer from './Components/LeftDrawer'
import Typography from '@material-ui/core/Typography';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <Navbar/> */}
        <PersistentDrawer/>
        <main>
          <Typography>{'Test.'}</Typography>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
