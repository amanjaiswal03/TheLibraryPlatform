import React, {Component} from 'react';
import {getLibrariesQuery} from '../queries/queries';
import { graphql } from 'react-apollo';

import {Link} from 'react-router-dom';
//components
import LibraryDetails from './LibraryDetails';
import AddBook from './AddBook';

class LibraryList extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }
    displayLibraries(){
        var data = this.props.data;
        if(data.loading){
            return (<div> Loading books... </div>);
        } else{
            return data.libraries.map(library => {
                return(
                    <Link to = {'/library/' + library.id} key={library.id}>
                        <li key = {library.id} onClick = {(e) => this.setState({selected: library.id})}>{library.name} <br></br> {library.address} </li>
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
