//TODO SERVER SIDE RENDERING


import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Home, ProfileDetail } from './components/layout'
import { CurrentUser } from './components/containers'
import { Provider } from 'react-redux'
import store from './stores/store'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render(){
    return(
    <Provider store={ store.configureStore() }>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/profile/:username' component={ProfileDetail}></Route>
          <Route path="/currentuser" component={CurrentUser}></Route>
        </Switch>
      </BrowserRouter>
    </Provider>
    )
  }
}

export default App
