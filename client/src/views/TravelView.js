import React from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Card = styled.div`
  cursor: pointer;
  max-width: 600px;
  min-width: 450px;
  height: 100px;
  margin-top: 5px;
  border: 1px black solid;
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: 'Pacifico', cursive; 
`;

const StyledLink = styled(Link)`
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
  constructor(props) {
    super(props);
    this.state = ({
      showModal: false,
      cities: []
    });
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  componentDidMount() {
    axios.get('/locations')
      .then(result => {
        const cities = result.data;
        this.setState({ cities });
      });
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

  handleSelectCity(id) {
    this.handleCloseModal();
    this.props.handleUpdateCity(id);
  }

  render() {
    return (
      <CardContainer>
        <Card>
          <Title onClick={this.handleOpenModal}>Select location</Title>
          <ReactModal
            isOpen={this.state.showModal}
            style={modalStyle}
            shouldCloseOnEsc={true}
            onRequestClose={this.handleCloseModal}
          >
            {
              this.state.cities.map(city => (
                <Card key={city.id}>
                  <StyledLink
                    onClick={() => this.handleSelectCity(city)}
                    to="/city"
                  >{city.name}</StyledLink>
                </Card>
              ))
            }
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