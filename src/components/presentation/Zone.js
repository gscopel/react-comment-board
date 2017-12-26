import React, { Component } from 'react'
import styles from './styles'

class Zone extends Component {

  onSelectTitle(e){
    e.preventDefault()
  //  console.log('onSelectTitle: ' + this.props.zoneIndex)
    this.props.onSelect(this.props.zoneIndex)
  }

  render(){
    const zipCode = this.props.currentZone.zipCodes[0]
    const titleOfZone = (this.props.isSelected) ? <a style={styles.zone.anchor} href="#">{this.props.currentZone.name}</a> : <a href="#">{this.props.currentZone.name}</a>

    return(
      <div style={styles.zone.container}>
        <h2 onClick={this.onSelectTitle.bind(this)} style={styles.zone.header}>
          { titleOfZone }
        </h2>
        <span className="detail">{zipCode}</span><br />
        <span className="detail">{this.props.currentZone.comments} comments</span>
      </div>
    )
  }
}

export default Zone
