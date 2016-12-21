var LibraryStorage = {
  DB:{
    searchBook: (book) => {
      var book = localStorage.getItem(`myPersonalLib${book.key}`);
      return book;
    },
    saveBook: (book) => {
      if (LibraryStorage.DB.searchBook(book) != null)
        localStorage.removeItem(`myPersonalLib${book.key}`);

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
    },
    getBooksByMonth: (month, year) => {
      var keys = Object.keys(localStorage);
      var books = [];
      var i = keys.length;
      while ( i-- ) {
        if (keys[i].indexOf("myPersonalLib") >-1)
          var item = JSON.parse(localStorage.getItem(keys[i]));
          if (item.dateRead){
            var date = new Date(item.dateRead);
            if (date.getMonth() == month && date.getFullYear() == year)
              books.push(item);
          }

      }
      return books;
    },
    getChartData: () => {
      var keys = Object.keys(localStorage);
      var i = keys.length;
      var mYears =[];
      var mDrill =[];
      while ( i-- ) {
        if (keys[i].indexOf("myPersonalLib") >-1) {
          var item = JSON.parse(localStorage.getItem(keys[i]));
          if (item.dateRead != undefined) {
            var date = new Date(item.dateRead);
            if (!mYears.length || !mYears.some(e=>e.name==date.getFullYear())){
              mYears.push({y:0, name: date.getFullYear(), drilldown:date.getFullYear()});
              mDrill.push({id:date.getFullYear(), name:date.getFullYear(),data:[{name:'January', y:0},{name:'February', y:0}
                                                                                    ,{name:'March', y:0},{name:'April', y:0}
                                                                                    ,{name:'May', y:0},{name:'June', y:0}
                                                                                    ,{name:'July', y:0},{name:'August', y:0}
                                                                                    ,{name:'September', y:0},{name:'October', y:0}
                                                                                    ,{name:'November', y:0},{name:'December', y:0}]});
            }
            var index = mYears.findIndex(e=>e.name==date.getFullYear());
            mYears[index].y += 1;
            mDrill[index].data[date.getMonth()].y += 1;
          }

        }

      }

      var chartData;
      chartData = {
        series: [{
          type: 'column',
          name: 'Months',
          colorByPoint: true,
          data: mYears
        }],
        drilldown: {
          series: mDrill
        }
      };


      return chartData;
    }
  }
}

export default LibraryStorage;
