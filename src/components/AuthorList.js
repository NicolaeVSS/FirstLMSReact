"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import AuthorActions from '../actions/authorActions';

export class AuthorList extends React.Component{
    createAuthorRow(author){
        return (
            <tr key={author.authorId}>
                <td> {author.authorId} </td>
                <td> {author.authorName} </td>
            </tr>
        );
    }

    componentDidMount(){
        AuthorActions.readAuthors();
    }

    render() {
        
        let content = '';

        if( this.props.author.readState.pending){
            console.log("pending");
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div> 
                </div>
            );
        }
        
        if( this.props.author.readState.success){
            console.log("success");
            content = (
            <table className="table" style={{margin:'0px 5px 0px 5px'}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.author.authorList.map(this.createAuthorRow, this)}
                </tbody>    
            </table>
            );
        }

        return(
            <div>
                <h2 style={{marginLeft:'5px'}}>Authors</h2>
                {content}
            </div>
        );
    }
}

// let other devs know, these are the props that have to be provided to this component to render properly
AuthorList.propTypes = {
    author: PropTypes.object.isRequired
};
