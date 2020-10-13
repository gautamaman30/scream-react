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


//Redux
import {connect } from 'react-redux'
import {loginUser} from '../redux/action/userAction.js'


const styles = (theme) => ({
  ...theme.pallete,
  ...theme.spreadThis
});


class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
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
      password: this.state.password
    }
    this.props.loginUser(data, this.props.history);
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render(){
    const {
      classes,
      ui: {loading}
    } = this.props;
    const {errors} = this.state;
    return(
      <Grid container className={classes.form}>
        <Grid item sm/>
        <Grid item sm>
          <img src={Appicon} alt="social" className={classes.images}/>
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField id="email" name="email" type="email" label="Email" className={classes.textField}
              value={this.state.email} helperText={errors.error} error={errors.error ? true: false} onChange={this.handleChange} fullWidth/>
            <TextField id="password" name="password" type="password" label="Password" className={classes.textField}
              value={this.state.password} helperText={errors.error} error={errors.error ? true: false} onChange={this.handleChange} fullWidth/>
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
            )}
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
              Login
              {loading && (<CircularProgress size={30} className={classes.progress}/>)}
            </Button>
            <br />
            <small>Don't have an Account? &nbsp; Signup<Link to="/signup">&nbsp;here</Link></small>
          </form>
        </Grid>
        <Grid item sm/>
      </Grid>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui
})

const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));
