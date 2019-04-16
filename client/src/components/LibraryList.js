import React, {Component} from 'react';
import {getLibrariesQuery} from '../queries/queries';
import { graphql } from 'react-apollo';

import {Link} from 'react-router-dom';


class LibraryList extends Component{
    displayLibraries(){
        var data = this.props.data;
        if(data.loading){
            return (<div> Loading books... </div>);
        } else{
            return data.libraries.map(library => {
                return(
                    <Link to = {'/library/' + library.id} key={library.id}>
                        <li key = {library.id}>{library.name} <br></br> Address: {library.address} </li>
                        <br></br>
                    </Link>
                );
            })
        }
    }
    render(){
        console.log(this.props);
        return(
            <div>
                <ul id="libraries-list">
                    { this.displayLibraries() }
                </ul>
            </div>
        )
    }
}

export default graphql(getLibrariesQuery)(LibraryList);
