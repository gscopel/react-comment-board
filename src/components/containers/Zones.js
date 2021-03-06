import React, { Component } from 'react'
import { CreateZone, Zone } from '../presentation'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import store from '../../stores/store'

class Zones extends Component {

  constructor(){
    super()
    this.state = {}
  }

  componentDidMount(){
  //  console.log('componentDidMount')
    this.props.fetchZones(null)
    // APIManager.get('/api/zone', null, (err, response) => {
    //   if (err){
    //     alert('ERROR: ' + err.message)
    //     return
    //   }
    //   const zones = response.results
    //   this.props.zonesReceived(zones)
        // Redux used to replace setState
        // this.setState({
        //   list: response.results
        // })
    //})
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

    let content = null
    if (this.props.appStatus == 'loading'){
      content = 'Loading...'
    }
    else {
      content = (
        <div>
        <CreateZone onCreateZone={this.submitZone.bind(this)} />
          <ul style={{listStyleType:'none'}}>
            <li>
              {listItem}
            </li>
          </ul>
        </div>
      )
    }

    return(
      <div>
        { content }
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    appStatus: state.zone.appStatus,
    list: state.zone.list,
    selected: state.zone.selectedZone
  }
}

const dispatchToProps = (dispatch) => {
  return {
    fetchZones: (parmas) => dispatch(actions.fetchZones(parmas)),
    zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)),
    zoneCreated: (zone) => dispatch(actions.zoneCreated(zone)),
    selectZone: (zoneIndex) => dispatch(actions.selectZone(zoneIndex))
  }
}

export default connect(stateToProps, dispatchToProps)(Zones)
