import React, {Component} from 'react';
import {getLibrariesQuery, getBooksQuery} from '../queries/queries';
import { graphql, compose } from 'react-apollo';

import {Link} from 'react-router-dom';

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
            return (<div className = "result"> Loading results... </div>);
        }
        else {
            var filtered = bookList.books.sort(function(a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }).filter((book) => { return book.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1});
            console.log(filtered);
            if (filtered.length === 0){
                return (<div className = "result"> Sorry, no books found </div>)
            }
            else{
                return filtered.map(book => {
                        return(
                                <Link to = {'/book/' + book.id} key={book.id} className = "link">
                                    <div className = "result">
                                        <div className = "content">
                                            <div> {book.name} </div><br></br>
                                            <div> by {book.authorName}</div>
                                        </div>
                                        <div className = "action">
                                            <div className = "info">More Info</div>
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
            <div id = "all-content">
                <form onSubmit = {this.submitForm.bind(this)}>
                    <div className= "search-box">
                    <input id = "search-input" className="search-input" placeholder="Search for books near you.." onChange = {(e)=> {this.setState({temp: e.target.value})}} required />
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