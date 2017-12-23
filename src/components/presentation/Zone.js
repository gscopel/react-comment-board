import React, { Component } from 'react'
import styles from './styles'

class Zone extends Component {
  render(){

    const zipCode = this.props.currentZone.zipCodes[0]

    return(
      <div style={styles.zone.container}>
        <h2 style={styles.zone.header}>
          <a style={styles.zone.anchor} href="#">{this.props.currentZone.name}</a>
        </h2>
        <span>{zipCode}</span><br />
        <span>{this.props.currentZone.comments} comments</span>
      </div>
    )
  }
}

export default Zone
