import Dispatcher from '../dispatcher/appDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _bookStore = { // by convention, anything _, means private- dont mutate me
    book:{
        bookList: [],
        createState:{
            pending:false, 
            success:false, 
            failure:false  
        },
        readState:{     // the state of IO operations 
            pending:false, 
            success:false, 
            failure:false  
        },
        updateState:{
            pending:false, 
            success:false, 
            failure:false  
        },
        deleteState:{
            pending:false, 
            success:false, 
            failure:false  
        },
        error: ''       // keep track of errors and failures
    }
};

class BookStoreClass extends EventEmitter{ // EventEmitter is from NodeJS. when something is complete, notify subscribers

    addChangeListener(cb){  // this is the method in the EventEmitter
        this.on(CHANGE_EVENT, cb);  // subscribing to events
    }

    removeChangeListener(cb){
        this.removeListener(CHANGE_EVENT, cb);  // unsubscribe
    }

    emitChange(){
        this.emit(CHANGE_EVENT);    // whenever the store has data and status, notify listeners of changes
    }

    getAllBooks(){
        return _bookStore.book;
    }

    resetCreateState(){
        _bookStore.book.createState = {
            pending:false,
            success:false,
            failure:false
          }
    }

    resetReadState(){               // when operation is done.
        _bookStore.book.readState = {
            pending:false,
            success:false,
            failure:false
          }
    }

    resetUpdateState(){
        _bookStore.book.updateState = {
            pending:false,
            success:false,
            failure:false
          }
    }

    resetDeleteState(){
        _bookStore.book.deleteState = {
            pending:false,
            success:false,
            failure:false
          }
    }
}

// create an instance of this class
const BookStore = new BookStoreClass();

Dispatcher.register( (action) => {  // dispatcher is made aware of store, and passes an action

    switch (action.actionType){
        // CREATE STATES
        case 'create_books_successful':
            BookStore.resetCreateState();
            _bookStore.book.bookList.push(action.data);
            _bookStore.book.createState.success = true;
            BookStore.emitChange();
            break;
        case 'create_books_failure':
            BookStore.resetCreateState();
            _bookStore.book.createState.failure = true;
            BookStore.emitChange();
            break;
        case 'create_books_started':
            BookStore.resetCreateState();
            _bookStore.book.createState.pending = true;
            BookStore.emitChange();
            break;

        // READ STATES
        case 'read_books_successful':               // if the server successfully read the book
            BookStore.resetReadState();             // reset 
            _bookStore.book.bookList = action.data; // get the data
            _bookStore.book.readState.success = true;
            BookStore.emitChange();                 // alert subs to show the new data
            break;
        case 'read_books_failure':
            BookStore.resetReadState();
            _bookStore.book.readState.failure = true;
            BookStore.emitChange();
            break;
        case 'read_books_started':
            BookStore.resetReadState();
            _bookStore.book.readState.pending = true;
            BookStore.emitChange();
            break;

        // UPDATE STATES
        case 'update_books_successful':
            BookStore.resetUpdateState();
            _bookStore.book.bookList                // findIndex() then update (by value or reference)
            .forEach(ele => {
                if(ele.bookId == action.data.bookId)
                {
                    ele.title = action.data.title;
                    ele.authorId = action.data.authorId;
                    ele.publisherId = action.data.publisherId;
                }
            });
            _bookStore.book.updateState.success = true;
            BookStore.emitChange();
            break;
        case 'update_books_failure':
            BookStore.resetUpdateState();
            _bookStore.book.updateState.failure = true;
            BookStore.emitChange();
            break;
        case 'update_books_started':
            BookStore.resetUpdateState();
            _bookStore.book.updateState.pending = true;
            BookStore.emitChange();
            break;

        // DELETE STATES
        case 'delete_books_successful':
            BookStore.resetDeleteState();
            _bookStore.book.bookList = _bookStore.book.bookList.filter(ele => ele.bookId !== action.data);
            _bookStore.book.deleteState.success = true;
            BookStore.emitChange();
            break;
        case 'delete_books_failure':
            BookStore.resetDeleteState();
            _bookStore.book.deleteState.failure = true;
            BookStore.emitChange();
            break;
        case 'delete_books_started':
            BookStore.resetDeleteState();
            _bookStore.book.deleteState.pending = true;
            BookStore.emitChange();
            break;
        default:
            return;
    }
} );

export default BookStore;