import {SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM,POST_SCREAM} from '../types.js'


const initialState = {
    screams: [],
    scream: {},
    loading: false
}

export default function(state = initialState, action){
  switch(action.type){
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case LIKE_SCREAM:
      let index = state.screams.findIndex((scream) => scream.screamid === action.payload.screamid);
      state.screams[index].likescount += 1;
      return {
        ...state
      };
    case UNLIKE_SCREAM:
      let ind = state.screams.findIndex((scream) => scream.screamid === action.payload.screamid);
      state.screams[ind].likescount -= 1;
      return {
        ...state
      };
    case DELETE_SCREAM:
      let i = state.screams.findIndex(scream => scream.screamid === action.payload);
      state.screams.splice(i,1);
      return {
        ...state
      }
    case POST_SCREAM:
      return {
        ...state,
        screams: [
          action.payload,
          ...state.screams
        ]
      }
    default:
      return state
  }
}
