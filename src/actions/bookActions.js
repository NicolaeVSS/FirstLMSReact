import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios'

const backendURL = 'http://localhost:3000'

const BooksActions = {

    createBook: function(book){
        Dispatcher.dispatch({
            actionType:'create_books_started'
        });

        axios.post(backendURL + '/book', book)
        .then( (res) => {
            Dispatcher.dispatch({
                actionType: 'create_books_successful',
                data: {
                    bookId:res.data.insertId,
                    title:book.title,
                    authorId:book.authorId,
                    publisherId:book.publisherId
                }
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'create_books_failure'
            });
        });
    },

    readBooks: function(){
        Dispatcher.dispatch({
            actionType: 'read_books_started'
        });
        axios.get(backendURL + '/book')    // returns a promise, an object containing: resolve or reject
        .then(res => {                              // resolution
            Dispatcher.dispatch({
                actionType: 'read_books_successful', // update action type
                data:  res.data                      // send response
            });
        })
        .catch( (error) => {                        // reject
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'read_books_failure'
            });
        });
    },

    updateBook: function(book){
        Dispatcher.dispatch({
            actionType:'update_books_started'
        });

        axios.put(backendURL + '/book/' + book.bookId, book)
        .then( () => {
            Dispatcher.dispatch({
                actionType: 'update_books_successful',
                data: book
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'update_books_failure'
            });
        });
    },

    deleteBook: function(bookId){
        Dispatcher.dispatch({
            actionType:'delete_books_started'
        });

        axios.delete(backendURL + '/book/' + bookId)
        .then( () => {
            Dispatcher.dispatch({
                actionType: 'delete_books_successful',
                data: bookId
            });
        })
        .catch( (error) => {
            console.log(error);
            Dispatcher.dispatch({
                actionType: 'delete_books_failure'
            });
        });

    }
}

module.exports = BooksActions;