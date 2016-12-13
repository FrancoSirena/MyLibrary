import React from 'react';
import {Button, Col, ListGroup, ListGroupItem, FormControl,Glyphicon } from 'react-bootstrap';
import Channel from "./Channel";
import LibraryStorage from "./LibraryStorage";

export default class MyPlaylist extends React.Component {
  state = {
    myBooks: [],
    readBooks: []
  }
  componentDidMount = () => {
    Channel.on('myPlaylist.addBook', this.addBook);
  }
  componentWillUnmount = () => {
    Channel.removeListener('myPlaylist.addBook', this.addBook);
  }
  findBook = (bookEntry) => {
    return this.state.readBooks.some(e => e.key == bookEntry.key);
  }
  addBook = (bookEntry) => {
    var myBooks = this.state.myBooks;
    if (!myBooks.some(e => e.key == bookEntry.key)){
      myBooks.push(bookEntry);
    }
    this.setState({myBooks});

  }
  makAsRead = (book) => {
    var readBooks = this.state.readBooks;
    if (!this.findBook(book))
      readBooks.push(book);
    this.setState({readBooks});
  }
  render() {
    return(
      <Col md={12} xs={12}>
        <h4> My BookList </h4>
        <ListGroup>
        {
          this.state.myBooks.map((item, index) => {return(
              <ListGroupItem
                  header={item.title +'-'+ (item.subtitle?item.subtitle:' ')}
                  key={index}
                  onClick={this.makAsRead.bind(this, item)}>
                  {item.author_name}
                  {this.findBook(item)? <Glyphicon className="right" glyph="glyphicon glyphicon-eye-open" />: <Glyphicon className="right" glyph="glyphicon glyphicon-book" />}
              </ListGroupItem>
              );
          })
        }
        </ListGroup>
      </Col>);
  }
}
