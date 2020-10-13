import React, { Component }from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import Home from './pages/home.js'
import Signup from './pages/signup.js'
import User from './pages/user.js'
import Login from './pages/login.js'
import Navbar from './components/navbar.js'
import themeObj from './util/theme.js'
import AuthRoute from './util/authRoute.js'
import './App.css';
import axios from 'axios'

//Redux
import { Provider } from 'react-redux'
import store from './redux/store.js'
import {SET_AUTHENTICATED} from './redux/types.js'
import {logoutUser, getUserData} from './redux/action/userAction.js'



const theme = createMuiTheme(themeObj);
const token = localStorage.AuthToken;
if(token){
  let payload = JSON.parse(Buffer.from(token.split(' ')[1].split('.')[1], 'base64').toString('utf-8'));
  if(payload.exp < Date.now()){
    store.dispatch(logoutUser);
    window.location.href = "/login";
  }
  else{
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData(payload.sub));
  }
}

class App extends Component {
  render(){
    return (
      <MuiThemeProvider  theme={theme}>
      <Provider store={store}>
        <Router>
            <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path="/" component = { Home }/>
                <AuthRoute exact path="/signup" component={Signup}/>
                <AuthRoute exact path="/login" component={Login}/>
                <Route exact path="/users/:username/" component = { User }/>
                <Route
                  exact
                  path="/users/:username/scream/:screamid/"
                  component={User}
                />
              </Switch>
            </div>
          </Router>
      </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
