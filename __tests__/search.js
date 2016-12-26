jest.mock('../scripts/OpenLibraryService');
import React from 'react';
import {shallow} from 'enzyme';
import SearchApi from '../scripts/SearchApi';
import OpenLibraryService from '../scripts/OpenLibraryService';
import Index from '../scripts/Index';

describe('SearchApi',  () => {
  it('Searching books', () => {
    const search = shallow(<SearchApi />);
    search.find('#bookTitle').text('lord of the rings');
    search.find('#bookTitle').simulate('inputRef');
    search.find('#btnSearch').simulate('click');
    search.update();
    
    expect(search.state().isLoading).toBeTruthy();
  });
});
