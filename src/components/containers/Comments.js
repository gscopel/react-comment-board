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
      list: []
    }
  }

  componentDidMount(){
  //  console.log('componentDidMount: ')
    APIManager.get('/api/comment', null, (err, response) => {
      if (err){
        alert('ERROR: ' + err.message)
        return
      }
      this.setState({
        list: response.results
      })
    })
  }

  submitComment(comment){
  //  console.log('submitComment: ' + JSON.stringify(comment))
    let updatedComment = Object.assign({}, comment)
    APIManager.post('/api/comment', updatedComment, (err, response) => {
      if (err){
        alert(err)
        return
      }
    //  console.log(JSON.stringify(response))
      let updatedList = Object.assign([], this.state.list)
      updatedList.push(response.result)
      this.setState({
        list: updatedList
      })
    })
  }

  render(){

    const commentList = this.state.list.map((comment, i) => {
      return (
        <li key={i}><Comment currentComment={comment} /></li>
      )
    })

    const selectedZone = this.props.zones[this.props.zoneIndex]
    const zoneName = (selectedZone == null) ? '' : selectedZone.name

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
    zoneIndex: state.zone.selectedZone,
    zones: state.zone.list
  }
}

export default connect (stateToProps)(Comments)
