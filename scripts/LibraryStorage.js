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
    getChartData: () => {
      var keys = Object.keys(localStorage);
      var books = [];
      var i = keys.length;
      var months =[];
      months.push({y: 0, name: 'January', drilldown: 'jan'});
      months.push({y: 0, name: 'February', drilldown: 'fev'});
      months.push({y: 0, name: 'March', drilldown: 'mar'});
      months.push({y: 0, name: 'April', drilldown: 'apr'});
      months.push({y: 0, name: 'May', drilldown: 'may'});
      months.push({y: 0, name: 'June', drilldown: 'jun'});
      months.push({y: 0, name: 'July', drilldown: 'jul'});
      months.push({y: 0, name: 'August', drilldown: 'aug'});
      months.push({y: 0, name: 'September', drilldown: 'sep'});
      months.push({y: 0, name: 'October', drilldown: 'oct'});
      months.push({y: 0, name: 'November', drilldown: 'nov'});
      months.push({y: 0, name: 'December', drilldown: 'dec'});
      var drillData = [];
      for (var m = 0; m < 12; m++) {
        drillData.push({id: months[m].drilldown, data: []});
      }
      while ( i-- ) {
        if (keys[i].indexOf("myPersonalLib") >-1) {
          var item = JSON.parse(localStorage.getItem(keys[i]));
          if (item.dateRead != undefined) {
            var date = new Date(item.dateRead);
            months[date.getMonth()].y += 1;
            drillData[date.getMonth()].data.push([item.title, 1]);
            books.push(item);
          }

        }

      }

      var chartData;
      chartData = {
        series: [{
          type: 'column',
          name: 'Months',
          colorByPoint: true,
          data: months
        }],
      drilldown: {
          series: drillData
        }
      };

      return chartData;
    }
  }
}

export default LibraryStorage;
