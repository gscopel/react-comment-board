import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/actions'

class CurrentUser extends Component {
  constructor(){
    super()
    this.state = {
      updatedState: {

      }
    }
  }

  componentDidMount(){
    console.log('componentDidMount: ' + JSON.stringify(this.props.user))
  }

  updateCurrentUser(e){
    e.preventDefault()
    console.log('updateCurrentUser: ' + e.target.id + '==' + e.target.value)

    let updatedProfile = Object.assign({}, this.state.updatedState)
    updatedProfile[e.target.id] = e.target.value
    this.setState({
      updatedState: updatedProfile
    })
  }

  updateProfile(e){
    e.preventDefault()
    console.log('updateProfile: ' + JSON.stringify(this.state.updatedState))

    //Alert user if nothing was entered into input field
    if (Object.keys(this.state.updatedState).length ==0){
      alert('It appears you did not make any changes')
      return
    }
    this.props.updateProfile(this.props.user, this.state.updatedState)
  }

  render(){
    const currentUser = this.props.user
    return(
      <div>
        <h2>Welcome { currentUser.username }</h2>
        <input type="text" id="username" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.username} placeholder="Username" /><br />
        <input type="text" id="area" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.area} placeholder="Neighborhood" /><br />
        <input type="text" id="gender" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.gender} placeholder="Gender" /><br />
        <button onClick={this.updateProfile.bind(this)}>Update Profile</button>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.account.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    updateProfile: (profile, updatedState) => dispatch(actions.updateProfile(profile, updatedState))
  }
}

export default connect(stateToProps, dispatchToProps)(CurrentUser)
