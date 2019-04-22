import React, {Component} from 'react';
import {getLibraryQuery, removeBookMutation, getBooksQuery} from '../queries/queries'
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';

//components
import AddBook from './AddBook';


class LibraryDetails extends Component{

    displayLibraryDetails(){
        console.log(this.props.getLibraryQuery);
        const {library} =  this.props.getLibraryQuery;
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
                                <div key = {book.id}>
                                    <Link to = {'/book/' + book.id}>
                                        <li key = {book.id} >{book.name}<br></br> Author: {book.authorName}</li>
                                    </Link>
                                    <button onClick = {()=> {this.props.removeBookMutation({variables:{id: book.id, librariesId: this.props.match.params.id}, refetchQueries: [{ query: getBooksQuery }]}); this.props.getLibraryQuery.refetch() }}> Remove Book </button>
                                </div>
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
                    <AddBook libraryId = {this.props.match.params.id} fetch = {this.props.getLibraryQuery}/>
                </div>
            </div>
        )
    }
}

export default compose(graphql(getLibraryQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.match.params.id
            }
        }
    },
    name: "getLibraryQuery",
}),
graphql(removeBookMutation, {name: "removeBookMutation"})
)(LibraryDetails);