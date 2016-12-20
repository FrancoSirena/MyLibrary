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
    Channel.on('myBooklist.removeBook', this.removeBook);
    var myBooks = this.state.myBooks;
    myBooks = LibraryStorage.DB.getAllBooks();

    myBooks = myBooks.sort(function (a, b) {
                              if (a.isReading || !a.dateRead || Date.parse(a.dateRead) > Date.parse(b.dateRead)) {
                                return -1;
                              }
                              if (b.isReading || !b.dateRead ||Date.parse(a.dateRead) < Date.parse(b.dateRead)) {
                                return 1;
                              }
                            return 0;
                          });
    this.setState({myBooks});
  }
  componentWillUnmount = () => {
    Channel.removeListener('myBooklist.addBook', this.addBook);
    Channel.removeListener('myBooklist.removeBook', this.removeBook);
  }
  addBook = (bookEntry) => {
    var myBooks = this.state.myBooks;
    if (!myBooks.some(e => e.key == bookEntry.key)){
      myBooks.unshift(bookEntry);
    }
    this.setState({myBooks});
    LibraryStorage.DB.saveBook(bookEntry);
  }
  removeBook = (item) => {
    var myBooks = this.state.myBooks;
    var index = myBooks.findIndex(c=>c.key == item.key);
    if (index > -1){
      myBooks.splice(index, 1);

      this.setState({myBooks});
    }
  }
  showBookDetail = (book) =>  {
    Channel.emit('myBooklist.showBookDetail', book );
  }
  render() {
  
    return(
      <Col md={12} xs={12} >
        { this.state.myBooks.length ?
          <ListGroup ref="booksShelf">
          {
            this.state.myBooks.map((item, index) => {return(
                  <ListGroupItem
                      key={index}>
                      <BookItem book={item} key={item.key} id={item.key} index={index} canPlayReading={true} canRemove={true} canAddToQueue={false}/>
                  </ListGroupItem>
                );
            })
          }
          </ListGroup>:
          '' }
      </Col>);
  }
}
