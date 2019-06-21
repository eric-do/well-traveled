import React from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';

const CardContainer = styled.div``;

const Card = styled.div`
  cursor: pointer;
`;

const Title = styled.h1`
  font-family: 'Pacifico', cursive; 
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

class TravelView extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = ({
      showModal: false
    });

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  handleOpenModal() {
    this.setState({
      showModal: true
    });
  }

  handleCloseModal() {
    this.setState({
      showModal: false
    });
  }

  render() {
    return (
      <CardContainer>
        <Card>
          <Title onClick={this.handleOpenModal}>Select location</Title>
          <ReactModal
            isOpen={this.state.showModal}
            style={modalStyle}
          >
            <button onClick={this.handleCloseModal}>Close Modal</button>
          </ReactModal>
        </Card>
        <Card>
          <Title>Current location</Title>
        </Card>
        <Card>
          <Title>Add question</Title>
        </Card>
      </CardContainer>
    );
  }
}

export default TravelView;