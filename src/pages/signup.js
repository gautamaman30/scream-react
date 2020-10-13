import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Appicon from '../images/icon.png'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

//redux
import {connect } from 'react-redux'
import {signupUser} from '../redux/action/userAction.js'



const styles = (theme) => ({
  ...theme.pallete,
  ...theme.spreadThis
});


class Signup extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {}
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.ui.errors){
      this.setState({errors: nextProps.ui.errors});
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      dob: this.state.dob,
      password: this.state.password,
      password2: this.state.password2
    }
    this.props.signupUser(data, this.props.history);
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render(){
    const classes = this.props.classes;
    const {ui: {loading}} = this.props;
    const {errors} = this.state;
    return(
      <Grid container className={classes.form}>
        <Grid item sm/>
        <Grid item sm>
          <img src={Appicon} alt="social" className={classes.images}/>
          <Typography variant="h2" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email" name="email" type="email" label="Email"
              className={classes.textField} value={this.state.email}
              helperText={errors.error} error={errors.error ? true: false}
              onChange={this.handleChange} fullWidth/>
            <TextField
              id="firstname" name="firstname" type="text"
              label="Firstname" className={classes.textField}
              value={this.state.firstname}
              helperText={errors.error} error={errors.error ? true: false}
              onChange={this.handleChange} fullWidth/>
            <TextField
              id="lastname" name="lastname" type="text" label="Lastname"
              className={classes.textField} value={this.state.lastname}
              helperText={errors.error} error={errors.error ? true: false}
              onChange={this.handleChange} fullWidth/>
            <TextField
              id="dob" name="dob" type="text"
              label="Date of Birth" className={classes.textField}
              placeholder="mm/dd/yyyy format" value={this.state.dob}
              helperText={errors.error} error={errors.error ? true: false}
              onChange={this.handleChange} fullWidth/>
            <TextField
              id="password" name="password" type="password"
              label="Password" className={classes.textField}
              value={this.state.password} helperText={errors.error}
              error={errors.error ? true: false}
              onChange={this.handleChange} fullWidth/>
            <TextField
              id="password2" name="password2" type="password"
              label="Confirtm Password" className={classes.textField}
              value={this.state.password2}
              helperText={errors.error} error={errors.error ? true: false}
              onChange={this.handleChange} fullWidth/>
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit" variant="contained"
              className={classes.button}
              disabled={loading}
              color="primary">
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
            </Button>
            <br />
            <small>Already have an account?&nbsp;Login<Link to="/login">&nbsp;here</Link></small>
          </form>
        </Grid>
        <Grid item sm/>
      </Grid>
    )
  }
}



Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui
})

const mapActionsToProps = {
  signupUser
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));
