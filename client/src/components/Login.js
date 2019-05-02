import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { login } from './UserFunctions'

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
          <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
              <div className="col s8 offset-s2">
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <h4>
                    <b>Login</b> below
                  </h4>
                  <p className="grey-text text-darken-1">
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                </div>
                <form onSubmit={this.onSubmit}>
                  <div className="input-field col s12">
                    <input
                      onChange={this.onChange}
                      value={this.state.email}
                      id="email"
                      type="email"
                      pattern=".+@.*.com"
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
                      Login
                    </button>
                    <div className="red-text center">
                        {this.state.errors ? <p> {this.state.errors} </p> : null }
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      }
}

export default Login