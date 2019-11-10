"use strict"

import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import BooksActions from '../actions/bookActions'

const buttonStyle = {
    borderRadius:'6px',
    marginRight:'15px',
    outline:'0 !important'
}

const formFooterStyle= {
    display:"inline-block",
    float:"right"
}

export const UpdateBookButton = (props) => {
    // show is the state of the modal, whether it is visible or not
    // setShow is a function which will change the state of the modal
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();

        // not props book
        let book = {
            bookId:event.target.bookId.value,
            title:event.target.title.value,
            authorId:event.target.author.value,
            publisherId:event.target.publisher.value,
        }

        console.log("Updating: " + book.bookId + "\t" + book.title + "\t" + book.authorId + "\t" + book.publisherId);

        BooksActions.updateBook(book);
    }

    return(
        <React.Fragment>
            <button className="btn-primary" onClick={handleShow} style={buttonStyle}>
                <b>Update</b>
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><b>Update a Book</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="bookId">
                            <Form.Label><b>Book ID:</b></Form.Label>
                            <Form.Control
                                type="text"
                                name="bookId"
                                placeholder="Book ID"
                                defaultValue = {props.book.bookId}
                                disabled
                                required
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="title">
                            <Form.Label><b>Book Title:</b></Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Book Title"
                                defaultValue = {props.book.title}
                                required
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="author">
                            <Form.Label><b>Book Author:</b></Form.Label>
                            <Form.Control
                                type="number"
                                name="author"
                                placeholder="Book Author"
                                defaultValue = {props.book.authorId}
                                required
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="publisher">
                            <Form.Label><b>Book Publisher:</b></Form.Label>
                            <Form.Control
                                type="number"
                                name="publisher"
                                placeholder="Book Publisher"
                                defaultValue = {props.book.publisherId}
                                required
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group style={formFooterStyle} >
                            <button className="btn-primary" type="submit" onClick={handleClose} style={buttonStyle}>
                                Submit
                            </button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export const CreateBookButton = () => {
    // show is the state of the modal, whether it is visible or not
    // setShow is a function which will change the state of the modal
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();

        // not props book
        let book = {
            title:event.target.title.value,
            authorId:event.target.author.value,
            publisherId:event.target.publisher.value,
        }

        console.log("Creating: " + book.title + "\t" + book.authorId + "\t" + book.publisherId);

        BooksActions.createBook(book);
    }

    return(
        <React.Fragment>
            <button className="btn-success" onClick={handleShow} style={buttonStyle}>
                <b>+</b>
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><b>Create a Book</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label><b>Book Title:</b></Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Book Title"
                                required
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="author">
                            <Form.Label><b>Book Author:</b></Form.Label>
                            <Form.Control
                                type="number"
                                name="author"
                                placeholder="Book Author"
                                required
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="publisher">
                            <Form.Label><b>Book Publisher:</b></Form.Label>
                            <Form.Control
                                type="number"
                                name="publisher"
                                placeholder="Book Publisher"
                                required
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group style={formFooterStyle} >
                            <button className="btn-primary" type="submit" onClick={handleClose} style={buttonStyle}>
                                Submit
                            </button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export const DeleteBookButton = (props) => {
    // show is the state of the modal, whether it is visible or not
    // setShow is a function which will change the state of the modal
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Deleting: " + props.book.bookId + "\t" + props.book.title + "\t" + props.book.authorId + "\t" + props.book.publisherId);

        BooksActions.deleteBook(props.book.bookId);
    }

    return(
        <React.Fragment>
            <button className="btn-danger" onClick={handleShow} style={buttonStyle}>
                <b>Delete</b>
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><b>Delete a Book</b></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="bookId">
                            <Form.Label><b>Book ID:</b></Form.Label>
                            <Form.Control
                                type="text"
                                name="bookId"
                                placeholder="Book ID"
                                defaultValue = {props.book.bookId}
                                disabled
                                required
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="title">
                            <Form.Label><b>Book Title:</b></Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Book Title"
                                defaultValue = {props.book.title}
                                disabled
                                required
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="author">
                            <Form.Label><b>Book Author:</b></Form.Label>
                            <Form.Control
                                type="number"
                                name="author"
                                placeholder="Book Author"
                                defaultValue = {props.book.authorId}
                                disabled
                                required
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="publisher">
                            <Form.Label><b>Book Publisher:</b></Form.Label>
                            <Form.Control
                                type="number"
                                name="publisher"
                                placeholder="Book Publisher"
                                defaultValue = {props.book.publisherId}
                                disabled
                                required
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group style={formFooterStyle}>
                            <button className="btn-danger" type="submit" onClick={handleClose} style={buttonStyle}>
                                Submit
                            </button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}
