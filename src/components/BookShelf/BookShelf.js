import React from 'react'
import ShelfItem from './ShelfItem'
console.log("hello")
class BookShelf extends React.Component {
   render() {
      const BookList = {...this.props.bookList}
      const { totalBooks, title: ShelfTitle } = this.props

      return (
         <div className="bookshelf">
        <h2 className="bookshelf-title">{ShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {Object.keys(BookList).map((k, index) =>
              <li key={k} className="book">
                <ShelfItem
                  totalBooks={totalBooks}
                  {...BookList[k]}
                  updateShelf={this.props.updateShelf}
                />
              </li>
            )}
          </ol>
        </div>
      </div>
      )
   }
}

export default BookShelf
