import React from 'react';
import BookCategoryBtn from './BookCategoryBtn';
import * as utils from '../../utils/Common'

class ShelfItem extends React.Component {
   state = {
      bookShelfTitle : null
   }


   getImageLink = (obj) => {
      const imageList = utils.deepCopy(obj.imageLinks)
      if (imageList !== null) {
        return (imageList.smallThumbnail)
      }
    }

    inMyBookList = () => {
      const totalBooks = this.props.totalBooks
      const bookID = this.props.id
      const isInMyShelf = totalBooks.filter(e => e.id === bookID)
      if (isInMyShelf.length > 0) {
        console.log('length of id match array: ',isInMyShelf.length )
        console.log('isinShelf: ', isInMyShelf[0].title)
        this.setState({bookShelfTitle: isInMyShelf[0].shelf})
      }
else{
  this.setState({bookShelfTitle: null})
}

    }

    componentDidMount() {
      this.inMyBookList()
    }

    render() {
      const book = this.props
      const bookID = this.props.id
      const coverStyle = {
        width: '100%',
        height: '100%',
        backgroundImage: `url(${this.getImageLink(this.props)})`
      }

      return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={coverStyle}></div>
            <BookCategoryBtn
              shelf={this.state.bookShelfTitle}
              updateShelf={this.props.updateShelf}
              book={book}
              bookID={bookID}
            />
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.authors}</div>
        </div>
      )
    }

}
export default ShelfItem
