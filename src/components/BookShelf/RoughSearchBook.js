import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'


import BookShelf from '../BookShelf/BookShelf'

class SearchBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showResult: false,
      query: "",
      books: [],
      highlightedValue: "",
      inputValue: "",
      resultNum: 20,
      keyword: "",
      showAutoComplete: false
    }
    this.onSearchBooks = this.onSearchBooks.bind(this)
  }

trimQuery = () => {
    this.setState(prevState => ({
      query: prevState.query.trim(),
    }))
  }
  onSearchBooks = (event) => {
     const query = event.target.value.trim();
     this.setState({ query: query })
    const count = this.state.resultNum
    this.trimQuery()

    BooksAPI.search(query, count).then((books) => {
      this.setState({books})
    })
  }


  render() {
    const props = this.props
    const list = this.state.books
    const keyword = this.state.query
    const myBooks = this.props.totalBooks
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
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.length > 0? <BookShelf
                    totalBooks={myBooks}
                      bookList={list}
                      title={`Result: ${keyword}`}
                      updateShelf={props.initBookShelves}
                    /> :
                    <div>

                      <h3>Search returned 0 books.  Please try again!</h3>

                    </div>
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
