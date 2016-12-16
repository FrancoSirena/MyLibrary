var OpenLibraryService = {
	API: {
		url: 'https://openlibrary.org/search.json',
		bookUrl: 'https://openlibrary.org/api/books?bibkeys=',
		imgUrl: 'https://covers.openlibrary.org/b/isbn/',
		get: (url)=> {
			return fetch(url,{mode: 'cors'})
				.then(response => response.json())
		},
		getImgUrl: (book) => {
			return `OpenLibraryService.API.imgUrl${book.isbn[0]}-M.jpg`;
		},
		OpenLibrary: {
			searchBook: (bookTitle, bookAuthor, keywordsFilter) => {
				var filter = bookTitle != '' ? `&title=${bookTitle}` : '';
				filter = filter != '' && bookAuthor!='' ? filter+`&author=${bookAuthor}`: filter;
				filter = filter != '' && keywordsFilter!='' ? filter+`&q=${keywordsFilter}`: filter;
				return OpenLibraryService.API.get(`${OpenLibraryService.API.url}?has_fulltext=true${filter}`)
					.then((response)=>{
						return response.docs;
					});
			},
			getBookInformation: (book) => {
				return OpenLibraryService.API.get(`${OpenLibraryService.API.bookUrl}ISBN:${book.isbn[0]}&jscmd=details&format=json`)
					.then((response)=>{
						return response[Object.keys(response)[0]].details;
					});
			}
		}
	}
}

export default OpenLibraryService;
