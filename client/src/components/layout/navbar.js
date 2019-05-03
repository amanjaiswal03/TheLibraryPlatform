import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';


class NavBar extends Component {
  
  logOut (e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }
  
  
  render(){
    const loginRegLink = (
      <div className = "header">
          <Link to = '/' className = "link title">The Library Platform </Link>
          <Link to = '/' className = "link about">About</Link>
          <Link to = '/addLibrary' className = "link create">Create your library</Link>
          <Link to = '/register' className = "link register">Register</Link>
          <Link to='/login' className="link login">Log In</Link>
      </div>
    )
    const userLink = (
      <div className = "header">
          <Link to = '/' className = "link title">The Library Platform </Link>
          <Link to = '/' className = "about">About</Link>
          <Link to = '/addLibrary' className = "link create">Create your library</Link>
          <Link to = '/dashboard' className = "link dash">Your Library</Link>
          <Link to = '/profile' className = "link profile">Profile</Link>
          <button className = "logout" onClick={this.logOut.bind(this)}>Logout</button>
      </div>
    )

    return (
      <div>
        {localStorage.usertoken ? userLink : loginRegLink}
      </div>

    )

  }
}


export default withRouter(NavBar);
