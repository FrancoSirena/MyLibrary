jest.mock('../scripts/OpenLibraryService');
import React from 'react';
import {shallow} from 'enzyme';
import SearchApi from '../scripts/SearchApi';
import OpenLibraryService from '../scripts/OpenLibraryService';
import BooksList from '../scripts/BooksList';

describe('SearchApi',  () => {
  it('Searching books', () => {
    const search = shallow(<SearchApi />);
    search.find('#bookTitle').text('lord of the rings');
    search.find('#bookTitle').simulate('inputRef');
    search.find('#btnSearch').simulate('click');
    search.update();
    expect(search.state().isLoading).toBeTruthy();
  });

  it('Find/Add book', async () => {
    const search = shallow(<SearchApi />);
    const books = shallow(<BooksList />);
    return OpenLibraryService.API.OpenLibrary.searchBook('','','').then((docs)  => {
      search.setState({myBooks: docs  });
      search.update();

      expect(search.find("#listBooks").visible).toBeTruthy();

      search.find("#btnAddQueue")[0].simulate('click');
      books.update();

      expect(2).toBeEqual(1);
    });



  });
});
