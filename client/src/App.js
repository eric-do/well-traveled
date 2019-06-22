import React from 'react';
import AppHeader from './components/AppHeader';
import styled from 'styled-components';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import TravelView from './views/TravelView';
import ProfileView from './views/ProfileView';
import CityView from './views/CityView';

const AppContainer = styled.div``;

const Travel = () => (<TravelView />);
const Profile = () => (<ProfileView />);
const City = () => (<CityView />);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      view: 'travel',
      city: '',
      user: {}
    });
    this.handleUpdateCity = this.handleUpdateCity.bind(this);
  }

  handleUpdateCity(city) {
    this.setState({ city });
  }

  render() {
    return (
      <AppContainer>
        <Router>
          <AppHeader />
          <Route path="/" exact 
            render={(props) => <TravelView {...props} handleUpdateCity={this.handleUpdateCity} />} />
          <Route 
            path="/travel" exact 
            render={(props) => <TravelView {...props} handleUpdateCity={this.handleUpdateCity} />} />
          <Route path="/profile" component={Profile} />    
          <Route 
            path="/city" 
            render={(props) => <CityView {...props} city={this.state.city} />} /> 
        </Router>
      </AppContainer>
    );
  }
}
export default App;