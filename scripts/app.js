import React from 'react';
import {render} from 'react-dom';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';

const imgUrl = "http://covers.openlibrary.org/b/id/";

var OpenLibraryService = {
	API: {
		url: 'http://openlibrary.org/search.json',
		get: (url)=> {
			return fetch(`${OpenLibraryService.API.url}${url}`)
				.then(response => response.json())
		},
		OpenLibrary: {
			searchBookByTitle: (bookTitle) => {
				return OpenLibraryService.API.get(`?title=${bookTitle}`)
					.then((response)=>{
						return response.docs;
					});
			}
		}
	}
}
export default class LibraryApi extends React.Component {
	state = {
		myBooks: [],
		bookFilter: "",
		isLoading: false
	}
	setFilter = () => {
		var bookFilter = this.refs.bookFilter.input.value;
		this.setState({bookFilter});
		var myBooks = [];
		var isLoading = false;

		if (bookFilter != ''){
			myBooks = OpenLibraryService.API.OpenLibrary.searchBookByTitle(bookFilter).then((myBooks) =>{
				this.setState({myBooks});
			});
			isLoading = true;
		}
		this.setState({isLoading});

	}
	render(){
		var state= this.state;
		return(
			<div>
				<TextField  onBlur={this.setFilter.bind(this)} type="text" id="book-filter" ref="bookFilter" placeholder="Search" maxLength="100" />
					{ state.myBooks.length ?
						<List>{
							state.myBooks.map((bookEntry, index)=>{return(
									<ListItem
												 leftAvatar={<Avatar src={imgUrl + bookEntry.cover_i +'-S.jpg'} />}
								         primaryText={bookEntry.title +'-'+ (bookEntry.subtitle?bookEntry.subtitle:' ')}
								         secondaryText={bookEntry.author_name}
												  key={index}
								       />);
							})}
					</List> :
					state.isLoading ?<div> <CircularProgress size={60} thickness={7} /> </div>: ''
					}
			</div>
		);
	}
}

render(
	<MuiThemeProvider>
		<LibraryApi />
	</MuiThemeProvider>,
	document.getElementById('container')
)
