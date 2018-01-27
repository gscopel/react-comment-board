import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ImageHelper } from '../../utils'

class Comment extends Component {
  render(){
    const currentComment = this.props.currentComment
    const author = currentComment.author
    const radius = 16

    return(
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
        <hr />
      </div>
    )
  }
}

export default Comment
