import React, { Component } from 'react'
import { CreateZone, Zone } from '../presentation'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import store from '../../stores/store'

class Zones extends Component {

  constructor(){
    super()
    this.state = {
    
    }
  }

  componentDidMount(){
  //  console.log('componentDidMount')
    APIManager.get('/api/zone', null, (err, response) => {
      if (err){
        alert('ERROR: ' + err.message)
        return
      }
      const zones = response.results
      this.props.zonesReceived(zones)
        // Redux used to replace setState
        // this.setState({
        //   list: response.results
        // })
    })
  }

  submitZone(zone){
    let updatedZone = Object.assign({}, zone)
    updatedZone['zipCodes'] = updatedZone.zipCode.split(',')
  //  console.log('submitZone: ' + JSON.stringify(updatedZone))

    APIManager.post('/api/zone', updatedZone, (err, response) => {
      if (err) {
        alert('error: ' + err.message)
        return
      }
      const zone = response.result
      this.props.zoneCreated(zone)
      // console.log('ZONE CREATED: ' + JSON.stringify(response))
      // let updatedList = Object.assign([], this.state.list)
      // updatedList.push(response.result)
      // this.setState({
      //   list: updatedList
      // })
    })
  }

  selectZone(zoneIndex){
  //  console.log('selectZone: ' + zoneIndex)
  this.props.selectZone(zoneIndex)
    // this.setState({
    //   selected: zoneIndex
    // })
  }

  render(){

    const listItem = this.props.list.map((zone, i) => {
      let selected = (i == this.props.selected)
      return (
        <li key={i}>
            <Zone zoneIndex={i} onSelect={this.selectZone.bind(this)}
            isSelected={selected} currentZone={zone}/>
        </li>
      )
    })

    return(
      <div>
        <ol>
          {listItem}
        </ol>
          <CreateZone onCreateZone={this.submitZone.bind(this)} />
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    list: state.zone.list,
    selected: state.zone.selectedZone
  }
}

const dispatchToProps = (dispatch) => {
  return {
    zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)),
    zoneCreated: (zone) => dispatch(actions.zoneCreated(zone)),
    selectZone: (zoneIndex) => dispatch(actions.selectZone(zoneIndex))
  }
}

export default connect(stateToProps, dispatchToProps)(Zones)
