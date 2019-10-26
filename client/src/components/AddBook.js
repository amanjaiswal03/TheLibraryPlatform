import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';
import { addBookMutation, addAuthorMutation, getBooksQuery} from '../queries/queries';
import Button from '@material-ui/core/Button';



class AddBook extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            name: '',
            genre: '',
            authorName: ''
        };
    };
    submitForm(e){
        e.preventDefault();
        console.log(this.props);
        this.props.addAuthorMutation({
            variables: {
                name: this.state.authorName,
            }
        });
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorName: this.state.authorName,
                librariesId:this.props.libraryId 
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
        this.props.getLibraryQuery.refetch();
        document.getElementById("add-book-form").reset();
        document.documentElement.scrollTop = 0;
        window.alert("book successfully added");

    }
    render(){
        return(
            <div id = "add-book">
            <div className = "create-title add-book"> Add more book </div>
            <form id = "add-book-form" onSubmit = {this.submitForm.bind(this)}>
                    <input className = "create-form" placeholder = "Name of the book" type = "text" onChange = {(e)=> {this.setState({name: e.target.value})}} required></input>
                    <input  className = "create-form" placeholder = "Genre" type = "text" onChange = {(e)=> {this.setState({genre: e.target.value})}} required></input>
                    <input  className = "create-form" placeholder = "Author Name" type = "text" onChange = {(e)=> {this.setState({authorName: e.target.value})}} required></input>
                <button className = "info" type = "submit">Add Book</button>
            </form>
            </div>
        )
    }
}

export default compose(
    graphql(addBookMutation, {name: "addBookMutation"}),
    graphql(addAuthorMutation, {name: "addAuthorMutation"})
    
)(AddBook);