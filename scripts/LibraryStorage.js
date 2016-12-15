var LibraryStorage = {
  DB:{
    searchBook: (book) => {
      var book = localStorage.getItem(`myPersonalLib${book.key}`);
      return book;
    },
    saveBook: (book) => {
      localStorage.setItem(`myPersonalLib${book.key}`, JSON.stringify(book));
    },
    removeBook: (book) => {
      localStorage.removeItem(`myPersonalLib${book.key}`);
    },
    getAllBooks: () => {
      var keys = Object.keys(localStorage);
      var books = [];
      var i = keys.length;
      while ( i-- ) {
        if (keys[i].indexOf("myPersonalLib") >-1)
          books.push(JSON.parse(localStorage.getItem(keys[i])));
      }
      return books;
    }
  }
}

export default LibraryStorage;
