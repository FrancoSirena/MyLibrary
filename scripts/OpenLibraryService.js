import axios from 'axios';
var OpenLibraryService = {
	API: {
		url: 'https://openlibrary.org/search.json',
		bookUrl: 'https://openlibrary.org/api/books?bibkeys=',
		imgUrl: 'https://covers.openlibrary.org/b/',
		get: (url)=> {
			return axios.get(url, {responseType: 'json', headers: ''})
				.then(response => response.data);
		},
		getImgUrl: (key) => {

			return `${OpenLibraryService.API.imgUrl}${key}-M.jpg`;
		},
		OpenLibrary: {
			searchBook: (bookTitle, bookAuthor, keywordsFilter) => {
				var filter = []
				if (bookTitle != '')
					filter.push(`title=${bookTitle}`);
				if (bookAuthor!='')
					filter.push(`author=${bookAuthor}`);
				if (keywordsFilter!='')
				 	filter.push(`q=${keywordsFilter}`);
				return OpenLibraryService.API.get(`${OpenLibraryService.API.url}?${filter.join('&')}`)
					.then((response)=>{
						var docs = [];
						for(var item of response.docs){
							var mTest = true;
							var book = item;
							var key ='';
							if (item.isbn){
								mTest &= (!docs.some(e=>e.isbn && e.isbn.some(i => i == item.isbn[0])));
								key = 'isbn/' + item.isbn[0];
							}

							if (item.lccn){
								mTest &= (!docs.some(e=>e.lccn && e.lccn.some(i => i == item.lccn[0])));
								key = 'lccn/' + item.lccn[0];
							}

							if (item.olid){
								mTest &= (!docs.some(e=>e.olid && e.olid.some(i => i == item.olid[0])));
								key = 'olid/' + item.olid[0];
							}
							mTest |= docs.length ==0;
							book.__key = key;
							if (mTest && key != '')
								docs.push(item);
						};
						return docs;
					});
			},
			getBookInformation: (book) => {
				return OpenLibraryService.API.get(`${OpenLibraryService.API.bookUrl}${book.__key.replace('/', ':')}&jscmd=details&format=json`)
								.then((response) => {
									var record = response[Object.keys(response)[0]].record;
									return record[Object.keys(response)[0]].details.details;
								});
			}
		}
	}
}

export default OpenLibraryService;
