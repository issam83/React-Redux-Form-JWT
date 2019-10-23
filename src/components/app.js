import React, { Component } from 'react'
import Header from '../containers/header'
import { Route, Switch } from 'react-router-dom'
import Ressources from './ressources';
import Home from './home';
import RequireAuthentification from '../helpers/require-authentification';
import Signin from './signin';
import Signout from './signout';
import Signup from './signup';
import Errors from './errors';

require("../style.css");
export default class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <div className="container body_content">
          <Errors/>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/ressources' 
            component={RequireAuthentification(Ressources)}/>
            <Route exact path='/signin' component={Signin}/>
            <Route exact path='/signout' component={Signout}/>
            <Route exact path='/signup' component={Signup}/>

        </Switch>
      </div>
    </div>
    )
  }
}
