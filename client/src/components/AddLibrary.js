import React, {Component} from 'react';
import {graphql, compose } from 'react-apollo';
import { addLibraryMutation,getLibrariesQuery, getLibraryByUserQuery} from '../queries/queries';
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';

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
            refetchQueries: [{ query: getLibrariesQuery}, {query: getLibraryByUserQuery, variables:{id: jwt_decode(localStorage.usertoken)._id}}]
        }).then(()=> {
            localStorage.setItem('newLibrary', "newLibrary")
            this.props.history.push(`/dashboard`);
        });
        
        
    }
    render(){
        if(!localStorage.usertoken) return <Redirect to = '/login' />
        return(
            <div id = "add-form">
                <div className = "create-title"> Create your library </div>
                <form id = "add-library-form" onSubmit = {this.submitForm.bind(this)}>
                        <input className = "create-form" type = "text" placeholder= "Name of the library" onChange = {(e)=> {this.setState({name: e.target.value})}} required></input>
                        <input className = "create-form" type = "text" placeholder = "Address" onChange = {(e)=> {this.setState({address: e.target.value})} } required></input>
                        <input className= "create-form" type = "Number" placeholder = "Membership fee in dollars" onChange = {(e)=> {this.setState({membershipFee: e.target.value})}} required></input>
                    <button className = "info" type = "submit">Create library</button>
                </form>
            </div>
        )
    }
}

export default compose(
    graphql(addLibraryMutation, {name: "addLibraryMutation"})
)(AddLibrary);