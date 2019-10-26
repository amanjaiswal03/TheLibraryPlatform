import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';


class NavBar extends Component {

  constructor(props){
    super(props);
    
    this.state = {
        showMenuItem: true,
    };
};
  
  logOut (e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }
  showMenu_loggedOut(){
    if (this.state.showMenuItem){
      return(
        <div className = "menu-items">
          <div className = "menu">
            <Link to = '/' className = "link home">Home</Link>
            <Link to = '/libraries' className = "link all">All libraries</Link>
            <Link to = '/register' className = "link register">Register</Link>
            <Link to='/login' className="link login">Log In</Link>
            <Link to='/about' className="link about">About</Link>
          </div>
        </div>
      )
    }
  }
  showMenu_loggedIn(){
    if (this.state.showMenuItem){
      return(
        <div className = "menu-items">
          <div className = "menu">
            <Link to = '/' className = "link home">Home</Link>
            <Link to = '/libraries' className = "link all">All libraries</Link>
            <Link to = '/dashboard' className = "link dashboard">Your Library</Link>
            <Link to='/profile' className="link profile">Profile</Link>
            <div className = "link" onClick={this.logOut.bind(this)}>Logout</div>
          </div>
        </div>
      )
    }
  }
  
  
  render(){
    const loginRegLink = (
      <div className = "header">
          <div className = "menu-button">
            <i class="fas fa-bars" onClick = {()=> {this.setState({showMenuItem: !this.state.showMenuItem})}}></i>
            <Link to = '/' className = "title"> Chambers </Link>
          </div>
          {this.showMenu_loggedOut()}
      </div>
    )
    const userLink = (
      <div className = "header">
          <div className = "menu-button">
            <i class="fas fa-bars" onClick = {()=> {this.setState({showMenuItem: !this.state.showMenuItem})}}></i>
            <Link to = '/' className = "link title"> Chambers </Link>
          </div>
          {this.showMenu_loggedIn()}
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
