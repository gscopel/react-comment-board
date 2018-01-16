import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'

class Profile extends Component {

  constructor(){
    super()
    this.state = {}
  }


 //Used to make only one API call for data
  componentDidMount(){
    const profile = this.props.profiles[this.props.username]
    if (profile == null){
      this.props.fetchProfile({username: this.props.username})
        // APIManager.get('/api/profile', {username: this.props.username}, (err, response) => {
        //   if (err){
        //     alert(err)
        //     return
        //   }
        //   response.results[0]
        //   //console.log('componentDidMount: ' + JSON.stringify(response.results[0]))
        //   if (response.results.length == 0){
        //     alert('Sorry, this profile does not exist.')
        //     return
        //   }
        //   this.props.profileReceived(response.results[0])
        // })
     }
  }

  componentDidUpdate(){
  //console.log('componentDidUpdate: ')
  }

  render(){
    //No data is rendered initially, componentDidMount will chcek for null and make API requests as needed
    let profile = this.props.profiles[this.props.username]

    let header = null
    if (profile != null){
        header = (
          <div>
              <h3>{profile.username}</h3>
              <p>
                neighborhood: {profile.area}<br />
                gender: {profile.gender}
              </p>
          </div>
        )
    }

    //If status is loading then display to user that app API is loading
    const content = (this.props.appStatus == 'loading') ? 'Loading...' : header

    return (
     <div>
       { content }
     </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    profiles: state.profile.map,
    appStatus: state.profile.appStatus
  }
}

//Async action used via Thunk
const dispatchToProps = (dispatch) => {
  return {
    fetchProfile: (params) => dispatch(actions.fetchProfile(params)),
    //profileReceived: (profile) => dispatch(actions.profileReceived(profile))
  }
}

export default connect(stateToProps, dispatchToProps)(Profile)
