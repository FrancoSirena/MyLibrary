
import React from 'react';
import {shallow} from 'enzyme';
import SearchApi from '../scripts/SearchApi';
import BookList from '../scripts/SearchApi';

it('Search show results and add a read book', () => {
  // Render a checkbox with label in the document
  const search = shallow(
    <SearchApi  />
  );

  checkbox.find('#bookTitle').value('lord of the rings');
  checkbox.find('#btnSearch').simulate('click');
 

  

  expect(checkbox.text()).toEqual('On');
});