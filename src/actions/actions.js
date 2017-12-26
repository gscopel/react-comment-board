import constants from '../constants/constants'

export default {

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
  }

}
