import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LandmarkList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Landmark = styled.div`
  max-width: 600px;
  min-width: 450px;
  height: 100px;
  margin-top: 5px;
  border: 1px black solid;
  background: ${props => `url(${props.url}) no-repeat top center`};
  background-size: 100% auto;
  background-color: black;
`;

const Layer = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  text-decoration: none;

  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
  }
`;

const CityName = styled.h1`
  font-family: 'Pacifico', cursive; 
  display: flex;
  justify-content: center;
`;
const LandmarkName = styled.h1`
  font-family: 'Pacifico', cursive; 
  color: white;
`;

class CityView extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      landmarks: []
    });
  }

  componentDidMount() {
    const id = this.props.id;
    axios.get('/landmarks', {
      params: { id }
    }).then(result => { 
      const landmarks = result.data;
      this.setState({ landmarks });
    });
  }
  
  render() {
    console.log(this.state.landmarks);
    return (
      <LandmarkList>
        <CityName>{this.props.name}</CityName>
        {
          this.state.landmarks.map(landmark => (
            <StyledLink key={landmark.name} to="/landmark" >
              <Landmark 
                onClick={() => this.props.handleUpdateLandmark(landmark)}
                url={landmark.url}
              >
                <Layer>
                <LandmarkName>{landmark.name}</LandmarkName>
                {
                  landmark.bookmarked ? <i className="fas fa-bookmark"></i> : null
                }
                </Layer>
            </Landmark>
            </StyledLink>
          ))
        }
      </LandmarkList>
    );
  }
}

export default CityView;
