import React, { Component } from 'react'
import Zone from '../presentation/Zone'
import { APIManager } from '../../utils'

class Zones extends Component {

  constructor(){
    super()
    this.state = {
      zone: {
        name: '',
        zipCode: '',
        comments: ''
      },
      list: []
    }
  }

  componentDidMount(){
  //  console.log('componentDidMount')
    APIManager.get('/api/zone', null, (err, response) => {
      if (err){
        alert('ERROR: ' + err.message)
        return
      }
      this.setState({
        list: response.results
      })
    })
  }

  submitZone(){
    console.log('submitZone: ' + JSON.stringify(this.state.zone))
    let updatedZone = Object.assign({}, this.state.zone)
    updatedZone['zipCodes'] = updatedZone.zipCode.split(',')
    APIManager.post('/api/zone', updatedZone, (err, response) => {
      if (err) {
        alert('error: ' + err.message)
        return
      }
      console.log('ZONE CREATED: ' + JSON.stringify(response))
      let updatedList = Object.assign([], this.state.list)
      updatedList.push(response.result)
      this.setState({
        list: updatedList
      })
    })
  }

  updateName(e){
  //  console.log('updateName: ' + e.target.value)
    let updatedZone = Object.assign({}, this.state.zone)
    updatedZone['name'] = e.target.value
    this.setState({
      zone: updatedZone
    })
  }

  updateZipcode(e){
  //  console.log('updateZipcode: ' + e.target.value)
    let updatedZone = Object.assign({}, this.state.zone)
    updatedZone['zipCode'] = e.target.value
    this.setState({
      zone: updatedZone
    })
  }


  render(){

    const listItem = this.state.list.map((zone, i) => {
      return (
        <li key={i}><Zone currentZone={zone}/></li>
      )
    })

    return(
      <div>
        <ol>
          {listItem}
        </ol>

        <h2>Add Zone</h2>
        <input onChange={this.updateName.bind(this)} className="form-control" type="text" placeholder="name"/><br />
        <input onChange={this.updateZipcode.bind(this)} className="form-control" type="text" placeholder="Zip Code"/><br />
        <button onClick={this.submitZone.bind(this)} className="btn btn-success">Add Zone</button>
      </div>
    )
  }
}

export default Zones
