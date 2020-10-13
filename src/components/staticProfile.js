import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import noimg from '../images/no-img.png'

//mui
import MuiLink from '@material-ui/core/Link'
//import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
//import LinkIcon from '@material-ui/icons/Link'
import withStyles from '@material-ui/core/styles/withStyles'


const styles = (theme) => ({
  ...theme.pallete,
  ...theme.spreadThis,
  paper: {
    padding: 20
  },
  profileStyle: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative'
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    }
  }
});

const StaticProfile = (props) => {
  const {classes, profile: {username, firstname, lastname, avatar, memoir}} = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profileStyle}>
        <div className="image-wrapper">
          <img src={avatar === null?noimg:avatar} alt="profile" className="profile-image"/>
        </div>
        <hr/>
        <div className="profile-details">
          <MuiLink component={Link} to={`/user/${username}/`} color="primary" variant="h5">
            {username}
          </MuiLink>
          <hr/>
          <Typography variant="body2">{firstname}&nbsp;{lastname}</Typography>
          <hr/>
          {memoir && <Typography variant="body2">Memoir:{memoir}</Typography>}
        </div>
      </div>
    </Paper>
  )
}


StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}


export default withStyles(styles)(StaticProfile);
