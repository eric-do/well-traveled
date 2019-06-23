import React from 'react';
import AppHeader from './components/AppHeader';
import styled from 'styled-components';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import TravelView from './views/TravelView';
import ProfileView from './views/ProfileView';
import CityView from './views/CityView';
import LandmarkView from './views/LandmarkView';
import QuestionView from './views/QuestionView';

const AppContainer = styled.div``;

const Profile = () => (<ProfileView />);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      view: 'travel',
      city: {id: 1, name: "San Francisco"},
      landmark: {},
      question: {},
      user: {}
    });
    this.handleUpdateCity = this.handleUpdateCity.bind(this);
    this.handleUpdateLandmark = this.handleUpdateLandmark.bind(this);
  }

  handleUpdateCity(city) {
    this.setState({ city });
  }

  handleUpdateLandmark(landmark) {
    this.setState({ landmark });
  }

  handleUpdateQuestion(question) {
    this.setState({ question });
  }

  render() {
    return (
      <AppContainer>
        <Router>
          <AppHeader />
          <Route path="/" exact 
            render={(props) => <CityView {...props} 
            id={this.state.city.id} 
            name={this.state.city.name} 
            handleUpdateLandmark={this.handleUpdateLandmark}/>} 
          /> 
          />
          <Route 
            path="/travel" exact 
            render={(props) => <TravelView {...props} 
              handleUpdateCity={this.handleUpdateCity} />} 
          />
          <Route 
            path="/city" 
            render={(props) => <CityView {...props} 
              id={this.state.city.id} 
              name={this.state.city.name} 
              handleUpdateLandmark={this.handleUpdateLandmark}/>} 
          /> 
          <Route 
            path="/landmark" 
            render={(props) => <LandmarkView {...props} 
            landmark={this.state.landmark} />} 
          />   
          <Route 
            path="/question" 
            render={(props) => <QuestionView {...props} 
            question={this.state.question} />} 
          /> 
          <Route path="/profile" component={Profile} />    
        </Router>
      </AppContainer>
    );
  }
}
export default App;