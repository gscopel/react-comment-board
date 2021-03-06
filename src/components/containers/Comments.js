import React, { Component } from 'react'
import { Comment, CreateComment } from '../presentation'
import styles from './styles'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'

class Comments extends Component {

constructor(){
    super()
    this.state = {
      commentsLoaded: false,
      zoneIndex: 0
    }
  }

  submitComment(comment){
    if (this.props.user == null){
      alert('Please create an account to access this feature')
      return
    }
    //console.log('submitComment: ' + JSON.stringify(comment))
    let updatedComment = Object.assign({}, comment)

    let zone = this.props.zones[this.props.zoneIndex]
    updatedComment['zone'] = zone._id
    updatedComment['username'] = this.props.user.username
    updatedComment['author'] = {
      username: this.props.user.username,
      id: this.props.user._id,
      image: this.props.user.image
    }

    APIManager.post('/api/comment', updatedComment, (err, response) => {
      if (err){
        alert(err)
        return
      }
      //console.log(JSON.stringify(response))
        //Return comment after post
        const comment = response.result
        this.props.commentsReceived([comment], zone)
    })
  }

  componentDidUpdate(){
    //console.log('componentDidUpdate: ')
    let zone = this.props.zones[this.props.zoneIndex]
    if (zone == null){
      console.log('no selected zone exists')
      return
    }

    let commentsArray = this.props.commentsMap[zone._id]
    if (commentsArray != null){
      return
    }

    APIManager.get('/api/comment', {zone:zone._id}, (err, response) => {
      if (err){
        alert('ERROR: ' + err.message)
        return
      }
      this.props.commentsReceived(response.results, zone)
    })
  }

  updatedComment(comment, updateBody){
    console.log('updatedComment: '+ comment._id + ',' + updateBody)
    this.props.updateComment(comment, {body: updateBody})
  }

  render(){

    let selectedZone = this.props.zones[this.props.zoneIndex]
    const currentUser = this.props.user //null if not logged in
    //console.log('ZONE' + JSON.stringify(selectedZone))

    let zoneName = null
    let commentList = null

    if (selectedZone != null){
        zoneName = selectedZone.name
        let zoneComments = this.props.commentsMap[selectedZone._id]

        if (zoneComments != null){
          commentList = zoneComments.map((comment, i) => {
            let editable = false
            if (currentUser != null){
              editable = (currentUser._id == comment.author.id)
            }
          return (
            <li key={i}><Comment onUpdate={this.updatedComment.bind(this)} isEditable={editable} currentComment={comment} /></li>
          )
        })
      }
    }

    return(
      <div>
        <h2>{zoneName}</h2>
        <div style={styles.comment.commentBox}>
          <ul style={{listStyleType:'none'}}>
            {commentList}
          </ul>
          <CreateComment onCreateComment={this.submitComment.bind(this)} />
        </div>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    commentsMap: state.comment.map,
    commentsLoaded: state.comment.commentsLoaded,
    zoneIndex: state.zone.selectedZone,
    zones: state.zone.list,
    user: state.account.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    commentsReceived: (comments, zone) => dispatch(actions.commentsReceived(comments, zone)),
    commentCreated: (comment) => dispatch(actions.commentCreated(comment)),
    updateComment: (comment, params) => dispatch(actions.updateComment(comment, params))
  }
}

export default connect (stateToProps, dispatchToProps)(Comments)
