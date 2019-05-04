import React, {Component} from 'react';
import {getLibrariesQuery} from '../queries/queries';
import { graphql } from 'react-apollo';

import {Link} from 'react-router-dom';

import Button from '@material-ui/core/Button';


class LibraryList extends Component{
    displayLibraries(){
        var data = this.props.data;
        if(data.loading){
            return (<div className = "result"> Loading libraries... </div>);
        }
        else if (data.libraries.length === 0){
            return (<div className = "result"> No Libraries </div>)
        } 
        else{
            return data.libraries.map(library => {
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
        console.log(this.props);
        return(
            <div>
                <ul className="libraries-list">
                    { this.displayLibraries() }
                </ul>
            </div>
        )
    }
}

export default graphql(getLibrariesQuery)(LibraryList);
