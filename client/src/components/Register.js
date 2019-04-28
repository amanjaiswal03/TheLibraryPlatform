import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { register } from './UserFunctions'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            errors: ''
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
            if (res.error) {
                this.setState({errors: res.error})
                window.alert(this.state.errors);
            }
            else {
                window.alert("Successfully registered")
                this.props.history.push(`/login`)
            }
        })
    }

    render() {
    return (
          <div className="container">
            <div className="row">
              <div className="col s8 offset-s2">
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <h4>
                    <b>Register</b> below
                  </h4>
                  <p className="grey-text text-darken-1">
                    Already have an account? <Link to="/login">Log in</Link>
                  </p>
                </div>
                <form onSubmit={this.onSubmit}>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.first_name}
                      id="first_name"
                      type="text"
                      required
                    />
                    <label htmlFor="first name"> First name</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.last_name}
                      id="last_name"
                      type="text"
                      required
                    />
                    <label htmlFor="last name"> Last name</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.email}
                      id="email"
                      type="email"
                      pattern = ".+@.*.com"
                      required
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.password}
                      id="password"
                      type="password"
                      minLength= "6"
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}
                      type="submit"
                      className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      }
}

export default Register