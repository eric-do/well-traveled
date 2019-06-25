import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactModal from 'react-modal';
import AchievementModal from 'react-modal';

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'Pacifico', cursive; 
  display: flex;
  justify-content: center;
`;

const AchievementTitle = styled.h2`
  color: #39CCCC;
  font-family: 'Pacifico', cursive;
  display: flex;
  justify-content: center; 
`;

const AchievementSubtitle = styled.h3`
  font-family: 'Open Sans', sans-serif;
  display: flex;
  justify-content: center;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.div`
  max-width: 450px;
  min-width: 400px;
  height: 100px;
  margin: 10px 0 10px 0;
  border: 1px black solid;
  display: flex;
  justify-content: center;
  padding: 0 10px 0 10px;
  align-items: center;
`;

const BoxLabel = styled.h1`
  font-family: 'Open Sans', sans-serif; 
  font-size: 20px;
  color: black;
`;

const Status = styled.div`
  font-family: 'Open Sans', sans-serif; 
  font-size: 26px;
  font-family: 'Pacifico', cursive; 
  display: flex;
  justify-content: center;
  margin-top: 50px;
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
    const correct = answer.correct;
    console.log(question);
    if (correct) {
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
        <BoxContainer>
          {
            this.state.questions.map(question => (
                <Box key={question.id} onClick={() => this.handleOpenModal(question)} >
                  <BoxLabel>{question.text}</BoxLabel>
                </Box>
            ))
          }
        </BoxContainer>
        <ReactModal
            isOpen={this.state.showModal}
            style={modalStyle}
            shouldCloseOnEsc={true}
            onRequestClose={this.handleCloseModal}
          >
            <Title>{ this.state.currentQuestion.text }</Title>
            <BoxContainer>
              {
                this.state.questionAnswers.map(answer =>(
                  <Box key={answer.id} onClick={() => this.handleQuestionAttempt(answer, this.state.currentQuestion)}>
                    <BoxLabel>{answer.text}</BoxLabel>
                  </Box>
                ))
              }
            </BoxContainer>
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
          <AchievementTitle>{this.state.achievement ? this.state.achievement.name : null}</AchievementTitle>
          <AchievementSubtitle>{this.state.achievement ? this.state.achievement.description : null}</AchievementSubtitle>
        </AchievementModal>
      </QuestionList>
    );
  }
}

export default LandmarkView;