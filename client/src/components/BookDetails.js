import React, {Component} from 'react';
import {getBookQuery} from '../queries/queries';
import {graphql} from 'react-apollo';

import {Link} from 'react-router-dom';

//material - ui component
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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
                        <div><strong>Book Name: </strong> {book.name}</div><br></br>
                        <div><strong>Genre:</strong> {book.genre}</div><br></br>
                        <div><strong>Author:</strong> {book.authorName}</div>
                    </div>
                    <div className = "alllib-book"> 
                        <div><strong><em>Available in: </em></strong></div><br></br> {
                            book.library.map((library) => {
                                return (
                                <div className = "lib-book">
                                    <Link to = {'/library/' + library.id} key={library.id} className = "link">
                                    <div className = "lib-detail-book">
                                        <div><strong> Library Name: </strong>{library.name}</div><br></br>
                                        <div><strong>Address: </strong>{library.address}</div>
                                    </div>
                                    </Link>
                                    <div className = "action-book">
                                        <Link to = {'/library/' + library.id} key={library.id} className = "link"><Button className = "info">More Info</Button></Link>
                                    </div>
                                    <hr></hr>
                                </div>
                                
                                )}
                            )
                        } 
                    </div>
                    <br></br>
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
            <div>
            <div className = "headTitle"> BOOK DETAILS </div>
            <div className="book-details">
                {this.displayBookDetails()}
            </div>
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