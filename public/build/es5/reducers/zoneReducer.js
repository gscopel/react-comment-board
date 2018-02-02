"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
  list: [],
  selectedZone: 0,
  appStatus: "ready"
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];


  var updatedState = Object.assign({}, state);
  switch (action.type) {

    case constants.ZONES_RECEIVED:
      //  console.log('ZONES_RECEIVED: ' + JSON.stringify(action.zones))
      updatedState.list = action.zones;
      updatedState.appStatus = "ready";
      return updatedState;

    case constants.ZONE_CREATED:
      //  console.log('ZONE_CREATED: ' + JSON.stringify(action.zone))
      var updatedList = Object.assign([], updatedState.list);
      updatedList.push(action.zone);
      updatedState.list = updatedList;
      return updatedState;

    case constants.SELECT_ZONE:
      updatedState.selectedZone = action.selectedZone;
      return updatedState;

    case constants.APPLICATION_STATE:
      if (action.reducer != "zone") {
        return updatedState;
      }

      updatedState.appStatus = action.status;
      return updatedState;

    default:
      return state;
  }
};