import React from 'react';
import TextField from 'material-ui/TextField';
import {Button, Col, ListGroup, ListGroupItem, FormControl,Glyphicon } from 'react-bootstrap';
import OpenLibraryService from './OpenLibraryService';
import Channel from "./Channel";


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
	addToPlaylist = (bookEntry) => {
		Channel.emit('myPlaylist.addBook', bookEntry );
	}
	render(){
		var state= this.state;
		var authorStyle = {width: '70%'};
		return(
			<div>
			<h4> Search Book </h4>
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
				{ state.myBooks.length > 0 ?
					<ListGroup>{
						state.myBooks.map((bookEntry, index)=>{return(
								<ListGroupItem
					         	header={bookEntry.title +'-'+ (bookEntry.subtitle?bookEntry.subtitle:' ')}
							  		key={index}
										onClick={this.addToPlaylist.bind(this, bookEntry)}>
										{bookEntry.author_name}
								</ListGroupItem>	);
						})}
				</ListGroup> :
				state.isLoading ?<p className="text-muted"> Loading .... </p>: ''
				}
				</div>
		);
	}
}
