import React, { Component } from 'react'
import Zone from '../presentation/Zone'
import superagent from 'superagent'

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
    console.log('componentDidMount')

    superagent
    .get('/api/zone')
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

  submitZone(){
    console.log('submitZone: ' + JSON.stringify(this.state.zone))
    let updatedList = Object.assign([], this.state.list)
    updatedList.push(this.state.zone)
    this.setState({
      list: updatedList
    })
  }

  updateName(e){
    console.log('updateName: ' + e.target.value)
    let updatedZone = Object.assign({}, this.state.zone)
    updatedZone['name'] = e.target.value
    this.setState({
      zone: updatedZone
    })
  }

  updateZipcode(e){
    console.log('updateZipcode: ' + e.target.value)
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
