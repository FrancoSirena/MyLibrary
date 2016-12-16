import React from 'react';
import TextField from 'material-ui/TextField';
import {Button, Col, ListGroup, ListGroupItem, FormControl,Glyphicon } from 'react-bootstrap';
import OpenLibraryService from './OpenLibraryService';
import Channel from "./Channel";
import {DateField} from 'react-date-picker';

export default class BookItem extends React.Component {
  addToQueue = (bookEntry) => {
    var book = bookEntry;
    book.isRead = false;
    Channel.emit('myBooklist.addBook', book );
  }
  addToRead = (bookEntry) => {
    var book = bookEntry;
    book.isRead = true;
    Channel.emit('myBooklist.addBook', book );
  }
  showBookDetail = (book) =>  {
    Channel.emit('myBooklist.showBookDetail', book);
  }
  render(){
    var authorStyle = {width: '70%'};
    var styleDate = {width:'120px'};
    var divStyle = {width: '100%'};
    var item = this.props.book;
    return(
        <div className="clearfix" style={divStyle}>
          <Col md={6} className="pull-left">
            <h5 className="book-title" onClick={this.showBookDetail.bind(this,item)}> {item.title} </h5>
            {item.subtitle ? <h6> {item.subtitle} </h6> : '' }
            <h6> {item.author_name?item.author_name[0]: '' }</h6>
            <h7> {item.publisher ? item.publisher[0]: ''} {item.publish_date ?item.publish_date[0]: ''} </h7>
          </Col>
          <Col md={6}  >
            <Button  bsSize="xsmall" className="pull-right" onClick={this.addToRead.bind(this, item)} >
              <Glyphicon  glyph="book" /> Mark as Read
            </Button>
            <Button show={this.props.canAddToQueue} bsSize="xsmall" className="pull-right" onClick={this.addToQueue.bind(this, item)} >
              <Glyphicon  glyph="list" /> Add to Queue
            </Button>
          </Col>
        </div>
    );
  }
}
