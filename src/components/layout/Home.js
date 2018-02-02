import React, { Component } from 'react'
import { Account, Comments, Zones } from '../containers'

class Home extends Component {
  render(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-2">
             <Account />
          </div>
          <div className="col-md-4">
              <Zones />
          </div>
          <div className="col-md-6">
             <Comments />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
