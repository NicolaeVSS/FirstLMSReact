"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';
import { CreateBookButton, UpdateBookButton, DeleteBookButton } from './Buttons';

export class BookList extends React.Component{

    createBookRow(book){
        // <td><button>Update</button><button>Delete</button></td>
        return (
            <tr key={book.bookId}>
                <td> {book.bookId} </td>
                <td> {book.title} </td>
                <td> {book.authorId} </td>
                <td> {book.publisherId} </td>
                {/* [bookId, title, authorId, publisherId] ={...book} */}
                <td><UpdateBookButton book={book}/><DeleteBookButton book={book}/></td>
            </tr>
        );
    }

    componentDidMount(){
        BookActions.readBooks();
    }

    render() {
        
        let content = '';

        if( this.props.book.readState.pending || 
            this.props.book.createState.pending || 
            this.props.book.updateState.pending || 
            this.props.book.deleteState.pending){
            
            console.log("pending");
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
            );
        }
        
        if( this.props.book.readState.success || 
            this.props.book.createState.success || 
            this.props.book.updateState.success || 
            this.props.book.deleteState.success){
            console.log("success");
            content = (
            <table className="table" style={{margin:'0px 5px 0px 5px'}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.book.bookList.map(this.createBookRow, this)}
                </tbody>    
            </table>
            );
        }
        
        if( this.props.book.readState.failure || 
            this.props.book.createState.failure || 
            this.props.book.updateState.failure || 
            this.props.book.deleteState.failure){
            
                console.log("failure");
                content = (
                <div className="alert alert-danger" role="alert">
                    Your Previous Operation Really Broke Stuff.
                </div>
            );
        }

        return(
            <div>
                <h2 style={{marginLeft:'5px'}}><CreateBookButton/>Books</h2>
                {content}
            </div>
        );
        
    }
}

// let other devs know, these are the props that have to be provided to this component to render properly
BookList.propTypes = {
    book: PropTypes.object.isRequired
};



