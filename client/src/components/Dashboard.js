import React, {Component} from 'react';
import {getLibraryByUserQuery} from '../queries/queries';
import { graphql, compose } from 'react-apollo';
import jwt_decode from 'jwt-decode'
import {Link, Redirect} from 'react-router-dom';
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
                    <Link to = {'/library/' + library.id} key={library.id} className = "link">
                        <div className = "result">
                            <div className = "content">
                                <div><strong>Library Name: </strong> {library.name}</div><br></br>
                                <div><strong>Address:</strong> {library.address}</div><br></br>
                                <div><strong>Membership Fee:</strong> {library.membershipFee}$</div>
                            </div>
                            <div className = "action">
                                <Button className = "info">More Info</Button>
                            </div>
                        </div>
                    </Link>
                );
            })
        }
    }
    render(){
        if(!localStorage.usertoken) return <Redirect to = '/login' />
        return (
            <div>
                <Link to = {'/addLibrary'} className = "link"><Button className = "alllib add"> Add a new library </Button></Link>
                <ul className="libraries-list">
                    { this.displayLibraries() }
                </ul>
            </div>
        )
    }
}

export default compose(graphql(getLibraryByUserQuery, {
    options: () => {
        return {
            variables: {
                id: jwt_decode(localStorage.usertoken)._id
            }
        }
    },
    name: "getLibraryByUserQuery",
})
)(Dashboard);
