import constants from '../constants/constants'
import { APIManager } from '../utils'

export default {

  fetchProfile: (params) => {
    return (dispatch) => {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: 'loading'
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
        status: 'loading'
      })
      APIManager.get('/api/zone', params, (err, response) => {
        if (err){
          alert(err)
          return
        }
        console.log(JSON.stringify(response))
        //Simulate delay in API callback for profile information
        setTimeout(() => {
          dispatch({
            type: constants.ZONES_RECEIVED,
            zones: response.results
          })
        }, 3000)
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
  }

}
