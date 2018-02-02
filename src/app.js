import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main'
import { Home, ProfileDetail } from './components/layout'
import { CurrentUser } from './components/containers'
import { Provider } from 'react-redux'
import store from './stores/store'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const initialState = window.__PRELOADED_STATE__

class App extends Component {
  render(){
    return(
    <Provider store={ store.configureStore(initialState) }>
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

ReactDOM.render(<App />, document.getElementById('root'))
