import React, { Component } from 'react'
import { APIManager, ImageHelper } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import { Link } from 'react-router-dom'

class Account extends Component {

  constructor(){
    super()
    this.state = {
      profile: {
        username: '',
        password: '',
        area: '',
        gender: ''
      }
    }
  }

  componentDidMount(){
    APIManager.get('/account/currentuser', null, (err, response) => {
      if (err){
        //User not logged in will result in error.
        //alert(err.message)
        return
      }
    //  console.log(JSON.stringify(response))
      this.props.currentUserReceived(response.user)
    })
  }

  updatedProfile(e){
    e.preventDefault()
  //  console.log(e.target.id + '==' + e.target.value)
    let updatedProfile = Object.assign({}, this.state.profile)
    updatedProfile[e.target.id] = e.target.value
    this.setState({
      profile: updatedProfile
    })
  }

  login(e){
    e.preventDefault()
  //  console.log(JSON.stringify(this.state.profile))
    if (this.state.profile.username.length == 0){
      alert('Please enter username')
      return
    }
    if (this.state.profile.password.length == 0){
      alert('Please enter password')
      return
    }
    APIManager.post('/account/login', this.state.profile, (err, response) => {
      if (err){
        alert(err.message)
        return
      }
      //console.log(JSON.stringify(response))
      this.props.currentUserReceived(response.user)
    })
  }

  signUp(e){
    e.preventDefault()
    //console.log(JSON.stringify(this.state.profile))
    if (this.state.profile.username.length == 0){
      alert('Please enter username')
      return
    }
    if (this.state.profile.password.length == 0){
      alert('Please enter password')
      return
    }
    APIManager.post('/account/register', this.state.profile, (err, response) => {
      if (err){
        alert(err.message)
        return
      }
      // console.log(JSON.stringify(response))
     // User logs in when they sign up
   this.props.currentUserReceived(response.user)
    })
  }

  logout(e){
    e.preventDefault()
    //console.log('log out button clicked')

    APIManager.get('/account/logout', null, (err, response) => {
      if (err){
        alert(err.message)
        return
      }
      console.log(JSON.stringify(response))
      this.props.currentUserReceived(null)
    })
  }

  render(){
    //Create UI to let user know they have logged in successfully
    let content = null
    if (this.props.user == null){
      content = (
        <div>
           <h2>
              Login
           </h2>
             <input id="username" onChange={this.updatedProfile.bind(this)} type="text" placeholder="username" /><br />
             <input id="password" onChange={this.updatedProfile.bind(this)} type="password" placeholder="password" /><br />
             <button onClick={this.login.bind(this)}>Log In</button>
           <br /><br />

           <h2>
              Sign Up
           </h2>
             <input id="username" onChange={this.updatedProfile.bind(this)} type="text" placeholder="username" /><br />
             <input id="password" onChange={this.updatedProfile.bind(this)} type="password" placeholder="password" /><br />
             <input id="area" onChange={this.updatedProfile.bind(this)} type="text" placeholder="Neighborhood" /><br />
             <input id="gender" onChange={this.updatedProfile.bind(this)} type="text" placeholder="gender" /><br />
             <button onClick={this.signUp.bind(this)}>Join</button>
        </div>
      )
    }
    else {
       content = (
         <div>
          <img style={{borderRadius:50, float:'left', marginRight:15}} src={ImageHelper.thumbnail(this.props.user.image, 82)} />
          <h2>Hello {this.props.user.username}</h2>
          <span><p>You are located in {this.props.user.area}</p></span><br />
          <button onClick={this.logout.bind(this)}>Log Out</button><br /><br />
          <Link to="/currentuser"><button>Account</button></Link>
        </div>
       )
    }

    return(
      <div>
        { content }
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
    currentUserReceived: (user) => dispatch(actions.currentUserReceived(user))
  }
}

export default connect(stateToProps, dispatchToProps)(Account)
