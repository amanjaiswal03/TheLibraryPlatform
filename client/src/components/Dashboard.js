import React, {Component} from 'react';
import {getLibraryByUserQuery} from '../queries/queries';
import { graphql, compose } from 'react-apollo';
import jwt_decode from 'jwt-decode'
import {Link, Redirect} from 'react-router-dom';

//material - ui component
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Dashboard extends Component{
    displayLibraries(){
        var data = this.props.getLibraryByUserQuery;
        console.log(data)
        if (!data.user){
            return <div> No Library yet </div>
        }
        else if(data.loading){
            return (<div> Loading libraries... </div>);
        } else{
            return data.user.library.map(library => {
                return(
                    <Link to = {'/library/' + library.id} key={library.id}>
                        <Card id = "liblist">
                            <CardContent>
                                <Typography variant="h5" component="h2">{library.name} </Typography> 
                                <Typography component="p"> Address: {library.address}  </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Details</Button>
                            </CardActions>
                        </Card>
                    </Link>
                );
            })
        }
    }
    render(){
        if(!localStorage.usertoken) return <Redirect to = '/login' />
        return (
            <div>
                <Link to = {'/addLibrary'} className = "link"><Button> Add a new library </Button></Link>
                <ul className="libraries-list">
                    { this.displayLibraries() }
                </ul>
            </div>
        )
    }
}

export default compose(graphql(getLibraryByUserQuery, {
    options: (props) => {
        return {
            variables: {
                id: jwt_decode(localStorage.usertoken)._id
            }
        }
    },
    name: "getLibraryByUserQuery",
})
)(Dashboard);
