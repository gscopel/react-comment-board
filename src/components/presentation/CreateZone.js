import React, { Component } from 'react'

class CreateZone extends Component {

    constructor(){
      super()
      this.state = {
        zone: {
          name: '',
          zipCode: ''
        }
      }
    }

    updateZone(e){
      let updated = Object.assign({}, this.state.zone)
      updated[e.target.id] = e.target.value
      this.setState({
        zone: updated
      })
    }

    submitZone(e){
    //  console.log('submitZone ' + JSON.stringify(this.state.zone))
      this.props.onCreateZone(this.state.zone)
    }

  render(){
    return(
      <div style={{marginLeft:36}} className="container">
        <h3>Create Zone</h3>
        <input onChange={this.updateZone.bind(this)} id="name" className="form-control" type="text" placeholder="Name"/><br />
        <input onChange={this.updateZone.bind(this)} id="zipCode" className="form-control" type="text" placeholder="Zip Code"/><br />
        <button onClick={this.submitZone.bind(this)} className="btn btn-success">Add Zone</button>
      </div>
    )
  }
}

export default CreateZone
