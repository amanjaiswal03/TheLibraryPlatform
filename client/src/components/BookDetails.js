import React, {Component} from 'react';
import {getBookQuery} from '../queries/queries';
import {graphql} from 'react-apollo';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

class BookDetails extends Component{
    displayBookDetails(){
        console.log(this.props);
        const {book} =  this.props.getBookQuery;
        console.log(book);
        if (book){
            return(
                <div className = "book-details">
                    <div className = "book-info">
                        <div className = "book-title">{book.name}</div>
                        <div className = "book-genre"><strong>Genre: </strong>{book.genre}</div><br></br>
                        <div className = "book-author"><strong>Author:</strong> {book.authorName}</div>
                    </div>
                    <div className = "alllib-book"> 
                        <div className = "available">Available in:</div> {
                            book.library.map((library) => {
                                return (
                                <div className = "lib-book" key = {library.id}>
                                    <Link to = {'/library/' + library.id} key={library.id} className = "link">
                                        <div className = "lib-detail-book">
                                            <div>{library.name}</div>
                                            <div>@ {library.address}</div>
                                        </div>
                                    </Link>
                                    <div className = "action-book">
                                        <Link to = {'/library/' + library.id} key={library.id} className = "link2">More Info</Link>
                                    </div>
                                </div>

                                )}
                            )
                        } 
                    </div>
                </div>
            )
        }
        else {
            return(
                <div className = "result"> Loading... </div>
            )
        }
    }
    render(){
        return(
            <div className="book-details" id ="all-content">
                {this.displayBookDetails()}
            </div>
        )
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.match.params.id
            }
        }
    },
    name: "getBookQuery"
})(BookDetails);