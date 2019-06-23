import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';

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
  text-decoration: none;

  &:focus, &:hover, &:visited, &:link, &:active {
      text-decoration: none;
  }
`;

const QuestionBox = styled.div`
  max-width: 450px;
  min-width: 400px;
  height: 100px;
  margin-top: 5px;
  border: 1px black solid;
  display: flex;
  justify-content: center;
  padding: 0 10px 0 10px;
`;

const QuestionName = styled.h1`
  font-family: 'Open Sans', sans-serif; 
  font-size: 20px;
`;

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0,0,0, 0.8)'
  },
  content: {
    backgroundColor: 'white',
    opacity: '1'
  }
};

ReactModal.setAppElement('#app');

class LandmarkView extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      questions: [],
      currentQuestion: {},
      questionAnswers: []
    });
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.getAnswersForQuestion = this.getAnswersForQuestion.bind(this);
  }

  componentDidMount() {
    axios.get('/questions', { params: { id: this.props.landmark.id }})
      .then(result => {
        const questions = result.data;
        this.setState({ questions });
      });
  }

  getAnswersForQuestion(currentQuestion) {
    const id = currentQuestion.id;
    return axios.get('/answers', { params: { id } })
      .then(result => {
        const questionAnswers = result.data;
        this.setState({ currentQuestion, 
                        questionAnswers });
      });
  }

  handleOpenModal(currentQuestion) {
    const id = currentQuestion.id;
    axios.get('/answers', { params: { id } })
      .then(result => {
        const questionAnswers = result.data;
        this.setState({ 
                        currentQuestion, 
                        questionAnswers,
                        showModal: true 
                      });
      })
      .catch(e => console.error(`Couldn't get question data`, e));
  }

  handleCloseModal() {
    this.setState({
      showModal: false
    });
  }

  render() {
    return (
      <QuestionList>
        <LandmarkName>{this.props.landmark.name}</LandmarkName>
        {
          this.state.questions.map(question => (
              <QuestionBox onClick={() => this.handleOpenModal(question)} >
                <QuestionName>{question.text}</QuestionName>
              </QuestionBox>
          ))
        }
        <ReactModal
            isOpen={this.state.showModal}
            style={modalStyle}
            shouldCloseOnEsc={true}
            onRequestClose={this.handleCloseModal}
          >
            {
              this.state.question ? this.state.question.text : 'pending'
            }
        </ReactModal>
      </QuestionList>
    );
  }
}

export default LandmarkView;