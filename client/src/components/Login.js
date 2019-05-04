import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
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
            //console.log(res)
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
        <div id = "login">
        <div className = "create-title"> LOGIN </div>
        <div className="red-text center">
                {this.state.errors ? <p> {this.state.errors} </p> : null }
        </div>
        <form id = "login-form" onSubmit={this.onSubmit}>
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
          <Button className = "alllib" type = "submit">Login</Button>
        </form>
      </div>
        );
      }
}

export default Login