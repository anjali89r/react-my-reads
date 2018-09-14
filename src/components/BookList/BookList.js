import React, { Component} from 'react';

import {Link} from 'react-router-dom';
import BookShelf from '../BookShelf/BookShelf'

class BookList extends Component {
   render() {
      const props = this.props
      return (
         <div className="list-books">
        <div className="list-books-title">
          <h1>MY READS</h1>
        </div>
        <div id="list-books-content">
          <BookShelf totalBooks={props.totalBooks}
                              updateShelf={props.initBookShelves}
                              bookList={props.currentlyReading}
                              title="Currently Reading"/>
          <BookShelf totalBooks={props.totalBooks}
                              updateShelf={props.initBookShelves}
                              bookList={props.wantToRead}
                              title="Want To Read"/>
          <BookShelf totalBooks={props.totalBooks}
                              updateShelf={props.initBookShelves}
                              bookList={props.read}
                              title="Read Done"/>
        </div>
        <div className="open-search">
          <Link
            to='/search'
          >Add a book</Link>
        </div>
      </div>

      )
   }
}
export default BookList
