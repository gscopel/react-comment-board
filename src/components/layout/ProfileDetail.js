import React, { Component } from 'react'
import { Profile } from '../containers'

class ProfileDetail extends Component {

  componentDidMount(){
    console.log('componentDidMount: ' + JSON.stringify(this.props.match.params))
  }

  render(){

    return(
      <div>
          ProfileDetail Entry Point
          <Profile username={this.props.match.params.username}/>
      </div>
    )
  }
}

export default ProfileDetail
