import React from 'react';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';
import FindInPage from 'material-ui/svg-icons/action/find-in-page';
import IconButton from 'material-ui/IconButton';

var OpenLibraryService = {
	API: {
		url: 'http://openlibrary.org/search.json',
		imgUrl: "http://covers.openlibrary.org/b/id/", 
		get: (url)=> {
			return fetch(`${OpenLibraryService.API.url}${url}`)
				.then(response => response.json())
		},
		OpenLibrary: {
			searchBook: (bookTitle, bookAuthor) => {
				var filter = bookTitle != '' ? `title=${bookTitle}` : '';
				filter = filter != '' && bookAuthor!='' ? filter+`&author=${bookAuthor}`: '';
				return OpenLibraryService.API.get(`?${filter}`)
					.then((response)=>{
						return response.docs;
					});
			}
		}
	}
}



export default class SearchApi extends React.Component {
	state = {
		myBooks: [],
		titleFilter: "",
		authorFilter: "",
		isLoading: false
	}
	setFilter = () => {
		var titleFilter = this.refs.titleFilter.input.value;
		var authorFilter = this.refs.authorFilter.input.value;
		this.setState({titleFilter});
		this.setState({authorFilter});
		var myBooks = [];
		var isLoading = false;

		if (titleFilter != '' || authorFilter != ''){
			myBooks = OpenLibraryService.API.OpenLibrary.searchBook(titleFilter, authorFilter).then((myBooks) =>{
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
				<TextField type="text" id="title-filter" ref="titleFilter" placeholder="Search By Title" maxLength="100" />
				<TextField  type="text" id="author-filter" ref="authorFilter" placeholder="Search By Author" maxLength="100" />
			    <IconButton onClick={this.setFilter.bind(this)} tooltip="Search Book">
			      <FindInPage />
			    </IconButton>
					{ state.myBooks.length ?
						<List>{
							state.myBooks.map((bookEntry, index)=>{return(
									<ListItem
												 leftAvatar={<Avatar src={OpenLibraryService.API.imgUrl + bookEntry.cover_i +'-S.jpg'} />}
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