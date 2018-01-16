import constants from '../constants/constants'

var initialState = {
  list: [],
  map: {},
  appStatus: 'ready'
}

export default (state = initialState, action) => {

  var updatedState = Object.assign({}, state)
  switch (action.type){
    case constants.PROFILE_RECEIVED:
      //console.log('PROFILE_RECEIVED: ' + JSON.stringify(action.profile))
      let updatedList = Object.assign([], state.list)
      updatedList.push(action.profile)
      updatedState['list'] = updatedList

      let updatedMap = Object.assign({}, state.map)
      updatedMap[action.profile.username] = action.profile
      updatedState['map'] = updatedMap
      updatedState['appStatus'] = 'ready'

      return updatedState

    case constants.APPLICATION_STATE:
      //console.log('APPLICATION_STATE: ' + action.status)
      updatedState['appStatus'] = action.status

      return updatedState

    default:
      return state
  }
}
