import React, { Component } from 'react'
import { APIManager } from '../../utils'

class Profile extends Component {

  constructor(){
    super()
    this.state = {
      profile: null
    }
  }

  componentDidMount(){
    APIManager.get('/api/profile', {username: this.props.username}, (err, response) => {
      if (err){
        alert(err)
        return
      }
      response.results[0]
      console.log('componentDidMount: ' + JSON.stringify(response.results[0]))
      if (response.results.length == 0){
        alert('Sorry, this profile does not exist.')
        return
      }
      this.setState({
        profile: response.results[0]
      })
    })
  }

  render(){

    //Check for null state
    const header = (this.state.profile == null) ? null : <h3>{this.state.profile._id}</h3>

    return (
      <div>
        {header}
      </div>
    )
  }
}

export default Profile
