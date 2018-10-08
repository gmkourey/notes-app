import React from 'react';
import Navbar from '../TopNav/TopNav';
import LeftDrawer from '../LeftDrawer/LeftDrawer'
// import RightDrawer from './RightDrawer/RightDrawer';
import Typography from '@material-ui/core/Typography';

class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // authUser: null,
      leftOpen: false,
      rightOpen: false
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
    return(
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
          {/* <main>
            <Typography>{'Test from MainPage.js.'}</Typography>
          </main> */}
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

export default MainPage;