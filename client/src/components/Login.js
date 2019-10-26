import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { login } from './UserFunctions'
import Button from '@material-ui/core/Button';

class Login extends Component {
    constructor() {
        super()
        this.state = {
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
            email: this.state.email,
            password: this.state.password
        }

        login(user).then((res) => {
            console.log(res)
            if (res.data.error) {
                this.setState({errors: res.data.error})
            }
            else {
                this.setState({errors: null})
                this.props.history.push(`/`)
            }
        })
        
    }

    render() {
      if(localStorage.usertoken) {return <Redirect to = '/' />}
      return (
        <div id = "add-form">
          <div className = "create-title"> Login </div>
          <div className="form-error">
                  <div>{this.state.errors && this.state.errors.email ? <p> {this.state.errors.email} </p> : null }</div>
                  <div>{this.state.errors && this.state.errors.password ? <p> {this.state.errors.password} </p> : null }</div>
          </div>
          <form noValidate id = "auth-form" onSubmit={this.onSubmit}>
              <input
                className = "create-form"
                onChange={this.onChange}
                value={this.state.email}
                id="email"
                type="email"
                placeholder = "Email Address"
              />
              <input
                className = "create-form"
                onChange={this.onChange}
                value={this.state.password}
                id="password"
                type="password"
                placeholder = "Password"
              />
            <button className = "info" type = "submit">Login</button>
          </form>
      </div>
        );
      }
}

export default Login