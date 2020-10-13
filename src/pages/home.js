import React, { Component } from 'react'

//import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Profile from '../components/profile.js'
import Scream from '../components/scream.js'
import {connect } from 'react-redux'
import PropTypes from 'prop-types'
import {getScreams} from '../redux/action/dataAction.js'



class Home extends Component {
  componentDidMount(){
    this.props.getScreams();
  }
  render(){
    const {screams, loading} = this.props.data;
    let checkScreams = !loading?(
      screams.map(scream => <Scream key={scream.screamid} scream={scream}/>)
    ): (<h1 color="secondary"> Welcome To Scream!! A social media app where
      <br/><br/>you can scream your thoughts, and share them 
      <br/><br/>with your friends.</h1>);
    return(
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {checkScreams}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    data: state.data
})


const mapActionsToProps = {
    getScreams
}

export default connect(mapStateToProps, mapActionsToProps)(Home);
