import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Home, ProfileDetail } from './components/layout'
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
        </Switch>
      </BrowserRouter>
    </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
