import React from 'react';
import {render} from 'react-dom';
import SearchApi from './SearchApi';
import BooksList from './BooksList';
import {Navbar, Nav, NavItem, Button, Col, ListGroup, ListGroupItem, FormControl,Glyphicon } from 'react-bootstrap';

render(
	<Col xs={12} md={12}>
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">React-Bootstrap</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">GitHub</NavItem>
        <NavItem eventKey={2} href="#">About Me</NavItem>
      </Nav>
    </Navbar>
    <Col xs={12} md={12} className="text-center">
      <h1>My BookList ! </h1>
      <p className="lead"> Keep on track of your readings ! </p>
    </Col>
		<Col xs={4} md={4}>
			<h4> Books Read </h4>
      <BooksList readBooks={true} />
    </Col>
		<Col xs={4} md={4}>
			<h4> Books Pending </h4>
      <BooksList readBooks={false} />
    </Col>
		<Col xs={4} md={4}>
			<SearchApi />
		</Col>
	</Col>,
	document.getElementById('container')
)
