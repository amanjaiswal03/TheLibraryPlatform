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
                    <Button id = "info" href = "#add-book"> Add Book </Button>
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
                    <div className = "owner"><em> You are the owner of this library </em></div>
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
                    <Button className = "info remove" onClick = {()=> {
                            this.props.removeBookMutation({variables:{id: book.id, librariesId: this.props.match.params.id}, refetchQueries: [{ query: getBooksQuery }]}); 
                            this.props.getLibraryQuery.refetch() 
                        }
                    }> Remove </Button>
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
                <div className = "lib-details">
                    <div className = "lib-info">
                        <div><strong>Library Name: </strong> {library.name}</div><br></br>
                        <div><strong>Address:</strong> {library.address}</div><br></br>
                        <div><strong>Membership Fee:</strong> {library.membershipFee} $</div>
                    </div>
                    <div className = "allbook-lib">
                        <div><strong><em>All Books:</em> </strong>{this.addBookButton()}</div>
                        {library.books.map(book => {
                            return(
                                <div className = "book-lib" key = {book.id}>
                                    <Link to = {'/book/' + book.id} className = "link">
                                        <div className = "book-detail-lib">
                                            <div><strong> Book Name: </strong>{book.name}</div>
                                            <div><strong>Author: </strong>{book.authorName}</div>
                                        </div>
                                    </Link>
                                    <div className = "action-lib">
                                        <Link to = {'/book/' + book.id} className = "link"><Button className = "info">More Info</Button></Link>
                                        {this.removeBook(book)}
                                    </div>
                                    <hr></hr>
                                    <br></br>
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
                <div className="library-details">
                    <div className = "headTitle"> LIBRARY DETAILS </div>
                    {this.owner()}
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