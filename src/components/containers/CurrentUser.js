import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import Dropzone from 'react-dropzone'
import { APIManager, ImageHelper } from '../../utils'
import sha1 from 'sha1'

class CurrentUser extends Component {
  constructor(){
    super()
    this.state = {
      updatedState: {}
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
    alert('Your information was successfully saved')
  }

  uploadImage(files){
    //Cloudinary API documentation guidelines
    const image = files[0]
    //console.log('uploadImage: ')
    const cloudName = 'hn7c4ygti'
    const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'
    let timestamp = Date.now() / 1000
    const uploadPreset = 'o9nsr8bs'
    const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'Fv46VeYzRpkbPK48iOHQ_lKnB34'
    const signature = sha1(paramsStr)
    const params = {
      'api_key': '229545792548632',
      'timestamp': timestamp,
      'upload_preset': uploadPreset,
      'signature': signature
    }

    APIManager.upload(url, image, params, (err, response) => {
      if (err){
        console.log('Upload error' + JSON.stringify(err))
        return
      }
      console.log('Upload complete: ' + JSON.stringify(response.body))
      let updatedProfile = Object.assign({}, this.state.updatedState)
      updatedProfile['image'] = response.body['secure_url']
      this.setState({
        updatedState: updatedProfile
      })
    })
  }

  render(){
    const currentUser = this.props.user
    const image = (this.state.updatedState.image == null) ? '' : ImageHelper.thumbnail(this.state.updatedState.image, 150)//Render thumbnail
    return(
      <div style={{marginLeft:30}}>
        <h2>Welcome { currentUser.username }</h2>
        <input type="text" id="username" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.username} placeholder="Username" /><br />
        <input type="text" id="area" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.area} placeholder="Neighborhood" /><br />
        <input type="text" id="gender" onChange={this.updateCurrentUser.bind(this)} defaultValue={currentUser.gender} placeholder="Gender" /><br />
        <br /><h4>Include an image of yourself</h4>
        <img src={image} /><br />
        <Dropzone onDrop={this.uploadImage.bind(this)} />
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
