import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER} from '../types.js'
import axios from 'axios'


export const loginUser = (userData, history) => (dispatch) => {
  dispatch({type: LOADING_UI});
  axios.post('link to login', userData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData(userData.email));
      dispatch({type: CLEAR_ERRORS});
      history.push('/');
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    })
}


export const signupUser = (newUserData, history) => dispatch => {
  dispatch({type: LOADING_UI});
  axios.post('link to signup', newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData(newUserData.email));
      dispatch({type: CLEAR_ERRORS});
      history.push('/');
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    })
}


export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('AuthToken');
  delete axios.defaults.headers.common['Authoraization'];
  dispatch({type: SET_UNAUTHENTICATED});
}


export const getUserData = (username) => (dispatch) => {
  dispatch({type: LOADING_USER});
  axios.get(`link to get profile`)
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err))
}

export const editUserDetails = (userDetails, username) => (dispatch) => {
  dispatch({type: LOADING_USER});
  axios.put('link to edit profile', userDetails)
    .then(res => {
      dispatch(getUserData(res.data.profile.username));
    })
    .catch(err => console.log(err));
}


export const updloadAvatar = (formData, username) => (dispatch) => {
  dispatch({type: LOADING_USER});
  axios.post(`link to upload avatar`,formData)
    .then(res => {
      dispatch(getUserData(username));
    })
    .catch(err => console.log(err));
}

const setAuthorizationHeader = (token) => {
  const AuthToken = `Bearer ${token}`;
  localStorage.setItem('AuthToken', AuthToken);
  axios.defaults.headers.common['Authorization'] = AuthToken;
};
