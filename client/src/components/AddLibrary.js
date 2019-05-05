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
            refetchQueries: [{ query: getLibrariesQuery, getLibraryByUserQuery}]
        });
        localStorage.setItem('newLibrary', "newLibrary")
        this.props.history.push(`/dashboard`);
        
    }
    render(){
        if(!localStorage.usertoken) return <Redirect to = '/login' />
        return(
            <div id = "add-library">
                <div className = "create-title"> CREATE YOUR LIBRARY </div>
                <form id = "add-library-form" onSubmit = {this.submitForm.bind(this)}>
                    <div className="field">
                        <label className = "liblabel">Name of the Library:</label>
                        <input className = "libfield" type = "text" onChange = {(e)=> {this.setState({name: e.target.value})}} required></input>
                    </div>
                    <div className="field">
                        <label className = "liblabel">Address:</label><br></br>
                        <input className = "libfield" type = "text" onChange = {(e)=> {this.setState({address: e.target.value})} } required></input>
                    </div>
                    <div className="field">
                        <label className = "liblabel">Membership Fee:</label>
                        <input className= "libfield-mem" type = "Number" onChange = {(e)=> {this.setState({membershipFee: e.target.value})}} required></input><span id = "currency"> $</span>
                    </div>
                    <Button className = "alllib" type = "submit">Create library</Button>
                </form>
            </div>
        )
    }
}

export default compose(
    graphql(addLibraryMutation, {name: "addLibraryMutation"})
)(AddLibrary);