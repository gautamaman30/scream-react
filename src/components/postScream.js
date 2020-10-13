import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'
//import {Link} from 'react-router-dom'
import MyButton from '../util/mybutton.js'
import noimg from '../images/no-img.png'

//mui
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
//import DialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
//Redux
import {connect } from 'react-redux'
import { postScream, clearErrors} from '../redux/action/dataAction.js'


const styles = (theme) => ({
  ...theme.pallete,
  ...theme.spreadThis,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    postition: 'absolute',
    left: '41%',
    top: '10%'
  }
})



class PostScream extends Component {
  state = {
    body: '',
    errors: {},
    open: false
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.ui.errors){
      this.setState({
        errors: nextProps.ui.errors
      });
    }
    if(!nextProps.ui.errors && !nextProps.ui.loading){
      this.setState({
        body:'',
        open: false,
        errors: {}
      })
    }
  }
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.props.clearErrors();
    this.setState({open: false, errors: {}});
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.body === ''){
      this.handleClose();
      return;
    }
    this.props.postScream({body: this.state.body, username: this.props.profile.username, avatar: (this.props.profile.avatar === noimg?null:this.props.profile.avatar)});
  }
  render(){
    const errors = this.state.errors;
    const {classes, ui: {loading}} = this.props;
    return(
      <Fragment>
        <MyButton tip="Post scream" onClick={this.handleOpen} btnClassName={classes.button}>
          <AddIcon/>
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <MyButton tip="Cancel" onClick={this.handleClose} tipClassName={classes.closeButton}>
            <CloseIcon/>
          </MyButton>
          <DialogTitle>Post a new scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField name="body" type="text" label="Scream" multiline rows="3" placeholder="Scream here!!" error={errors.body?true:false} helperText={errors.body}className={classes.textField} onChange={this.handleChange} fullWidth/>
              <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                Submit
                {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>)}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}



PostScream.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  postScream: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.user.profile,
  ui: state.ui
})

const mapActionsToProps = {
  postScream,clearErrors
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostScream));
