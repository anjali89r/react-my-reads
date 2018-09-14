import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'


import BookShelf from '../BookShelf/BookShelf'
//import ShelfItem from '../BookShelf/ShelfItem';

class SearchBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchErr: false,
      query: "",
      books: [],

    }
    this.onSearchBooks = this.onSearchBooks.bind(this)
  }


  onSearchBooks = (event) => {
     const query = event.target.value.trim();
     this.setState({ query: query })
    const count = this.state.resultNum
    if(query) {
      BooksAPI.search(query, count).then((books) => { console.log('search books: ', books)
        books.length > 0 ? this.setState({books: books, searchErr: false}) : this.setState({books: [], searchErr: true})
      })
    }
    else this.setState({books: [], searchErr: false })

  }


  render() {
    const props = this.props
    const list = this.state.books

    return (
      <div id="search">
        <div className="close-search">
          <Link
            to='/'
            className="close-search"
          />
        </div>
        <div className="search-wrap">
          <input
            className="search-bar"
            value={this.state.query}
            onChange={this.onSearchBooks}
            placeholder="Search by title or author"
          />
        </div>
        {/* <div className="search-books-results">
        {list.length > 0 && (
          <div>
            <ol className="books-grid">
              {
                list.map((book, index) => (
                  <li key={index}>
                    <ShelfItem
                    totalBooks={props.totalBooks}
                    {...book}
                    updateShelf={props.initBookShelves}
                  />
                  </li>

                ))
              }
            </ol>
          </div>

        ) }

        {this.state.searchErr && (
          <div>
          <h3>Search returned 0 books.  Please try again!</h3>
          </div>

        )}
        </div> */}
        <div className="search-books-results">
          <ol className="books-grid">

                    <BookShelf
                      totalBooks={props.totalBooks}
                      bookList={list}
                      title={`Result: ${this.state.query}`}
                      updateShelf={props.initBookShelves}
                    />

          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
