import constants from '../constants/constants'

var initialState = {
  map: {}
}

export default (state = initialState, action) => {

  var updatedState = Object.assign({}, state)

  switch (action.type) {
    case constants.COMMENTS_RECEIVED:
      //console.log('COMMENTS_RECEIVED: ' + JSON.stringify(action.comments))
      //console.log('COMMENTS_RECEIVED FROM ZONE: ' + JSON.stringify(action.zone))

      let updatedMap = Object.assign({}, updatedState.map)
      let zoneComments = updatedMap[action.zone._id]
        if (zoneComments == null){
          zoneComments = []
        }
        else {
          zoneComments = Object.assign([], zoneComments)
        }

      action.comments.forEach((comment, i) => {
        zoneComments.push(comment)
      })

      updatedMap[action.zone._id] = zoneComments
      updatedState['map'] = updatedMap

      //console.log('COMMENTS_RECEIVED: ' + JSON.stringify(updatedState))

      return updatedState

    case constants.SELECT_ZONE:
      return updatedState

    case constants.COMMENT_CREATED:
      console.log('COMMENT_CREATED: ' + JSON.stringify(action.comment))
      

      return updatedState

    default:
      return state

  }
}
