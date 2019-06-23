import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactModal from 'react-modal';
import AchievementModal from 'react-modal';

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: 'Pacifico', cursive; 
  display: flex;
  justify-content: center;
`;

const Box = styled.div`
  max-width: 450px;
  min-width: 300px;
  height: 100px;
  margin-top: 5px;
  border: 1px black solid;
  display: flex;
  justify-content: center;
  padding: 0 10px 0 10px;
  align-items: center;
`;

const BoxLabel = styled.h1`
  font-family: 'Open Sans', sans-serif; 
  font-size: 20px;
`;

const Status = styled.div`
  font-family: 'Open Sans', sans-serif; 
  font-size: 20px;
  display: flex;
  justify-content: center;
`;

const CorrectStatus = styled(Status)`
  color: green;
`;

const IncorrectStatus = styled(Status)`
  color: red;
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
AchievementModal.setAppElement('#app');

class LandmarkView extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      questions: [],
      currentQuestion: {},
      questionAnswers: [],
      showModal: false,
      showAchievement: false,
      achievement: null,
      correct: null
    });
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.getAnswersForQuestion = this.getAnswersForQuestion.bind(this);
    this.handleQuestionAttempt = this.handleQuestionAttempt.bind(this);
    this.handleCloseAchievement = this.handleCloseAchievement.bind(this);
    this.handleOpenAchievement = this.handleOpenAchievement.bind(this);
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
        console.log(result);
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
    const showModal = false;
    const correct = null;
    this.setState({ showModal, correct });

    if (this.state.achievement) {
      const showAchievement = true;
      this.setState({ showAchievement });
    }
  }

  handleOpenAchievement() {

  }

  handleCloseAchievement() {
    const showAchievement = false;
    const achievement = null;
    this.setState({ showAchievement, achievement });
  }

  handleQuestionAttempt(answer, question) {
    // Update state so answer status is displayed
    // Make a call to the BE to see if a new achievement has been made
    // Update achievement status
    const correct = answer.correct;
    console.log(question);
    if (correct) {
      // Send questionID
      // If server responds with an achivement
      // Update achievement state and correct state both to true
      axios.post('/questions', {
        userId: 1,
        questionId: question.id
      }).then(results => {
        console.log(results);
        if (results.data) {
          const achievement = results.data;
          this.setState({ achievement });
        }
      }).catch(e => {
        console.error('Error getting data', e);
      });
    }

    this.setState({ correct });
  }

  render() {
    return (
      <QuestionList>
        <Title>{this.props.landmark.name}</Title>
        {
          this.state.questions.map(question => (
              <Box onClick={() => this.handleOpenModal(question)} >
                <BoxLabel>{question.text}</BoxLabel>
              </Box>
          ))
        }
        <ReactModal
            isOpen={this.state.showModal}
            style={modalStyle}
            shouldCloseOnEsc={true}
            onRequestClose={this.handleCloseModal}
          >
            <Title>{ this.state.currentQuestion.text }</Title>
            {
              this.state.questionAnswers.map(answer =>(
                <Box onClick={() => this.handleQuestionAttempt(answer, this.state.currentQuestion)}>
                  <BoxLabel>{answer.text}</BoxLabel>
                </Box>
              ))
            }
            {
              this.state.correct === true ? <CorrectStatus>Correct!</CorrectStatus> :
              this.state.correct === false ? <IncorrectStatus>Incorrect!</IncorrectStatus> :
              null
            }
        </ReactModal>
        <AchievementModal
            isOpen={this.state.showAchievement}
            style={modalStyle}
            shouldCloseOnEsc={true}
            onRequestClose={this.handleCloseAchievement}
          >
          <Title>Achivement unlocked!</Title>
          <BoxLabel>{this.state.achievement ? this.state.achievement.name : null}</BoxLabel>
          <BoxLabel>{this.state.achievement ? this.state.achievement.description : null}</BoxLabel>
        </AchievementModal>
      </QuestionList>
    );
  }
}

export default LandmarkView;