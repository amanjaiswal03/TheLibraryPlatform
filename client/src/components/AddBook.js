import React, {Component} from 'react';
import {graphql, compose } from 'react-apollo';
import { addBookMutation, addAuthorMutation} from '../queries/queries';




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
            }
        });
        this.props.fetch.refetch();

    }
    render(){
        return(
            <form id = "add-book" onSubmit = {this.submitForm.bind(this)}>
                <h3> Add Book To This Library</h3>
                <div className="field">
                    <label>Book Name:</label>
                    <input type = "text" onChange = {(e)=> {this.setState({name: e.target.value})}} required></input>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type = "text" onChange = {(e)=> {this.setState({genre: e.target.value})}} required></input>
                </div>
                <div className="field">
                    <label>Author Name:</label>
                    <input type = "text" onChange = {(e)=> {this.setState({authorName: e.target.value})}} required></input>
                </div>
                <button> Add book </button>
            </form>
        )
    }
}

export default compose(
    graphql(addBookMutation, {name: "addBookMutation"}),
    graphql(addAuthorMutation, {name: "addAuthorMutation"})
    
)(AddBook);