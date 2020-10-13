import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM,DELETE_SCREAM,POST_SCREAM,SET_ERRORS,LOADING_UI,CLEAR_ERRORS,DELETE_LIKE,ADD_LIKE} from '../types.js'
import axios from 'axios'



export const getScreams = () => (dispatch) => {
  dispatch({type: LOADING_DATA});
  axios.get('link to get screams')
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams
      });
    }).catch(err => {
      dispatch({
        type: SET_SCREAMS,
        payload: []
      })
    })
}


export const likeScream = (data) => (dispatch) => {
  axios.post(`link to like scream`, {username: data.username})
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: data
      });
      dispatch({
        type: ADD_LIKE,
        payload: data
      });
    }).catch(err => console.log(err))
}



export const unlikeScream = (data) => (dispatch) => {
  axios.post(`link to unlike a scream`, {username: data.username})
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: data
      });
      dispatch({
        type: DELETE_LIKE,
        payload: data
      });
    }).catch(err => console.log(err))
}


export const deleteScream = (screamid) => (dispatch) => {
  axios.delete(`link to delete scream`)
    .then(res => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamid
      });
    }).catch(err => console.log(err))
}


export const postScream = (newScream) => (dispatch) => {
  dispatch({type: LOADING_UI})
  axios.post('link to post scream/', newScream)
    .then(res => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data.scream
      });
      dispatch({
        type: CLEAR_ERRORS,
      });
    }).catch(err =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    );
}


export const clearErrors = () => (dispatch) => {
  dispatch({type: CLEAR_ERRORS})
}


export const getUserScreams = (username) => (dispatch) => {
  dispatch({type: LOADING_DATA})
  axios.get(`link to get all screams by username`)
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams
      });
    }).catch(err => dispatch({type: SET_SCREAMS,payload: null}))
}
