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
				var filter = bookTitle != '' ? `q=${bookTitle}` : '';
				filter = filter != '' && bookAuthor!='' ? filter+`&author=${bookAuthor}`: filter;
				return OpenLibraryService.API.get(`?${filter}`)
					.then((response)=>{
						return response.docs;
					});
			}
		}
	}
}

export default OpenLibraryService;
