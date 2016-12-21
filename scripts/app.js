import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory,Link, IndexRoute, IndexRedirect,withRouter} from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Charts from './Charts';
import Index from './Index';
import {Navbar, Nav, NavItem, Button, Col, ListGroup, ListGroupItem, FormControl,Glyphicon } from 'react-bootstrap';

class App extends React.Component {
	render () {
		return (
			<Col xs={12} md={12}>
				<Navbar inverse collapseOnSelect>
					<Navbar.Header>
			      <Navbar.Brand>
			        <a href="#">Franco Sirena</a>
			      </Navbar.Brand>
			    </Navbar.Header>
					<Nav pullLeft>
						<LinkContainer to="/index">
							<NavItem eventKey={1}>Bookshelf</NavItem>
						</LinkContainer>
						<LinkContainer to="/charts">
							<NavItem eventKey={2}>Progress</NavItem>
						</LinkContainer>
					</Nav>
				</Navbar>
				<Col xs={12} md={12} className="text-center">
					<h1>My BookList ! </h1>
					<p className="lead"> Keep on track of your readings ! </p>
				</Col>
				{this.props.children}
		</Col>);
	}
}

render(
	<Col xs={12} md={12}>
    <Router>
      <Route path="/" component={withRouter(App)}>
        <IndexRoute component={Index} />
        <IndexRedirect to="index" />
        <Route path="index" component={Index} />
        <Route path="charts" component={Charts} />
      </Route>
    </Router>
	</Col>,
	document.getElementById('container')
);
