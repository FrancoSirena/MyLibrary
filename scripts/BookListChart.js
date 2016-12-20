import React from 'react';
import {FormGroup, ButtonToolbar, ControlLabel,Button, Col, ListGroup, ListGroupItem, FormControl,Glyphicon, Modal } from 'react-bootstrap';
import OpenLibraryService from './OpenLibraryService';
import Channel from "./Channel";
import LibraryStorage from "./LibraryStorage";
import BookItem from "./BookItem";

export default class BookListChart extends React.Component{
  state = {
    show: false,
    myBooks: [],
    _isMounted: false,
    month: ''
  }
  componentDidMount = () => {
    this.setState({_isMounted:true});
    Channel.on('myBooklist.showBookListByMonth', this.showBookListByMonth);
  }
  componenteWillUnmount = () => {
    this.setState({_isMounted:false});
    Channel.removeListener('myBooklist.showBookListByMonth', this.showBookListByMonth);
  }
  showBookListByMonth = (month) => {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.setState({month: months[month]});
    var myBooks =  this.state.myBooks;
    myBooks = LibraryStorage.DB.getBooksByMonth(month);
    this.setState({myBooks});
    if (this.state._isMounted){
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
          aria-labelledby="contained-modal-title-sm">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Books Read {this.state.index}</Modal.Title>
          </Modal.Header>
          <Modal.Body >
          <ListGroup>
          {
            this.state.myBooks.map((item, index) => {return(
                  <ListGroupItem
                      key={index}>
                      <BookItem book={item} key={item.key} id={item.key} index={index} canRemove={false} canAddToQueue={false} canMarkAsRead={false}/>
                  </ListGroupItem>
                );
            })
          }
          </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}
