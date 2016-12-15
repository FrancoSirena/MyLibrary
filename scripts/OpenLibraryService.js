var OpenLibraryService = {
	API: {
		url: 'https://openlibrary.org/search.json',
		bookUrl: "http://openlibrary.org/api/books?bibkeys=",
		get: (url)=> {
			return fetch(url)
				.then(response => response.json())
		},
		OpenLibrary: {
			searchBook: (bookTitle, bookAuthor, keywordsFilter) => {
				var filter = bookTitle != '' ? `title=${bookTitle}` : '';
				filter = filter != '' && bookAuthor!='' ? filter+`&author=${bookAuthor}`: filter;
				filter = filter != '' && keywordsFilter!='' ? filter+`&q=${keywordsFilter}`: filter;
				return OpenLibraryService.API.get(`${OpenLibraryService.APi.url}?${filter}&has_fulltext=true`)
					.then((response)=>{
						return response.docs;
					});
			},
			getBookInformation: (book) => {
				;
				filter = filter != '' && bookAuthor!='' ? filter+`&author=${bookAuthor}`: filter;
				filter = filter != '' && keywordsFilter!='' ? filter+`&q=${keywordsFilter}`: filter;
				return OpenLibraryService.API.get(`${OpenLibraryService.API.bookUrl}ISBN:${book.isbn[0]}&jscmd=details&format=json`)
					.then((response)=>{
						return response;
					});
			}
		}
	}
}

export default OpenLibraryService;
