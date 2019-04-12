import React, {Component} from 'react';
import {getLibrariesQuery} from '../queries/queries';
import { graphql } from 'react-apollo';

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
                    <li key = {library.id} onClick = {(e) => this.setState({selected: library.id})}>{library.name} <br></br> {library.address} </li>
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
                <LibraryDetails libraryId={ this.state.selected } />
                <AddBook />
            </div>
        )
    }
}

export default graphql(getLibrariesQuery)(LibraryList);
