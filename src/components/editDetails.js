import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import MyButton from '../util/mybutton.js'

//mui
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import EditIcon from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField'
//Redux
import {connect } from 'react-redux'
import { editUserDetails } from '../redux/action/userAction.js'


const styles = (theme) => ({
  ...theme.pallete,
  ...theme.spreadThis,
  button: {
    float: 'right'
  }
})




class EditDetails extends Component {
  state = {
    firstname: '',
    lastname: '',
    memoir: '',
    open: false
  }
  mapUserDetailsToState = (profile) => {
    this.setState({
      firstname: profile.firstname,
      lastname: profile.lastname,
      memoir: profile.memoir?profile.memoir : ''
    });
  }
  handleOpen = () => {
    this.setState({open: true});
    this.mapUserDetailsToState(this.props.profile);
  }
  handleClose = () => {
    this.setState({open: false});
  }
  componentDidMount(){
    const { profile } = this.props;
    this.mapUserDetailsToState(profile);
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = () => {
    const userDetails = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      memoir: this.state.memoir,
    }
    this.props.editUserDetails(userDetails, this.props.profile.username);
    this.handleClose();
  }
  render(){
    const classes = this.props.classes;
    return(
      <Fragment>
        <MyButton tip="Edit details" onClick={this.handleOpen} btnClassName={classes.button}>
          <EditIcon color="primary"/>
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField name="firstname" type="text" label="Firstname" className={classes.textField} value={this.state.firstname} onChange={this.handleChange} fullWidth/>
              <TextField name="lastname" type="text" label="Lastname" className={classes.textField} value={this.state.lastname} onChange={this.handleChange} fullWidth/>
              <TextField name="memoir" type="text" label="memoir" className={classes.textField} placeholder="A short bio" value={this.state.memoir} multiline rows="3" onChange={this.handleChange} fullWidth/>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">Cancel</Button>
            <Button onClick={this.handleSubmit} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}



EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.user.profile
})

const mapActionsToProps = {
  editUserDetails
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails));
