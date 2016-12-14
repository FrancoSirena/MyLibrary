var OpenLibraryService = {
	API: {
		url: 'https://openlibrary.org/search.json',
		imgUrl: "https://covers.openlibrary.org/b/id/",
		get: (url)=> {
			return fetch(`${OpenLibraryService.API.url}${url}`)
				.then(response => response.json())
		},
		OpenLibrary: {
			searchBook: (bookTitle, bookAuthor, keywordsFilter) => {
				var filter = bookTitle != '' ? `title=${bookTitle}` : '';
				filter = filter != '' && bookAuthor!='' ? filter+`&author=${bookAuthor}`: filter;
				filter = filter != '' && bookAuthor!='' ? filter+`&q=${keywordsFilter}`: filter;
				return OpenLibraryService.API.get(`?${filter}`)
					.then((response)=>{
						return response.docs;
					});
			}
		}
	}
}

export default OpenLibraryService;
