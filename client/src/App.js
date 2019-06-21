import React from 'react';
import AppHeader from './components/AppHeader';
import styled from 'styled-components';
import TravelView from './components/TravelView';
import ProfileView from './components/ProfileView';
import { BrowserRouter as Router, Route} from 'react-router-dom';

const AppContainer = styled.div``;

const Travel = () => (<TravelView />);
const Profile = () => (<ProfileView />);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      view: 'travel',
      user: {}
    });
  }

  render() {
    return (
      <AppContainer>
        <Router>
          <AppHeader />
          <Route path="/" exact component={Travel} />
          <Route path="/travel" exact component={Travel} />
          <Route path="/profile/" component={Profile} />    
        </Router>
      </AppContainer>
    );
  }
}
export default App;