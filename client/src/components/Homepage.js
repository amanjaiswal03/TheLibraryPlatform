import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
//material component
import Button from '@material-ui/core/Button';
import { Link} from 'react-router-dom';


const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 900,
    height: 60
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  }
};

function Homepage(props) {
  const { classes } = props;
    return (
      <div className = "homepage">
          <Paper className={classes.root} elevation={1}>
              <InputBase className={classes.input} placeholder="Search for books or libraries near you.." />
              <IconButton className={classes.iconButton} aria-label="Search">
                  <SearchIcon />
              </IconButton>
          </Paper>
          <Link to = "libraries" className = "link"><Button className = "alllib"> All libraries Near you </Button></Link>
      </div>
    );
  }

Homepage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Homepage);
