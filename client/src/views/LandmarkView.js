import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LandmarkName = styled.h1`
  font-family: 'Pacifico', cursive; 
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
`;

const QuestionBox = styled.div`
  max-width: 600px;
  min-width: 400px;
  height: 100px;
  margin-top: 5px;
  border: 1px black solid;
  display: flex;
  justify-content: center;
`;

const QuestionName = styled.h1`
  font-family: 'Open Sans', sans-serif; 
  font-size: 20px;
`;

class LandmarkView extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      questions: []
    });
  }

  componentDidMount() {
    axios.get('/questions', { params: { id: this.props.landmark.id }})
      .then(result => {
        const questions = result.data;
        this.setState({ questions });
      });
  }

  render() {
    console.log(this.props.landmark);
    return (
      <QuestionList>
        <LandmarkName>{this.props.landmark.name}</LandmarkName>
        {
          this.state.questions.map(question => (
            <StyledLink key={question.id} to="/question" >
              <QuestionBox onClick={() => this.props.handleUpdateQuestion(question)} >
                <QuestionName>{question.text}</QuestionName>
              </QuestionBox>
            </StyledLink>
          ))
        }
      </QuestionList>
    );
  }
}

export default LandmarkView;