import React, {Component} from 'react';
import {getLibraryQuery, removeBookMutation, getBooksQuery} from '../queries/queries'
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import Button from '@material-ui/core/Button';

//components
import AddBook from './AddBook';


class LibraryDetails extends Component{

    addBookButton(){
        if(this.props.getLibraryQuery.library && localStorage.usertoken){
            if (this.props.getLibraryQuery.library.userId === jwt_decode(localStorage.usertoken)._id)
            {
                return (
                    <button className = "info" id = "info" href = "#add-book"> Add Book </button>
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

    owner(){
        if(this.props.getLibraryQuery.library && localStorage.usertoken){
            if (this.props.getLibraryQuery.library.userId === jwt_decode(localStorage.usertoken)._id)
            {
                return (
                    <button className = "owner"><em> Owner </em></button>
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

    removeBook(book){
        if(this.props.getLibraryQuery.library && localStorage.usertoken){
            if (this.props.getLibraryQuery.library.userId === jwt_decode(localStorage.usertoken)._id)
            {
                return (
                    <button className = "info" onClick = {()=> {
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
                return <AddBook libraryId = {this.props.match.params.id} getLibraryQuery = {this.props.getLibraryQuery}/>
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
                <div className = "book-details">
                    <div className = "lib-info">
                        <div className = "book-info">
                            <div className = "book-title"> {library.name} {this.owner()}</div><br></br>
                            <div><strong>Address:</strong> {library.address}</div><br></br>
                            <div><strong>Membership Fee:</strong> {library.membershipFee} $</div>
                        </div>
                        {this.addBook()}
                    </div>
                    <div className = "alllib-book">
                        <div className = "available"><strong><em>All Books:</em> </strong></div>
                        {library.books.map(book => {
                            return(
                                <div className = "lib-book" key = {book.id}>
                                    <Link to = {'/book/' + book.id} className = "link">
                                        <div className = "lib-detail-book">
                                            <div>{book.name}</div>
                                            <div>by {book.authorName}</div>
                                        </div>
                                    </Link>
                                    <div className = "action-lib">
                                        <Link to = {'/book/' + book.id} className = "link"><button className = "info lib-more">More Info</button></Link>
                                        {this.removeBook(book)}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
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
                <div className="book-details" id = "all-content">
                    {this.displayLibraryDetails()}
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