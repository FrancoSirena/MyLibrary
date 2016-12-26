'use strict';

var OpenLibraryService = jest.genMockFromModule('../OpenLibraryService');
OpenLibraryService = {
  API : {
    OpenLibrary: {
      searchBook: (bookTitle, bookAuthor, keywordsFilter) => {
        var docs = [];
        docs.push({
                cover_i: 258027,
                has_fulltext: true,
                edition_count: 120,
                title: 'The Lord of the Rings',
                author_name: [
                    'J. R. R. Tolkien'
                ],
                first_publish_year: 1954,
                key: 'OL27448W',
                ia: [
                    'returnofking00tolk_1',
                    'lordofrings00tolk_1',
                    'lordofrings00tolk_0',
                    'lordofrings00tolk_3',
                    'lordofrings00tolk_2',
                    'lordofrings00tolk',
                    'twotowersbeingse1970tolk',
                    'lordofring00tolk',
                    'lordofrings56tolk',
                    'lordofringstolk00tolk',
                    'fellowshipofring00tolk_0'
                ],
                author_key: [
                    'OL26320A'
                ],
                public_scan_b: true
                });

        return new Promise((resolve, rejection)=> {resolve(docs)});
      }
    }
  }
}

module.exports = OpenLibraryService;
