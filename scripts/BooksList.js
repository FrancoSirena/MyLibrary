import React from 'react';
import {Button, Col, ListGroup, ListGroupItem, FormControl,Glyphicon } from 'react-bootstrap';
import Channel from "./Channel";
import LibraryStorage from "./LibraryStorage";
import {DateField} from 'react-date-picker';
import BookItem from './BookItem';

const dateNow = new Date();


export default class BooksList extends React.Component {
  state = {
    myBooks: []
  }
  componentDidMount = () => {
    Channel.on('myBooklist.addBook', this.addBook);
    var myBooks = this.state.myBooks;
    myBooks = LibraryStorage.DB.getAllBooks();
    this.setState({myBooks});
  }
  componentWillUnmount = () => {
    Channel.removeListener('myBooklist.addBook', this.addBook);
  }
  addBook = (bookEntry) => {
    var myBooks = this.state.myBooks;
    if (!myBooks.some(e => e.key == bookEntry.key)){
      myBooks.push(bookEntry);
    }
    this.setState({myBooks});
    LibraryStorage.DB.saveBook(bookEntry);
  }
  handleDateChange = (index, value) => {
    var myBooks = this.state.myBooks;
    myBooks[index].dateRead = value;
    this.setState({myBooks});
  }
  removeBook = (item, index) => {
    var myBooks = this.state.myBooks;
    myBooks.splice(index, 1);

    this.setState({myBooks});
    LibraryStorage.DB.removeBook(item);
  }
  showBookDetail = (book) =>  {
    Channel.emit('myBooklist.showBookDetail', book );
  }
  render() {
    var styleDate = {width:'120px'};
    var divStyle = {width: '100%'};

    return(
      <Col md={12} xs={12}>
        { this.state.myBooks.length ?
          <ListGroup ref="booksShelf">
          {
            this.state.myBooks.map((item, index) => {return(
                  <ListGroupItem
                      key={index}>
                      <BookItem book={item} canAddToQueue={false} />
                  </ListGroupItem>
                );
            })
          }
          </ListGroup>:
          '' }
      </Col>);
  }
}
