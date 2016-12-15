import React from 'react';
import {ButtonToolbar, Col, Modal, Button} from 'react-bootstrap';
import Channel from "./Channel";
import LibraryStorage from "./LibraryStorage";
import {DateField} from 'react-date-picker';

// IMG
// Title
// Subtitle
// Edition name - Publish date
// Author Name
// Subjects
//


export default class Example extends React.Component{
  state = {
    show: false
  }
  showModal = () => {
    this.setState({show: true});
  }
  hideModal = () => {
    this.setState({show: false});
  }
  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.showModal}>
          Launch demo modal
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col md={4} xs={4} >

            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>
    );
  }
}
