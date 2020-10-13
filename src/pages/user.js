import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import {Link} from 'react-router-dom'
//import MyButton from '../util/mybutton.js'
import axios from 'axios'
import Scream from '../components/scream.js'
import StaticProfile from '../components/staticProfile.js'

//mui
import Grid from '@material-ui/core/Grid'

//Redux
import {connect } from 'react-redux'
import { getUserScreams} from '../redux/action/dataAction.js'


class User extends Component {
  state = {
    profile: null,
  }
  componentDidMount(){
    const username = this.props.match.params.username;

    this.props.getUserScreams(username);
    axios.get(`link to get user screams`)
      .then(res => {
        this.setState({
          profile: res.data.profile
        })
      })
      .catch(err => console.log(err));
  }
  handleLogout = () => {
    this.props.logoutUser();
  }
  handleImageChange = (event) => {
    const image = event.target.files[0];
    //send to server
    const formData = new FormData();
    formData.append('avatar', image, image.name);
    this.props.updloadAvatar(formData);
  }
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click()
  }

  render(){
    const {screams, loading} = this.props.data;

    const screamsMarkup = loading?(
      <p>Loading...</p>
    ):(
      screams === null?(
        <p>No screams for this users</p>
      ) : (
        screams.map(scream => <Scream key={scream.screamid} scream={scream}/>)
      ));
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={8} xs={12}>
          {this.state.profile === null?(
            <p>Loading...</p>
          ) : (
            <StaticProfile profile={this.state.profile}/>
          )}
        </Grid>
      </Grid>
    );
  }
}


User.propTypes = {
  getUserScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data,
})

const mapActionsToProps = {
  getUserScreams
}


export default connect(mapStateToProps, mapActionsToProps)(User);
