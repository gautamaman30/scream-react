import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import MyButton from '../util/mybutton.js'
import noimg from '../images/no-img.png'
import EditDetails from './editDetails.js'

//mui
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

//Redux
import {connect } from 'react-redux'
import { logoutUser, updloadAvatar} from '../redux/action/userAction.js'


const styles = (theme) => ({
  paper: {
    padding: 20
  },
  profileStyle: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
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
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
});

class Profile extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  }
  handleImageChange = (event) => {
    const image = event.target.files[0];
    //send to server
    const formData = new FormData();
    formData.append('avatar', image, image.name);
    this.props.updloadAvatar(formData, this.props.user.profile.username);
  }
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click()
  }
  render(){
    const classes = this.props.classes;
    const {user:{
      profile: { username, firstname, lastname, avatar,memoir},
      loading,
      authenticated
    }} = this.props;
    const profileMarkup = !loading? (
      authenticated?(
        <Paper className={classes.paper}>
          <div className={classes.profileStyle}>
            <div className="image-wrapper">
              <img src={avatar === null?noimg:avatar} alt="profile" className="profile-image"/>
              <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>
              <MyButton tip="Edit profile" onClick={this.handleEditPicture} btnClassName="button">
                <EditIcon color="primary"/>
              </MyButton>
            </div>
            <hr/>
            <div className="profile-details">
              <MuiLink component={Link} to={`/users/${username}`} color="primary" variant="h5">
                {username}
              </MuiLink>
              <hr/>
              <Typography variant="body2">{firstname}&nbsp;{lastname}</Typography>
              <hr/>
              {memoir && <Typography variant="body2">Memoir:{memoir}</Typography>}
            </div>
            <MyButton tip="Logout" onClick={this.handleLogout}>
              <KeyboardReturn color="primary"/>
            </MyButton>
            <EditDetails />
          </div>
        </Paper>
      ):(
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">No profile found, please login again</Typography>
          <div className={classes.buttons}>
            <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
            <Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
          </div>
        </Paper>
      )):(<p> Loading...</p>);

    return profileMarkup;
  }
}


Profile.propTypes = {
  updloadAvatar: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = {
  logoutUser, updloadAvatar
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
