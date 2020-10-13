import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import dataReducer from './reducers/dataReducer.js'
import userReducer from './reducers/userReducer.js'
import uiReducer from './reducers/uiReducer.js'
import thunk from 'redux-thunk'



const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer
})

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
