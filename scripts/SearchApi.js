import React from 'react';
import TextField from 'material-ui/TextField';
import {Button, Col, ListGroup, ListGroupItem, FormControl,Glyphicon } from 'react-bootstrap';
import OpenLibraryService from './OpenLibraryService';
import Channel from "./Channel";
import {DateField} from 'react-date-picker';

export default class SearchApi extends React.Component {
  state = {
    myBooks: [],
    isLoading: false
  }
  setFilter = () => {
    var titleFilter = this.titleFilter.value;
    var authorFilter = this.authorFilter.value;
    var keywordsFilter = this.keywordsFilter.value;
    var myBooks = [];
    var isLoading = false;

    if (titleFilter != '' || authorFilter != ''){
      myBooks = OpenLibraryService.API.OpenLibrary.searchBook(titleFilter, authorFilter, keywordsFilter).then((myBooks) =>{
        this.setState({myBooks});
      });
      isLoading = true;
    }
    this.setState({isLoading});

  }
  clearList = () => {
    var myBooks = [];
    this.setState({myBooks});
  }
  addToQueue = (bookEntry) => {
    var book = bookEntry;
    book.isRead = false;
    Channel.emit('myPlaylist.addBook', book );
  }
  addToRead = (bookEntry) => {
    var book = bookEntry;
    book.isRead = true;
    Channel.emit('myPlaylist.addBook', book );
  }
  render(){
    var state= this.state;
    var authorStyle = {width: '70%'};
    var styleDate = {width:'120px'};
    var divStyle = {width: '100%'};
    var titleStyle = {width: '70%'};

    return(
      <div>
        <h4> Search Book </h4>
        <div className="clearfix" style={divStyle}>
          <Col md={12}>
            <FormControl type="text" inputRef={ref => { this.keywordsFilter = ref; }} placeholder="Search By KeyWords" maxLength="100" />
          </Col>
          <Col md={12}>
            <FormControl type="text" inputRef={ref => { this.titleFilter = ref; }} placeholder="Search By Title" maxLength="100" />
          </Col>
          <Col xs={8} md={8}>
            <FormControl type="text" inputRef={ref => { this.authorFilter = ref; }}  placeholder="Search By Author" maxLength="100" />
          </Col>
          <Col xs={4} md={4}>
            <Button bsSize="xsmall" onClick={this.setFilter.bind(this)}>
              <Glyphicon glyph="glyphiocon glyphicon-search" />
            </Button>
            <Button bsSize="xsmall" onClick={this.clearList.bind(this)}>
              <Glyphicon glyph="glyphiocon glyphicon-repeat" />
            </Button>
          </Col>
        </div>
        { state.myBooks.length > 0 ?
          <ListGroup>{
            state.myBooks.filter(e => e.has_fulltext).map((item, index)=>{return(
              <ListGroupItem
                  key={index}>
                  <div className="clearfix" style={divStyle}>
                    <h5 className="pull-left" style={titleStyle}> {item.title +'-'+ (item.subtitle?item.subtitle:' ')} </h5>
                    <Button bsSize="xsmall" className="pull-right" onClick={this.addToRead.bind(this, item)} >
                      <Glyphicon  glyph="book" /> Mark as Read
                    </Button>
                    <Button bsSize="xsmall" className="pull-right" onClick={this.addToQueue.bind(this, item)} >
                      <Glyphicon  glyph="list" /> Add to Queue
                    </Button>
                  </div>
              </ListGroupItem> );
            })}
        </ListGroup> :
        state.isLoading ?<p className="text-muted"> Loading .... </p>: ''
        }
      </div>
    );
  }
}