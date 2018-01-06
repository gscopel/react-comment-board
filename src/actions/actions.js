import constants from '../constants/constants'

export default {

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
