import React, {Component} from 'react';
import SearchIcon from '@material-ui/icons/Search';
//material component
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import NavBar from './layout/navbar';




class Homepage extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      redirect: false
    }
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to= {'search/' + this.state.search }/>
    }
  }

  submitForm(e){
    e.preventDefault();
    this.setState({
      redirect: true
    })
  }

  render(){
    return (
      <div className = "homepage">
        <div class = "search-section">
          <form onSubmit = {this.submitForm.bind(this)}>
            {this.renderRedirect()}
            <div className= "search-box">
                <input className="search-input" placeholder="Search for books near you...." onChange = {(e)=> {this.setState({search: e.target.value})}} required />
            </div>
          </form>
        </div>
      </div>
    );
  }
}



export default (Homepage);
