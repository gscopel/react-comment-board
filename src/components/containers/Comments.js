import React, { Component } from 'react'
import Comment from '../presentation/Comment'
import superagent from 'superagent'
import styles from './styles'

class Comments extends Component {

constructor(){
    super()
    this.state = {
      comment: {
        username: '',
        body: '',
        timestamp: ''
      },
      list: []
    }
  }

  componentDidMount(){
    console.log('componentDidMount: ')

    superagent
    .get('/api/comment')
    .query(null)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err){
        alert('ERROR: ' + err)
        return
      }
      console.log(JSON.stringify(response.body))
      let results = response.body.results

      this.setState({
        list: results
      })

    })
  }

  submitComment(){
    //console.log('submitComment: ' + JSON.stringify(this.state.comment))
    let updatedList = Object.assign([], this.state.list)
    updatedList.push(this.state.comment)
    this.setState({
      list: updatedList
    })
  }

  updateUsername(e){
  //  console.log('updateUsername: ' + e.target.value)
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment['username'] = e.target.value
    this.setState({
      comment: updatedComment
    })
  }

  updateBody(e){
  //  console.log('updateBody: ' + e.target.value)
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment['body'] = e.target.value
    this.setState({
      comment: updatedComment
    })
  }

  updateTimestamp(e){
  //  console.log('updateTimestamp: ' + e.target.value)
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment['timestamp'] = e.target.value
    this.setState({
      comment: updatedComment
    })
  }

  render(){

    const commentList = this.state.list.map((comment, i) => {
      return (
        <li key={i}><Comment currentComment={comment} /></li>
      )
    })

    return(
      <div>
        <h2>Comments: Zone 1</h2>
        <div style={styles.comment.commentBox}>
          <ul style={{listStyleType:'none'}}>
            {commentList}
          </ul>

          <input onChange={this.updateUsername.bind(this)} className="form-control" type="text" placeholder="Username"/><br />
          <input onChange={this.updateBody.bind(this)} className="form-control" type="text" placeholder="Comment"/><br />
          <input onChange={this.updateTimestamp.bind(this)} className="form-control" type="text" placeholder="Timestamp"/><br />
          <button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
        </div>
      </div>
    )
  }
}

export default Comments
