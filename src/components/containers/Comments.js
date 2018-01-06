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
    //console.log('submitComment: ' + JSON.stringify(comment))
    let updatedComment = Object.assign({}, comment)

    let zone = this.props.zones[this.props.zoneIndex]
    updatedComment['zone'] = zone._id

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

    // if (this.props.commentsLoaded == true)
    //   return

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

  render(){

    let selectedZone = this.props.zones[this.props.zoneIndex]
    //console.log('ZONE' + JSON.stringify(selectedZone))

    // let zoneComments = this.props.commentsMap[selectedZone._id]
    //
    // const commentList = zoneComments.map((comment, i) => {
    //   return (
    //     <li key={i}><Comment currentComment={comment} /></li>
    //   )
    // })
    //
    // const selectedZone = this.props.zones[this.props.zoneIndex]
    // const zoneName = (selectedZone == null) ? '' : selectedZone.name

    let zoneName = null
    let commentList = null

    if (selectedZone != null){
        zoneName = selectedZone.name
        let zoneComments = this.props.commentsMap[selectedZone._id]

        if (zoneComments != null){
          commentList = zoneComments.map((comment, i) => {
          return (
            <li key={i}><Comment currentComment={comment} /></li>
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
    zones: state.zone.list
  }
}

const dispatchToProps = (dispatch) => {
  return {
    commentsReceived: (comments, zone) => dispatch(actions.commentsReceived(comments, zone)),
    commentCreated: (comment) => dispatch(actions.commentCreated(comment))
  }
}

export default connect (stateToProps, dispatchToProps)(Comments)
