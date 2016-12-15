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
    Channel.on('myPlaylist.addBook', this.addBook);
    var myBooks = this.state.myBooks;
    myBooks = LibraryStorage.DB.getAllBooks();
    this.setState({myBooks});
  }
  componentWillUnmount = () => {
    Channel.removeListener('myPlaylist.addBook', this.addBook);
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
  render() {
    var styleDate = {width:'120px'};
    var divStyle = {width: '100%'};
    var titleStyle = {width: '90%'};

    return(
      <Col md={12} xs={12}>
        { this.state.myBooks.length ?
          <ListGroup ref="booksShelf">
          {
            this.state.myBooks.map((item, index) => {return(
                  <ListGroupItem
                      key={index}>
                      <div className="clearfix" style={divStyle}>
                        <h4 className="pull-left" style={titleStyle}> {item.title +'-'+ (item.subtitle?item.subtitle:' ')} </h4>
                        <Button className="pull-right xsmall" onClick={this.removeBook.bind(this,item, index)}>
                            <Glyphicon glyph="remove" />
                        </Button>
                      </div>
                      {item.isRead ?
                        <DateField
                            defaultValue={this.props.readBooks?item.dateRead:dateNow}
                            dateFormat="DD/MM/YYYY"
                            key={`date${index}`}
                            disabled={this.props.readBooks}
                            style={styleDate} onChange={this.handleDateChange.bind(this, index)}
                          />
                          : '' }
                  </ListGroupItem>
                );
            })
          }
          </ListGroup>:
          '' }
      </Col>);
  }
}
