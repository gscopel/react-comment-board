import constants from '../constants/constants'
import { APIManager } from '../utils'

export default {

  fetchProfile: (params) => {
    return (dispatch) => {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: 'loading',
        reducer: 'profile'
      })

      APIManager.get('/api/profile', params, (err, response) => {
          if (err){
            console.log('ERROR: ' + err)
            return
          }
          //console.log('fetchProfile: ' + JSON.stringify(response))
           if (response.results.length == 0){
             alert('Sorry, this profile does not exist.')
             return
           }
           dispatch({
             type: constants.PROFILE_RECEIVED,
             profile: response.results[0]
           })
       })
     }
  },

  // profileReceived: (profile) => {
  //   return {
  //     type: constants.PROFILE_RECEIVED,
  //     profile: profile
  //   }
  // },

  commentCreated: (comment) => {
    return {
      type: constants.COMMENT_CREATED,
      comment: comment
    }
  },

  updateComment: (comment, params) => {
    return (dispatch) => {
      const endpoint = '/api/comment/'+comment._id
      APIManager.put(endpoint, params, (err, response) => {
        if (err){
          alert(err)
          return
        }
        console.log(JSON.stringify(response))
        const updatedComment = response.result
        dispatch({
          type: constants.COMMENT_UPDATED,
          comment: updatedComment
        })
      })
    }
  },

  commentsReceived: (comments, zone) => {
    return {
      type: constants.COMMENTS_RECEIVED,
      comments: comments,
      zone: zone
    }
  },

  fetchZones: (params) => {
    return (dispatch) => {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: 'loading',
        reducer: 'zone'
      })
      APIManager.get('/api/zone', params, (err, response) => {
        if (err){
          alert(err)
          return
        }
        console.log(JSON.stringify(response))
        dispatch({
          type: constants.ZONES_RECEIVED,
          zones: response.results
        })
      })
    }
  },

  zonesReceived: (zones) => {
    return {
      type: constants.ZONES_RECEIVED,
      zones: zones
    }
  },

  zoneCreated: (zone) => {
    return {
      type: constants.ZONE_CREATED,
      zone: zone
    }
  },

  selectZone: (zoneIndex) => {
    return {
      type: constants.SELECT_ZONE,
      selectedZone: zoneIndex
    }
  },

  currentUserReceived: (user) => {
    return {
      type: constants.CURRENT_USER_RECEIVED,
      user: user
    }
  },

  updateProfile: (profile, updatedState) => {
    return (dispatch) => {
      const endpoint = '/api/profile/'+profile._id
      APIManager.put(endpoint, updatedState, (err, response) => {
        if (err){
          alert('Error' + JSON.stringify(err))
          return
        }
        const updateProfile = response.result
        dispatch({
          type: constants.PROFILE_UPDATED,
          profile: updateProfile
        })
        console.log('profile updated' + JSON.stringify(response))
      })
    }
  }

}
