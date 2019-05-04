import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
//material component
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';




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
        <form onSubmit = {this.submitForm.bind(this)}>
          {this.renderRedirect()}
          <div className= "search-box">
              <input className="search-input" placeholder="Search for books near you.." onChange = {(e)=> {this.setState({search: e.target.value})}} required />
              <SearchIcon className = "search-icon"/>
          </div>
        </form>
        <Button className = "alllib"> <Link to = "libraries" className = "link">All libraries Near you </Link></Button>
      </div>
    );
  }
}



export default (Homepage);
