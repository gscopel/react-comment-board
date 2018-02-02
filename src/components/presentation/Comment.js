import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ImageHelper } from '../../utils'

class Comment extends Component {
  constructor(){
    super()
    this.state = {
      isEditing: false,
      updated: null
    }
  }

  editComment(e){
    e.preventDefault()
    //console.log('editComment: ')
    if (this.state.isEditing){
      if (this.state.updated != null)
          this.props.onUpdate(this.props.currentComment, this.state.updated)
    }
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  componentDidUpdate(){
    console.log('isEditing: ' + this.state.isEditing)
  }

  updateBody(e){
    console.log('updateBody: ' + e.target.value)
    this.setState({
      updated: e.target.value
    })
  }

  render(){
    const currentComment = this.props.currentComment
    const author = currentComment.author
    const radius = 16
    const editable = (this.props.isEditable) ? this.props.isEditable : false

    let content = null
    if (this.state.isEditing == true){
      content = (
        <div>
          <textarea onChange={this.updateBody.bind(this)} defaultValue={currentComment.body} style={{width:100+'%'}}></textarea>
          <br />

          <img style={{borderRadius:radius, marignRight:10}} src={ImageHelper.thumbnail(author.image, 2*radius)} />
          <span style={{fontWeight:200}}>
            <Link to={'/profile/'+author.username}>{author.username}</Link>
          </span>
          <span style={{marginLeft:12, marginRight:12}}>|</span>
          <span style={{fontWeight:200}}>{currentComment.timestamp}</span>
          <button onClick={this.editComment.bind(this)}>Save Changes</button>
          <hr />
        </div>
      )
    }
    else {
      content = (
        <div>
          <p style={{fontSize:20, fontWeight:400}}>
           {currentComment.body}
          </p>

          <img style={{borderRadius:radius, marignRight:10}} src={ImageHelper.thumbnail(author.image, 2*radius)} />
          <span style={{fontWeight:200}}>
            <Link to={'/profile/'+author.username}>{author.username}</Link>
          </span>
          <span style={{marginLeft:12, marginRight:12}}>|</span>
          <span style={{fontWeight:200}}>{currentComment.timestamp}</span>
          { (editable) ? <button onClick={this.editComment.bind(this)}>Edit</button> : null }
          <hr />
        </div>
      )
    }

    return(
      <div>
        {content}
      </div>
    )
  }
}

export default Comment
