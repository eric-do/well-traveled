import React from 'react';
import styled from 'styled-components';

const LandmarkList = styled.div``;
const Landmark = styled.div``;
const CityName = styled.h1`
  font-family: 'Pacifico', cursive; 
`;
const LandmarkName = styled.h1`
  font-family: 'Pacifico', cursive; 
`;

class CityView extends React.Component {
  constructo(props) {
    super(props);
    this.state = ({
      city: 'San Francisco',
      landmarks: [
        {
          name: 'Golden Gate',
          bookmarked: true
        },
        {
          name: 'Haight Street',
          bookmarked: false
        },
        {
          name: 'Delores Park',
          bookmarked: true
        }
      ]
    });
  }

  render() {
    return (
      <LandmarkList>
        <CityName>{this.state.city}</CityName>
        {
          this.state.landmarks.map(city => (
            <Landmark>
              <LandmarkName>{city.name}</LandmarkName>
              {
                city.bookmarked ? <i class="fas fa-bookmark"></i> : null
              }
            </Landmark>
          ))
        }
      </LandmarkList>
    );
  }
}

export default CityView;