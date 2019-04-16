import React, {Component} from 'react';
import {graphql, compose } from 'react-apollo';
import { addLibraryMutation,getLibrariesQuery} from '../queries/queries';

class AddLibrary extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            address: '',
            membershipFee: ''
        };
    }
    submitForm(e){
        e.preventDefault();
        this.props.addLibraryMutation({
            variables: {
                name: this.state.name,
                address: this.state.address,
                membershipFee: this.state.membershipFee
            },
            refetchQueries: [{ query: getLibrariesQuery }]
        })
    }
    render(){
        return(
            <form id = "add-library" onSubmit = {this.submitForm.bind(this)}>
                <div className="field">
                    <label>Library Name:</label>
                    <input type = "text" onChange = {(e)=> {this.setState({name: e.target.value})}} required></input>
                </div>
                <div className="field">
                    <label>Address:</label>
                    <input type = "text" onChange = {(e)=> {this.setState({address: e.target.value})} } required></input>
                </div>
                <div className="field">
                    <label>MembershipFee:</label>
                    <input type = "text" onChange = {(e)=> {this.setState({membershipFee: e.target.value})}} required></input>
                </div>
                <button> Create library </button>
            </form>
        )
    }
}

export default compose(
    graphql(addLibraryMutation, {name: "addLibraryMutation"})
)(AddLibrary);