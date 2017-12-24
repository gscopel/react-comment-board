import React, { Component } from 'react'
import Comment from '../presentation/Comment'
import styles from './styles'
import { APIManager } from '../../utils'

class Comments extends Component {

constructor(){
    super()
    this.state = {
      comment: {
        username: '',
        body: ''
      },
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

  submitComment(){
    APIManager.post('/api/comment', this.state.comment, (err, response) => {
      if (err){
        alert(err)
        return
      }
      console.log(JSON.stringify(response))
      let updatedList = Object.assign([], this.state.list)
      updatedList.push(response.result)
      this.setState({
        list: updatedList
      })
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
          <button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
        </div>
      </div>
    )
  }
}

export default Comments
