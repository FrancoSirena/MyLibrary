import React from 'react';
import {FormGroup, ButtonToolbar, ControlLabel,Button, Col, ListGroup, ListGroupItem, FormControl,Glyphicon } from 'react-bootstrap';
import OpenLibraryService from './OpenLibraryService';
import Channel from "./Channel";
import DatePicker from 'react-bootstrap-date-picker';
import LibraryStorage from "./LibraryStorage";

export default class BookItem extends React.Component {
  state = {
    book: ''
  }
  componentDidMount = () => {
    var book = this.state.book;
    book = this.props.book;
    this.setState({book});
  }
  addToQueue = () => {
    var book = this.state.book;
    book.isRead = false;
    this.setState({book});
    Channel.emit('myBooklist.addBook', book);
  }
  addToRead = () => {
    var book = this.state.book;
    book.isRead = true;
    this.setState({book});
    Channel.emit('myBooklist.addBook', book );
  }
  showBookDetail = () =>  {
    Channel.emit('myBooklist.showBookDetail' , this.state.book);
  }
  removeBook = () => {
    LibraryStorage.DB.removeBook(this.state.book);
    Channel.emit('myBooklist.removeBook', this.state.book);
  }
  saveDateRead = () => {
    var book = this.state.book;
    book.dateRead = this.dateInput.state.selectedDate.toISOString();
    this.setState({book});
    LibraryStorage.DB.saveBook(book);
  }
  render(){
    var authorStyle = {width: '70%'};
    var styleDate = {width:'120px',float:'left'};
    var divStyle = {width: '100%'};
    var item = this.props.book;
    return(
        <div className="clearfix" style={divStyle}>
          <Col md={6} className="pull-left">
            <h5 className="book-title" onClick={this.showBookDetail.bind(this)}> {item.title} </h5>
            {item.subtitle ? <h6> {item.subtitle} </h6> : '' }
            <h6> {item.author_name?item.author_name[0]: '' }</h6>
            <small> {item.publisher ? item.publisher[0]: ''} {item.publish_date ?item.publish_date[0]: ''} </small>
          </Col>
          <Col md={6}  >
            {this.props.canRemove ?
              <Button onClick={this.removeBook.bind(this)} className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </Button>: '' }
            {!item.isRead ?
              <Button  bsSize="xsmall" className="pull-right" onClick={this.addToRead.bind(this)} >
                <Glyphicon  glyph="book" /> Mark as Read
              </Button>: '' }
            { item.isRead && this.props.canMarkAsRead ?
              <FormGroup>
                  <ControlLabel>When:</ControlLabel>
                  <DatePicker showClearButton={false}
                      disabled={item.dateRead != null} id="datepicker" style={styleDate}
                      dateFormat="DD/MM/YYYY"  ref={(input) => { this.dateInput = input; }}
                      value={item.dateRead?item.dateRead:''} />
                  <Button onClick={this.saveDateRead.bind(this)} bsSize="xsmall"><Glyphicon  glyph="check" /></Button>
              </FormGroup>: ''}
            {this.props.canAddToQueue ?
              <Button  bsSize="xsmall" className="pull-right" onClick={this.addToQueue.bind(this)} >
                <Glyphicon  glyph="list" /> Add to Queue
              </Button> : ''
              }
            {this.props.canPlayBook ?
              <ButtonToolbar className="pull-right">
                <Button  bsSize="xsmall" className={item.played?'btn-success':''}  onClick={this.addToQueue.bind(this)} >
                  <Glyphicon  glyph="play" />
                </Button>
                <Button  bsSize="xsmall" className={item.paused?'btn-danger':''}   onClick={this.addToQueue.bind(this)} >
                  <Glyphicon  glyph="pause" />
                </Button>
                <Button  bsSize="xsmall" disabled={!item.played} onClick={this.addToQueue.bind(this)} >
                  <Glyphicon  glyph="book" />
                </Button>
              </ButtonToolbar> : '' }

          </Col>
        </div>
    );
  }
}
