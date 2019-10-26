import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
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
                this.setState({errors: res.data.error});
                document.documentElement.scrollTop = 0;
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
        <div id = "add-form">
          <div className = "create-title"> Register </div>
          <div className="form-error">
            <div>{this.state.errors && this.state.errors.first_name ? <p> {this.state.errors.first_name} </p> : null }</div>
            <div>{this.state.errors && this.state.errors.last_name ? <p> {this.state.errors.last_name} </p> : null }</div>
            <div>{this.state.errors && this.state.errors.email ? <p> {this.state.errors.email} </p> : null }</div>
            <div>{this.state.errors && this.state.errors.password ? <p> {this.state.errors.password} </p> : null }</div>
          </div>
          <form noValidate id = "auth-form" onSubmit={this.onSubmit}>
              <input
                className = "create-form"
                onChange={this.onChange}
                value={this.state.first_name}
                placeholder="First name"
                id= "first_name"
                type="text"
              />
              <input
                className = "create-form"
                onChange={this.onChange}
                value={this.state.last_name}
                placeholder="Last name"
                id = "last_name"
                type="text"
              />
              <input
                className = "create-form"
                onChange={this.onChange}
                value={this.state.email}
                placeholder="Email Address"
                id= "email"
                type="email"
              />
              <input
                className = "create-form"
                onChange={this.onChange}
                value={this.state.password}
                placeholder="Password"
                id= "password"
                type="password"
              />
            <button className = "info" type = "submit">Register</button>
          </form>
        </div>
        );
      }
}

export default Register