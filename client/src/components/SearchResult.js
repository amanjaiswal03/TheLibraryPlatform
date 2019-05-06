import React, {Component} from 'react';
import {getLibrariesQuery, getBooksQuery} from '../queries/queries';
import { graphql, compose } from 'react-apollo';

import {Link} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
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
        var bookList = this.props.getBooksQuery;

        if(bookList.loading){
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
                                <Link to = {'/book/' + book.id} key={book.id} className = "link">
                                    <div className = "result">
                                        <div className = "content">
                                            <div><strong>Book Name: </strong> {book.name}</div><br></br>
                                            <div><strong>Genre:</strong> {book.genre}</div><br></br>
                                            <div><strong>Author:</strong> {book.authorName}</div>
                                        </div>
                                        <div className = "action">
                                            <Button className = "info">More Info</Button>
                                        </div>

                                    </div>
                                </Link>
                        )
                    }
                )
            }  
        }
    }
    render(){
        return(
            <div id = "search-result">
                <form onSubmit = {this.submitForm.bind(this)}>
                    <div className= "search-box">
                    <input id = "search-input" className="search-input" placeholder="Search for books near you.." onChange = {(e)=> {this.setState({temp: e.target.value})}} required />
                    <SearchIcon type = "submit" className = "search-icon"/>
                </div>     
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