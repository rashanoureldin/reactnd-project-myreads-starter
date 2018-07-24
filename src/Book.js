import React from 'react'

class Book extends React.Component {  

    handelChange(value){
        this.props.sendChange(this.props.book,value)
   }
    render(){
        
       let bookCover ;
       if(!! this.props.book.imageLinks){
           bookCover = this.props.book.imageLinks.thumbnail;
       }else{
           bookCover = "url('http://via.placeholder.com/188*128)"
       }
       const style={
           width: 128, height: 188,
           backgroundImage:`url(${bookCover})`
       }

        return (
            
            <div className="book">
            <div className="book-top">
            <div className="book-cover" style={style}></div>
            <div className="book-shelf-changer">
            <select 
             value={this.props.book.shelf || "none"}
                            onChange={(event) => this.handelChange(event.target.value) }>
                            <option  disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{ this.props.book.title }</div>
                <div className="book-authors">{ this.props.book.authors ?this.props.book.authors.join (',') :'' }</div>
            </div>
        )
    }
}

export default Book;
