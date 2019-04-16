import React, {Component} from 'react';
import {getLibraryQuery} from '../queries/queries'
import { graphql } from 'react-apollo';

//components
import BookDetails from './BookDetails';


class LibraryDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }
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
                            return <li key = {book.id} onClick = {(e) => this.setState({selected: book.id})}>{book.name}</li>
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