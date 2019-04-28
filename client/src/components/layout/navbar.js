import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';


class NavBar extends Component {
  
  logOut (e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }
  
  
  render(){
    const loginRegLink = (
      <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" >
          <Link to = '/' className = "link">The Library Platform </Link>
          </Typography>
          <Button color="inherit">About</Button>
          <Button color="inherit"><Link to = '/addLibrary' className = "link">Create your library</Link></Button>
          <Button color="inherit"><Link to = '/register' className = "link">Register</Link></Button>
          <Button color="inherit"><Link to = '/login' className = "link">Log In</Link></Button>
        </Toolbar>
      </AppBar>
    </div>
    )
    const userLink = (
      <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" >
          <Link to = '/' className = "link">The Library Platform </Link>
          </Typography>
          <Button color="inherit">About</Button>
          <Button color="inherit"><Link to = '/addLibrary' className = "link">Create your library</Link></Button>
          <Button color="inherit">Your Library</Button>
          <Button color="inherit"><Link to = '/profile' className = "link">Profile</Link></Button>
          <Button color="inherit" onClick={this.logOut.bind(this)}>Logout</Button>
        </Toolbar>
      </AppBar>
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
