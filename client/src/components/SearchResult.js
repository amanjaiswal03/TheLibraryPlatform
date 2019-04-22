import React, {Component} from 'react';
import {getLibrariesQuery, getBooksQuery} from '../queries/queries';
import { graphql, compose } from 'react-apollo';

import {Link} from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

//material - ui component
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class SearchResult extends Component{
    constructor(props){
        super(props);
        this.state = {
            search : this.props.match.params.query,
            redirect: false,
            temp : ''
        }
    }
    
      submitForm(e){
        e.preventDefault();
        this.setState({
          search: this.state.temp
        })
      }
    displayResult(){
        console.log(this.props);
        var libraryList = this.props.getLibrariesQuery;
        var bookList = this.props.getBooksQuery;

        if(bookList.loading || libraryList.loading){
            return (<div> Loading results... </div>);
        }
        else {
            var filtered = bookList.books.sort(function(a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }).filter((book) => { return book.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1});
            console.log(filtered);
            if (filtered.length === 0){
                return (<h1> No results found </h1>)
            }
            else{
                return filtered.map(book => {
                        return(
                                <Link to = {'/book/' + book.id} key={book.id}>
                                    <Card id = "booklist">
                                        <CardContent>
                                            <Typography variant="h5" component="h2">{book.name} </Typography> 
                                            <Typography component="p"> Genre: {book.genre}  </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Details</Button>
                                        </CardActions>
                                    </Card>
                                </Link>
                        )
                    }
                )
            }  
        }
    }
    render(){
        return(
            <div>
            <form onSubmit = {this.submitForm.bind(this)}>
                <Paper className= "root" elevation={1}>
                    <InputBase className="input" placeholder="Search for books ..." onChange = {(e)=> {this.setState({temp: e.target.value})}} />
                    <IconButton className= "iconButton" aria-label="Search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Button className = "search" type = "submit"> Search </Button>
            </form>
            <div className="results">
                {this.displayResult()}
            </div>
            </div>
        )
    }


}

export default compose(
    graphql(getLibrariesQuery, {name: "getLibrariesQuery"}),
    graphql(getBooksQuery, {name: "getBooksQuery"} ),
) (SearchResult);