import React, {Component} from 'react';
import {getLibraryQuery} from '../queries/queries'
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

//components
import AddBook from './AddBook';


class LibraryDetails extends Component{
    displayLibraryDetails(){
        const {library} =  this.props.data;
        if (library){
            return(
                <div>
                    <h2>Name: {library.name}</h2>
                    <p> Address: {library.address}</p>
                    <p> Membership Fee: {library.membershipFee}</p>
                    <p> All books in this library: </p>
                    <ul className = "all-books">
                        {library.books.map(book => {
                            return( 
                                <Link to = {'/book/' + book.id} key={book.id}>
                                    <li key = {book.id} >{book.name}<br></br> Author: {book.authorName}</li>
                                </Link>
                            )
                        })}
                    </ul>
                </div>
            )
        }
        else {
            return( <div>No library selected...</div> );
        }
    }
    render(){
        return(
            <div>
                <div className="library-details">
                    {this.displayLibraryDetails()}
                </div>
                <div className = "add-book">
                    <AddBook libraryId = {this.props.match.params.id} />
                </div>
            </div>
        )
    }
}

export default graphql(getLibraryQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.match.params.id
            }
        }
    }
})(LibraryDetails);