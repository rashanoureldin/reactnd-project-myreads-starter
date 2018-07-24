import React from 'react'
import { Route } from 'react-router-dom'
import Search from './Search';
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
class BooksApp extends React.Component {
  state =
   {
        books: []
   }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(() => {
      book.shelf=shelf;
      this.setState(state =>({
        books: state.books.filter(index => index.id !== book.id).concat([book])
     }))
    })
  }
  
render() {
  const { books } = this.state;
  if (books.length === 0) {
    return null
  }
  return (
    <div className="app">
      <Route exact path='/' render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MY Reads </h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf
                name="Currently Reading"
                title='Currently Reading'
                books={books.filter(index => index.shelf === 'currentlyReading')}
                sendChange={(book, shelf) => { this.changeShelf(book, shelf) }}
              />

              <Shelf
                title='Want to Read'
                name='Want to Read'
                books={books.filter(item => item.shelf === 'wantToRead')}
                sendChange={(book, shelf) => { this.changeShelf(book, shelf) }}
              />

              <Shelf
                title='Read'
                name='Read'
                books={books.filter(index => index.shelf === 'read')}
                sendChange={(book, shelf) => { this.changeShelf(book, shelf) }}
              />
            </div>
          </div>
          <div className="open-search">
            <Link to='/search' >Add a book</Link>
          </div>
        </div>

      )} />

      <Route path='/search' render={({ history }) => (
        <Search
          sendChange={(book, shelf) => { this.changeShelf(book, shelf) }}
          shelfBooks={this.state.books}
        />
      )}
      />

    </div>
  )
}
}

export default BooksApp