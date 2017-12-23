import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Home from './components/layout/Home'

class App extends Component {
  render(){
    return(
      <div>
        Comment Board
        <Home />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
