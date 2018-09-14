import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './components/BookList/BookList';
import SearchBook from './components/SearchBook/SearchBook';
import './App.css'

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shelvesTitles: ["wantToRead", "currentlyReading", "read"],
        books: [],
        currentlyReading: [],
        wantToRead: [],
        read: [],
        updateShelfTitle: ''
    }
    this.initBookShelves = this.initBookShelves.bind(this)
  }
  initBookShelves() {
    BooksAPI.getAll().then((books) => {
      console.log("totalBooks", books)
      this.setState({books})
    })
      .then(() => {
        this.setBooksonShelves();
      })
  }
  componentDidMount(){
    this.initBookShelves()
  }
  filterBooksbyShelfTitle(books, title) {
    return books.filter(book => book.shelf === title)
  }

  setBooksonShelves() {
    const allBooks = this.state.books;
    const titles = this.state.shelvesTitles;
    return titles.map((title) => {
      return this.setState({[title]: this.filterBooksbyShelfTitle(allBooks, title)})
    })
  }
  render() {
    const state = this.state
    return (
      <div className="app">

        <Route exact path='/' render={ props => (
          <BookList
          totalBooks={state.books}
          currentlyReading={state.currentlyReading}
          wantToRead={state.wantToRead}
          read={state.read}
          updateShelfTitle={state.updateShelfTitle}
          initBookShelves={this.initBookShelves}
          {...props}
          />
        )
        } />
        <Route path='/search' render={props => (
          <SearchBook
          totalBooks={state.books}
          initBookShelves={this.initBookShelves}
          {...props}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
