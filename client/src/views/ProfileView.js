import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AchievementList = styled.div``;

const AchievementCard = styled.div``;

const AchievementTitle = styled.h1`
  margin-top: 50px; 
  font-family: 'Pacifico', cursive; 
  display: flex;
  justify-content: center;
`;

const AchievementSubtitle = styled.h2`
  font-family: 'Open Sans', sans-serif;
  display: flex;
  justify-content: center;
`;

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      achievements: []
    });
  }

  componentDidMount() {
    axios.get('/achievements', { params: { id: 1 } })
      .then(results => {
        const achievements = results.data;
        console.log(achievements);
        this.setState({ achievements })
      });
  }

  render() {
    return (
      <AchievementList>
        {
          this.state.achievements.map(achievement => (
            <AchievementCard key={achievement.name}>
              <AchievementTitle>{achievement.name}</AchievementTitle>
              <AchievementSubtitle>{achievement.description}</AchievementSubtitle>
              {
                achievement.complete ? <i style={{color:"green"}} className="fas fa-check"></i> : null
              }
            </AchievementCard>
          ))
        }
      </AchievementList>
    );
  }
}

export default ProfileView;