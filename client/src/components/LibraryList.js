import React, {Component} from 'react';
import {getLibrariesQuery} from '../queries/queries';
import { graphql } from 'react-apollo';

import {Link} from 'react-router-dom';

//material - ui component
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


class LibraryList extends Component{
    displayLibraries(){
        var data = this.props.data;
        if(data.loading){
            return (<div> Loading libraries... </div>);
        } else{
            return data.libraries.map(library => {
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
