import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
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
          <Paper className= "root" elevation={1}>
              <InputBase className="input" placeholder="Search for books or libraries near you.." onChange = {(e)=> {this.setState({search: e.target.value})}} required/>
              <IconButton className= "iconButton" aria-label="Search">
                  <SearchIcon />
              </IconButton>
          </Paper>
          <Button className = "search"> <Link to = {"search/" + this.state.search} className = "link" >Search </Link></Button>
        </form>
        <Link to = "libraries" className = "link"><Button className = "alllib"> All libraries Near you </Button></Link>
      </div>
    );
  }
}



export default (Homepage);
