import React, { Component } from 'react'

class CreateComment extends Component {

  constructor(){
    super()
    this.state = {
      comment: {
        body: '',
        username: ''
      }
    }
  }

  updateComment(e){
    console.log('updateComment: ' + e.target.id + ' == ' + e.target.value)
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment[e.target.id] = e.target.value
    this.setState({
      comment: updatedComment
    })
  }

  submitComment(e){
    console.log('submitComment: ' + JSON.stringify(this.state.comment))
    this.props.onCreateComment(this.state.comment)
  }

  render(){
    return (
      <div>
        <h3>Add Comment</h3>
        <input onChange={this.updateComment.bind(this)} id="username" className="form-control" type="text" placeholder="Username"/><br />
        <input onChange={this.updateComment.bind(this)} id="body" className="form-control" type="text" placeholder="Comment"/><br />
        <button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
      </div>
    )
  }
}

export default CreateComment
