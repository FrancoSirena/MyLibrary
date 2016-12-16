import React from 'react';
import {ButtonToolbar, Col, Modal, Button} from 'react-bootstrap';
import OpenLibraryService from './OpenLibraryService';
import Channel from "./Channel";

export default class Example extends React.Component{
  state = {
    show: false,
    bookInfo: ''
  }
  componentDidMount = () => {
    Channel.on('myBooklist.showBookDetail', this.showBookDetail);
  }
  componenteWillUnmount = () => {
    Channel.removeListener('myBooklist.showBookDetail', this.showBookDetail);
  }
  showBookDetail = (book) => {
    var bookInfo = OpenLibraryService.API.OpenLibrary.getBookInformation(book);
    this.setState({bookInfo});
    this.showModal();
  }
  showModal = () => {
    this.setState({show: true});
  }
  hideModal = () => {
    this.setState({show: false});
  }
  render() {
    return (
        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">{this.state.bookInfo.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col md={4} xs={4} >
              <img src={OpenLibraryService.API.imgUrl+this.state.bookInfo.cover_id} />
            </Col> 
            <Col md={8} xs={8} >
              {this.state.bookInfo.subtitle ? <h4> {this.state.bookInfo.subtitle} </h4> : '' } 
              <h5> {this.state.bookInfo.authors?this.state.bookInfo.authors[0].name: '' }</h5>
              <h6> {this.state.bookInfo.edition + ' - ' + this.state.bookInfo.publish_date} </h6>
              <blockquote> <p> {this.state.bookInfo.description} </p> </blockquote>
              <p className="text-muted">{this.state.bookInfo.subjects ?this.state.bookInfo.subjects.map((item, index) => {
                return item;
              }) : '' }</p>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}
