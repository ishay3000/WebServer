import React, { useState } from 'react';
import './App.css';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import Login from './Login';
import GuardedRoute from 'react-guarded-route'
import { Navbar, Nav } from 'react-bootstrap'
import Menu from './Menu'
import About from './About'


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

// function About() {
//   return (
//     <div>
//       <h1>About</h1>
//     </div>
//   )
// }

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
      <h1>Home</h1>
    </div>
  )
}

export default App;
