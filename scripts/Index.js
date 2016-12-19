import React from 'react';
import {render} from 'react-dom';
import SearchApi from './SearchApi';
import BooksList from './BooksList';
import BookDetail from './BookDetail';
import {Navbar, Nav, NavItem, Button, Col, ListGroup, ListGroupItem, FormControl,Glyphicon } from 'react-bootstrap';

export default class Index extends React.Component {
  render () {
    return(
      <Col md={12}>
        <BookDetail />
        <Col xs={6} md={6}>
            <h4> My Bookshelf </h4>
            <BooksList readBooks={true} />
        </Col>
        <Col xs={6} md={6}>
          <SearchApi />
        </Col>
      </Col>
    );
  }
}
