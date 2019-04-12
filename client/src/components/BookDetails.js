import React, {Component} from 'react';
import {getBookQuery, getAuthorsQuery} from '../queries/queries';
import {graphql} from 'react-apollo';

class BookDetails extends Component{
    displayBookDetails(){
        console.log(this.props);
        const {book} =  this.props.data;
        if (book){
            console.log(this.props.data);
            return(
                <div>
                    <h2>Name: {book.name}</h2>
                    <p> Genre: {book.genre}</p>
                    <p> Author: {book.author.name}</p>
                </div>
            )
        }
        else {
            return(
                <div> No book selected</div>
            )
        }
    }
    render(){
        return(
            <div className="book-details">
                {this.displayBookDetails()}
            </div>
        )
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);