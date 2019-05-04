import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { register } from './UserFunctions'
import Button from '@material-ui/core/Button';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            errors: null
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.id]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()

        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }

        register(user).then(res => {
            if (res.data.error) {
                this.setState({errors: res.data.error})
            }
            else {
                window.alert("Successfully registered")
                this.setState({errors: null})
                this.props.history.push(`/login`)
            }
        })
    }

    render() {
        if(localStorage.usertoken) return <Redirect to = '/' />
    return (
        <div id = "register">
          <div className = "create-title"> REGISTER </div>
          <div className="red-text center">
                  {this.state.errors ? <p> {this.state.errors} </p> : null }
          </div>
          <form id = "register-form" onSubmit={this.onSubmit}>
            <div className = "field">
              <label className = "liblabel" htmlFor="first name"> First name</label>
              <input
                className = "libfield"
                onChange={this.onChange}
                value={this.state.first_name}
                id="first_name"
                type="text"
                required
              />
            </div> 
            <div className = "field">
              <label className = "liblabel" htmlFor="last name"> Last name</label>
              <input
                className = "libfield"
                onChange={this.onChange}
                value={this.state.last_name}
                id="last_name"
                type="text"
                required
              />
            </div> 
            <div className = "field">
              <label className = "liblabel" htmlFor="email">Email</label><br></br>
              <input
                className = "libfield"
                onChange={this.onChange}
                value={this.state.email}
                id="email"
                type="email"
                pattern = ".+@.*.com"
                required
              />
            </div>
            <div className = "field">
              <label className = "liblabel" htmlFor="password">Password</label>
              <input
                className = "libfield"
                onChange={this.onChange}
                value={this.state.password}
                id="password"
                type="password"
                minLength= "6"
                required
              />
            </div>
            <Button className = "alllib" type = "submit">Register</Button>
          </form>
        </div>
        );
      }
}

export default Register