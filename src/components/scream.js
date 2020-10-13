import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../util/mybutton.js'
import DeleteScream from './deleteScream.js'
import noimg from '../images/no-img.png'
import elapsedTime from '../util/elapsedTime.js'

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
//import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

//Redux
import {connect } from 'react-redux'
import { likeScream, unlikeScream} from '../redux/action/dataAction.js'


const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image:{
    minWidth: 150
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}

class Scream extends Component {
  likedScream = () => {
    if(this.props.user.likes && this.props.user.likes.find(like => like.screamid === this.props.scream.screamid)){
      console.log(this.props.scream);
      console.log(this.props.user);
      return true;
    }
    return false;
  }
  handleLikeScream = () => {
    this.props.likeScream({
      screamid: this.props.scream.screamid,
      username: this.props.user.profile.username
    });
  }
  handleUnlikeScream = () => {
    this.props.unlikeScream({
      screamid: this.props.scream.screamid,
      username: this.props.user.profile.username
    });
  }
  render(){
    const {
      classes,
      scream: {
        body,
        createdat,
        avatar,
        username,
        screamid,
        likescount
      },
      user:
      {
        authenticated
      }
    } = this.props;
    const currentUser = this.props.user.profile.username;
    const likeButton = !authenticated?(
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary"/>
        </Link>
      </MyButton>):(
        this.likedScream()?(
          <MyButton tip="Undo like" onClick={this.handleUnlikeScream}>
            <FavoriteIcon color="primary"/>
          </MyButton>
        ):(
          <MyButton tip="Like" onClick={this.handleLikeScream}>
          <FavoriteBorder color="primary"/>
          </MyButton>
        )
      )

    const deleteButton = (authenticated && (username === currentUser))?(
      <DeleteScream screamid={screamid}/>
    ):null
    return(
      <Card className={classes.card}>
        <CardMedia image={avatar === null?noimg:avatar} title="Profile image" className={classes.image}/>
        <CardContent className={classes.content}>
          <Typography variant="h5" component={Link} to={`/users/${username}/`} color="primary">{username}</Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">{elapsedTime(createdat)}</Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likescount} Likes</span>
        </CardContent>
      </Card>
    )
  }
}


Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapActionsToProps = {
  likeScream,
  unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));
