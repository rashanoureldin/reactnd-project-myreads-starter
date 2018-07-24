import React from 'react';
import Book from './Book';

class Shelf extends React.Component {

    sendChange(book,shelf){
        this.props.sendChange(book, shelf)
    }
    
    render(){
        const { books } = this.props
        if (this.props.books.length === 0) {
            return null;
        }
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title }</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
               {
                  books.length > 0 &&
                   books.map((index) => (
                           <li key={index.id}>
							<Book
                                book={index}
                                authors={index.authors }
                                title={index.title }
                                imageLinks={index.imageLinks }
                                sendChange={(book, shelf) => { this.sendChange(book, shelf)}}
                              
							/>
						</li>
                   ))
                }
            </ol>
            </div>
            </div>
        )
    }
}
export default Shelf;