import React from 'react';
import {Button, Col, ListGroup, ListGroupItem, FormControl,Glyphicon } from 'react-bootstrap';
import Channel from "./Channel";
import LibraryStorage from "./LibraryStorage";
import {DateField} from 'react-date-picker';

const dateNow = new Date();


export default class BooksList extends React.Component {
  state = {
    myBooks: []
  }
  componentDidMount = () => {
    if (!this.props.readBooks){
      Channel.on('myPlaylist.addBook', this.addBook);
      var myBooks = this.state.myBooks;
      myBooks = LibraryStorage.DB.getAllPendingBooks();
      this.setState({myBooks});
    } else {
      Channel.on('myPlaylist.addReading', this.addBook);
      var myBooks = this.state.myBooks;
      myBooks = LibraryStorage.DB.getAllReadBooks();
      this.setState({myBooks});

    }
  }
  componentWillUnmount = () => {
    Channel.removeListener('myPlaylist.addBook', this.addBook);
    Channel.removeListener('myPlaylist.addReading', this.addBook);
  }
  addBook = (bookEntry) => {
    var myBooks = this.state.myBooks;
    if (LibraryStorage.DB.searchReadBook(bookEntry) != null){
      return;
    }
    if (!myBooks.some(e => e.key == bookEntry.key)){
      myBooks.push(bookEntry);
    }
    this.setState({myBooks});
    LibraryStorage.DB.savePendingBook(bookEntry);
  }
  handleDateChange = (index, value) => {
    var myBooks = this.state.myBooks;
    myBooks[index].dateRead = value;
    this.setState({myBooks});
  }
  markAsRead = (bookEntry, index) => {
    Channel.emit('myPlaylist.addReading', bookEntry);
    var myBooks = this.state.myBooks;
    LibraryStorage.DB.saveReadBook(bookEntry);
    myBooks = myBooks.slice(index);
    this.setState({myBooks});
  }
  removeBook = (item) => {
    if (this.props.readBooks) {
      LibraryStorage.DB.removeReadBook(item);
    } else {
      LibraryStorage.DB.removePendingBook(item);
    }
  }
  render() {
    var styleDate = {width:'120px'};
    var divStyle = {width: '100%'};
    var titleStyle = {width: '90%'};

    return(
      <Col md={12} xs={12}>
        <ListGroup>
        {
          this.state.myBooks.map((item, index) => {return(
              <ListGroupItem
                  key={index}>
                  <div className="clearfix" style={divStyle}>
                    <h4 className="pull-left" style={titleStyle}> {item.title +'-'+ (item.subtitle?item.subtitle:' ')} </h4>
                    <a className="pull-right" onClick={this.removeBook.bind(this,item)}> X </a>
                  </div>
                  <div className="clearfix" style={divStyle}>
                  <DateField
                      defaultValue={this.props.readBooks?item.dateRead:dateNow}
                      dateFormat="DD/MM/YYYY"
                      key={`date${index}`}
                      disabled={this.props.readBooks}
                      style={styleDate} onChange={this.handleDateChange.bind(this, index)}
                    />
                    {!this.props.readBooks ?
                      <Button bsSize="small" className="pull-right" onClick={this.markAsRead.bind(this, item, index)} >
                        <Glyphicon  glyph="book" /> Read
                      </Button>: ''}
                  </div>
              </ListGroupItem>
              );
          })
        }
        </ListGroup>
      </Col>);
  }
}
