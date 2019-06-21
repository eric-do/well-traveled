import React from 'react';
import styled from 'styled-components';

const AchievementList = styled.div``;

const AchievementCard = styled.div``;

const AchievementTitle = styled.h1`
  font-family: 'Pacifico', cursive; 
`;

const AchievementSubtitle = styled.h2`
  font-family: 'Open Sans', sans-serif;
`;

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      achievements: [
        {
          title: 'Traveled to San Francisco',
          subtitle: 'Check-in using your location', 
          complete: false,
        },
        {
          title: 'Explored Golden Gate',
          subtitle: 'Answer 1 question about the Golden Gate Bridge',
          complete: true,
        },
        {
          title: 'SF Aficianado',
          subtitle: 'Answered 10 questions about San Franisco',
          complete: true,
        },
      ]
    });
  }

  render() {
    return (
      <AchievementList>
        {
          this.state.achievements.map(achievement => (
            <AchievementCard key={achievement.title}>
              <AchievementTitle>{achievement.title}</AchievementTitle>
              <AchievementSubtitle>{achievement.subtitle}</AchievementSubtitle>
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