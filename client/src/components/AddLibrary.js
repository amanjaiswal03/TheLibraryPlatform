import React, {Component} from 'react';
import {graphql, compose } from 'react-apollo';
import { addLibraryMutation,getLibrariesQuery, getLibraryByUserQuery} from '../queries/queries';
import {Redirect, Link} from 'react-router-dom'

import jwt_decode from 'jwt-decode'

class AddLibrary extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            address: '',
            membershipFee: '',
            userId: ''
        };
    }
    submitForm(e){
        e.preventDefault();
        console.log((jwt_decode(localStorage.usertoken))._id)
        this.props.addLibraryMutation({
            variables: {
                name: this.state.name,
                address: this.state.address,
                membershipFee: this.state.membershipFee,
                userId: (jwt_decode(localStorage.usertoken))._id
            },
            refetchQueries: [{ query: getLibrariesQuery, getLibraryByUserQuery }]
        });
        this.props.history.push(`/dashboard`)
    }
    render(){
        if(!localStorage.usertoken) return <Redirect to = '/login' />
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
                    <input type = "Number" onChange = {(e)=> {this.setState({membershipFee: e.target.value})}} required></input>
                </div>
                <button > Create library </button>
            </form>
        )
    }
}

export default compose(
    graphql(addLibraryMutation, {name: "addLibraryMutation"})
)(AddLibrary);