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
    getBooksByMonth: (month) => {
      var keys = Object.keys(localStorage);
      var books = [];
      var i = keys.length;
      while ( i-- ) {
        if (keys[i].indexOf("myPersonalLib") >-1)
          var item = localStorage.getItem(keys[i]);
          if (item.dateRead){
            var date = new Date(item.dateRead);
            if (item.getMont() == month)
              books.push(JSON.parse(item));
          }

      }
      return books;
    },
    getChartData: () => {
      var keys = Object.keys(localStorage);
      var i = keys.length;
      var months =[];
      var mYears =[];
      var mDrill =[];
      months.push(['January', 0]);
      months.push(['February',0]);
      months.push(['March',0]);
      months.push(['April',0]);
      months.push(['May',0]);
      months.push(['June',0]);
      months.push(['July',0]);
      months.push(['August', 0]);
      months.push(['September',0]);
      months.push(['October',0]);
      months.push(['November',0]);
      months.push(['December',0]);
      while ( i-- ) {
        if (keys[i].indexOf("myPersonalLib") >-1) {
          var item = JSON.parse(localStorage.getItem(keys[i]));
          if (item.dateRead != undefined) {
            var date = new Date(item.dateRead);
            if (!mYears.length || !mYears.some(e=>e.name==date.getFullYear())){
              mYears.push({y:0, name: date.getFullYear(), drilldown:date.getFullYear()});
              mDrill.push({id:date.getFullYear(), name:"Books",data:months});
            }
            var index = mYears.findIndex(e=>e.name==date.getFullYear());
            mYears[index].y += 1;
            mDrill[index].data[date.getMonth()][1] += 1;
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
