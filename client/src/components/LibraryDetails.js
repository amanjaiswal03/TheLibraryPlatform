import React, {Component} from 'react';
import {getLibraryQuery, removeBookMutation, getBooksQuery} from '../queries/queries'
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

//components
import AddBook from './AddBook';


class LibraryDetails extends Component{

    removeBook(book){
        if(this.props.getLibraryQuery.library && localStorage.usertoken){
            if (this.props.getLibraryQuery.library.userId === jwt_decode(localStorage.usertoken)._id)
            {
                return (
                    <button onClick = {()=> {
                            this.props.removeBookMutation({variables:{id: book.id, librariesId: this.props.match.params.id}, refetchQueries: [{ query: getBooksQuery }]}); 
                            this.props.getLibraryQuery.refetch() 
                        }
                    }> Remove </button>
                )
            }
            else{
                return null;
            }
        }
        else {
            return null
        }
    }

    addBook(){
        if(this.props.getLibraryQuery.library && localStorage.usertoken){
            console.log(this.props.getLibraryQuery.library);
            if (this.props.getLibraryQuery.library.userId === jwt_decode(localStorage.usertoken)._id){
                return <AddBook libraryId = {this.props.match.params.id} fetch = {this.props.getLibraryQuery}/>
            }
            else {
                return null
            }
        }
        else{
            return null
        }
    }

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
                                    {this.removeBook(book)}
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
                {this.addBook()}
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