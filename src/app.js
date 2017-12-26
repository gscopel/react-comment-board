import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Home from './components/layout/Home'
import { Provider } from 'react-redux'
import store from './stores/store'

class App extends Component {
  render(){
    return(
    <Provider store={ store.configureStore() }>
      <div>
        Comment Board
        <Home />
      </div>
    </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
