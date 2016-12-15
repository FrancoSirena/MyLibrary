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
    myBooks = LibraryStorage.DB.getAllPendingBooks();
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
    //LibraryStorage.DB.savePendingBook(bookEntry);
  }
  handleDateChange = (index, value) => {
    var myBooks = this.state.myBooks;
    myBooks[index].dateRead = value;
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
        </ListGroup>
      </Col>);
  }
}
