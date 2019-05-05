import React, {Component} from 'react';
import {getBooksQuery, getLibrariesQuery, getLibraryByUserQuery, removeLibraryMutation, removeBooksInLibraryMutation} from '../queries/queries';
import { graphql, compose } from 'react-apollo';
import jwt_decode from 'jwt-decode'
import {Link, Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Dashboard extends Component{

    removeLibrary(library){
        return(
        <div className = "action">
            <Link to = {'/library/' + library.id} className = "link"><Button className = "info">More Info</Button></Link>
            <Button className = "info" id = "removeLibBtn" onClick = {()=> {
                    this.props.removeLibraryMutation({variables:{id: library.id}});
                    this.props.removeBooksInLibraryMutation({
                        variables:{id: library.id},
                        refetchQueries: [{ query: getBooksQuery, getLibrariesQuery }]}
                    );  
                    this.props.getLibraryByUserQuery.refetch();
                }
            }>Remove Library</Button>
        </div>
        )
    }

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
                        <div className = "result" key={library.id} >
                            <Link to = {'/library/' + library.id} key={library.id} className = "link">
                                <div className = "content">
                                    <div><strong>Library Name: </strong> {library.name}</div><br></br>
                                    <div><strong>Address:</strong> {library.address}</div><br></br>
                                    <div><strong>Membership Fee:</strong> {library.membershipFee}$</div>
                                </div>
                            </Link>
                            {this.removeLibrary(library)}
                        </div>
                );
            })
        }
    }
    render(){
        if(!localStorage.usertoken) return <Redirect to = '/login' />
        if(localStorage.newLibrary){
            localStorage.removeItem('newLibrary')
            this.props.getLibraryByUserQuery.refetch();
        } 
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

export default compose( graphql(getLibraryByUserQuery, {
    options: () => {
        return {
            variables: {
                id: jwt_decode(localStorage.usertoken)._id
            }
        }
    },
    name: "getLibraryByUserQuery",
}), graphql(removeLibraryMutation, {name: "removeLibraryMutation"}),  graphql(removeBooksInLibraryMutation, {name: "removeBooksInLibraryMutation"}))
(Dashboard);
