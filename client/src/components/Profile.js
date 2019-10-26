import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: ''
        }
    }

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        console.log(decoded);
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email,
        })
    }

    render () {
        if(!localStorage.usertoken) {return <Redirect to = '/' />}
        return (
            <div id = "all-content">
            <div className = "header-title"> Your Profile </div>
            <div className = "profilepage">
                <div className = "create-form"><strong>First Name:</strong> {this.state.first_name} </div><br></br>
                <div className = "create-form"><strong>Last Name:</strong> {this.state.last_name} </div><br></br>
                <div className = "create-form"><strong>Email: </strong>{this.state.email} </div><br></br>
            </div>
            </div>
        )
    }
}

export default Profile