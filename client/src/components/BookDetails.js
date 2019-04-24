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
                <div>
                    <h2>Name: {book.name}</h2>
                    <p> Genre: {book.genre}</p>
                    <p> Author: {book.authorName}</p>
                    <div> <h2>Available in: </h2> {
                        book.library.map((library) => {
                            return (<Link to = {'/library/' + library.id} key={library.id}>
                            <Card id = "liblist">
                                <CardContent>
                                    <Typography variant="h5" component="h2">{library.name} </Typography> 
                                    <Typography component="p"> Address: {library.address}  </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Details</Button>
                                </CardActions>
                            </Card>
                        </Link>)}
                        )
                    } </div>
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
                id: props.match.params.id
            }
        }
    },
    name: "getBookQuery"
})(BookDetails);