import React, {Component} from 'react';
import {graphql, compose } from 'react-apollo';
import { addLibraryMutation,getLibrariesQuery} from '../queries/queries';
import {Redirect} from 'react-router-dom'

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
    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        console.log(decoded);
        this.setState({
            userId: decoded.id
        })
    }
    submitForm(e){
        e.preventDefault();
        this.props.addLibraryMutation({
            variables: {
                name: this.state.name,
                address: this.state.address,
                membershipFee: this.state.membershipFee,
                userId: this.state.userId
            },
            refetchQueries: [{ query: getLibrariesQuery }]
        })
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
                <button> Create library </button>
            </form>
        )
    }
}

export default compose(
    graphql(addLibraryMutation, {name: "addLibraryMutation"})
)(AddLibrary);