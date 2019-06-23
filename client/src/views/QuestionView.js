import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactModal from 'react-modal';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0,0,0, 0.8)'
  },
  content: {
    backgroundColor: 'white',
    opacity: '1'
  }
};

class QuestionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  render() {
    return (
      <h1>test</h1>
    );
  }
}

export default QuestionView;