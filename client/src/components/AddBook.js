import React, {Component} from 'react';
import {graphql, compose } from 'react-apollo';
import { addBookMutation, addAuthorMutation, getBooksQuery, getAuthorsQuery, getAuthorQuery } from '../queries/queries';

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
        this.props.addAuthorMutation({
            variables: {
                name: this.state.authorName
            }
        });
        console.log(this.props.data);
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: "123"
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }
    render(){
        return(
            <form id = "add-book" onSubmit = {this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book Name:</label>
                    <input type = "text" onChange = {(e)=> {this.setState({name: e.target.value})}}></input>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type = "text" onChange = {(e)=> {this.setState({genre: e.target.value})}}></input>
                </div>
                <div className="field">
                    <label>Author Name:</label>
                    <input type = "text" onChange = {(e)=> {this.setState({authorName: e.target.value})}}></input>
                </div>
                <button> Add book </button>
            </form>
        )
    }
}

export default compose(
    graphql(addBookMutation, {name: "addBookMutation"}),
    graphql(addAuthorMutation, {name: "addAuthorMutation"}),
    graphql(getAuthorQuery, {
        options: (props) => {
            return {
                variables: {
                    id: props.Id
                }
            }
        }
    })
)(AddBook);