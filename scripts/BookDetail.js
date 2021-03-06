import React from 'react';
import {ButtonToolbar, Col, Modal, Button} from 'react-bootstrap';
import OpenLibraryService from './OpenLibraryService';
import Channel from "./Channel";

export default class BookDetail extends React.Component{
  state = {
    show: false,
    bookInfo: '',
    _isMounted: false
  }
  componentDidMount = () => {
    this.setState({_isMounted:true});
    Channel.on('myBooklist.showBookDetail', this.showBookDetail);
  }
  componenteWillUnmount = () => {
    this.setState({_isMounted:false});
    Channel.removeListener('myBooklist.showBookDetail', this.showBookDetail);
  }
  showBookDetail = (book) => {
    var bookInfo =  this.state.bookInfo;
    bookInfo = book;
    if (this.state._isMounted){
      this.setState({bookInfo});
      this.showModal();
    }
  }
  showModal = () => {
    if (this.state._isMounted)
      this.setState({show: true});
  }
  hideModal = () => {
    if (this.state._isMounted)
      this.setState({show: false});
  }
  render() {
    return (
        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          key={this.state.bookInfo.key}
          id={this.state.bookInfo.key}
          aria-labelledby="contained-modal-title-sm">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">{this.state.bookInfo.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <div className="clearfix">
              <Col md={4} xs={4}>
                <img src={OpenLibraryService.API.getImgUrl(this.state.bookInfo.__key)} width="140px" height="170px" />
              </Col>
              <Col md={8} xs={8} >
                {this.state.bookInfo.subtitle ? <h4> {this.state.bookInfo.subtitle} </h4> : '' }
                <h5> {this.state.bookInfo.author_name?this.state.bookInfo.author_name[0]: '' }</h5>
                <h6> {this.state.bookInfo.publisher ? this.state.bookInfo.publisher[0]: ''} {this.state.bookInfo.publish_date ? this.state.bookInfo.publish_date[0]: ''} </h6>
                <blockquote> <p> {this.state.bookInfo.description} </p> </blockquote>
                <p className="text-muted">{this.state.bookInfo.subjects ?this.state.bookInfo.subjects.map((item, index) => {
                  return item;
                }) : '' }</p>
              </Col>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}
