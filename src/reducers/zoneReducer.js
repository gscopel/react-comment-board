import constants from '../constants/constants'

var initialState = {
  list: [],
  selectedZone: 0
}

export default (state = initialState, action) => {

  var updatedState = Object.assign({}, state)
  switch (action.type) {

    case constants.ZONES_RECEIVED:
      console.log('ZONES_RECEIVED: ' + JSON.stringify(action.zones))
      updatedState['list'] = action.zones
      return updatedState

    case constants.ZONE_CREATED:
      console.log('ZONE_CREATED: ' + JSON.stringify(action.zone))
      let updatedList = Object.assign([], updatedState.list)
      updatedList.push(action.zone)
      updatedState['list'] = updatedList
      return updatedState

    case constants.SELECT_ZONE:
      updatedState['selectedZone'] = action.selectedZone
      return updatedState

    default:
      return state
  }
}
