var LibraryStorage = {
  DB:{
    searchReadBook: (book) => {
      var book = localStorage.getItem(`myLibReadBook${book.key}`);
      return book;
    },
    saveReadBook: (readBook) => {
      localStorage.removeItem(`myLibPendingBook${readBook.key}`);
      localStorage.setItem(`myLibReadBook${readBook.key}`, JSON.stringify(readBook));
    },
    savePendingBook: (pendingBook) => {
      localStorage.setItem(`myLibPendingBook${pendingBook.key}`, JSON.stringify(pendingBook));
    },
    removeReadBook: (readBook) => {
      localStorage.removeItem(`myLibReadBook${readBook.key}`);
    },
    removePendingBook: (pendingBook) => {
      localStorage.removeItem(`myLibPendingBook${pendingBook.key}`);
    },
    getAllPendingBooks: () => {
      var keys = Object.keys(localStorage);
      var books = [];
      var i = keys.length;
      while ( i-- ) {
        if (keys[i].indexOf("myLibPendingBook") >-1)
          books.push(JSON.parse(localStorage.getItem(keys[i])));
      }
      return books;
    },
    getAllReadBooks: () => {
      var keys = Object.keys(localStorage);
      var books = [];
      var i = keys.length;
      while ( i-- ) {
        if (keys[i].indexOf("myLibReadBook") >-1)
          books.push(JSON.parse(localStorage.getItem(keys[i])));
      }
      return books;
    }
  }
}

export default LibraryStorage;
