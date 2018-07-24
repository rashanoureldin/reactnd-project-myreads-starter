import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends React.Component {
    state = {
        query: '',
        books: []
    }
    sendChange(book,shelf){
        this.props.sendChange(book,shelf)
    }
    fetchBooks(query){
     if(!!query){
         BooksAPI.search(query).then(data =>{
             if(!!data.error){
                 this.setState({
                     books:[]
                 });
             }else{
                 let checkShelfs = data.map(book=> {
                     for (var i = 0; i < this.props.shelfBooks.length; i++) {
                         if (this.props.shelfBooks[i].id === book.id){
                             book.shelf=this.props.shelfBooks[i].shelf;
                         }
                         
                     }
                     return book;
                 })
                 this.setState({
                     books:checkShelfs
                 })
             }
             
         })

        } else { 
            this.setState({ books: [] })
        }

    }    
      render() {
        const { books } = this.state;
      
        return (
            <div className="search-books">

                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close search</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => this.fetchBooks(event.target.value) }
                            />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                      {
                        books.length !== 0 &&
                           books.map((book,index) => (
                                    <Book
                                        key={index}
                                        book={book}
                                    sendChange={(book, shelf) => { this.sendChange(book, shelf) }}
                                  />
                        ))
                      }
                    </ol>
                </div>
            </div>
        )
    }
}


export default Search;