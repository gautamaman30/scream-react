import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, ADD_LIKE,DELETE_LIKE} from '../types.js'


const initialState = {
  authenticated: false,
  profile: {},
  likes: [],
  loading: false
}


export default function(state = initialState, action){
  switch(action.type){
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case ADD_LIKE:
      if(!state.likes) state.likes = [];
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            username: state.profile.username,
            screamid: action.payload.screamid
          }
        ]
      };
    case DELETE_LIKE:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.screamid !== action.payload.screamid
        )
      };
    default:
      return state
  }
}
