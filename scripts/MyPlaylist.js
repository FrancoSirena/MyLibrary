import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Channel from "./Channel";
import OpenLibraryService from './OpenLibraryService';

export default class MyPlaylist extends React.Component {
  state = {
    myBooks: []
  }
  componentDidMount = () => {
    Channel.on('myPlaylist.addBook', this.addBook);
  }
  componentWillUnmount = () => {
    Channel.removeListener('myPlaylist.addBook', this.addBook);
  }
  addBook = (bookEntry) => {
    var myBooks = this.state.myBooks;
    if (!myBooks.some(e => e.key == bookEntry.key))
      myBooks.push(bookEntry);
    this.setState(bookEntry);
  }
  render() {
    return(<List>
    {
      this.state.myBooks.map((item, index) => {return(
          <ListItem
                 leftAvatar={<Avatar src={OpenLibraryService.API.imgUrl + item.cover_i +'-S.jpg'} />}
                 primaryText={item.title +'-'+ (item.subtitle?item.subtitle:' ')}
                 secondaryText={item.author_name}
                  key={index}
               />);
      })
    }
    </List>);
  }
}
