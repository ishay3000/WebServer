import React, { useState } from 'react';
import './App.css';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import Login from './Login';
import GuardedRoute from 'react-guarded-route'
import Menu from './Menu'
import About from './About'
import Config from "./Config.js";
import Home from "./Home.js";
import Hardware from "./Hardware.js"

// Scripts
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Stats from './Stats';


const CheckUserLogged = (checkIfSignedIn) => {
  let isUserSigned = sessionStorage.getItem('userLoggedIn')
  return checkIfSignedIn ? isUserSigned !== null : isUserSigned === null
}

const AuthedRoutes = ({ ...props }) => {
  return (
    <div>
      <div>
        <Menu {...props} />
        <GuardedRoute exact path='/' component={Home} validatorFunction={CheckUserLogged(true)} redirectTo='/login' />
        <GuardedRoute path='/about' component={About} validatorFunction={CheckUserLogged(true)} redirectTo='/login' />
        <GuardedRoute path='/stats' component={Stats} validatorFunction={CheckUserLogged(true)} redirectTo='/login' />
        <GuardedRoute path='/hardware' component={Hardware} validatorFunction={CheckUserLogged(true)} redirectTo='/login' />
        <GuardedRoute path='/config' component={Config} validatorFunction={CheckUserLogged(true)} redirectTo='/login' />
      </div>
    </div>
  )
}

const UnauthedRoutes = () => {
  return (
    <div>
      {/* <Route exact path='/' render={() => <Redirect to='/login' />} /> */}
      <GuardedRoute path='/login' component={Login} validatorFunction={CheckUserLogged(false)} redirectTo='/' />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/(login)' component={UnauthedRoutes} />
        <Route path='/' component={AuthedRoutes} />

        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

function NotFound() {
  return (
    <div>
      <h1>
        Page Not Found ¯\_(ツ)_/¯
      </h1>
    </div>
  )
}



export default App;