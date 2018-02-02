"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
  list: [],
  map: {},
  appStatus: "ready"
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];


  var updatedState = Object.assign({}, state);
  switch (action.type) {
    case constants.PROFILE_RECEIVED:
      //console.log('PROFILE_RECEIVED: ' + JSON.stringify(action.profile))
      var updatedList = Object.assign([], state.list);
      updatedList.push(action.profile);
      updatedState.list = updatedList;

      var updatedMap = Object.assign({}, state.map);
      updatedMap[action.profile.username] = action.profile;
      updatedState.map = updatedMap;
      updatedState.appStatus = "ready";

      return updatedState;

    case constants.APPLICATION_STATE:
      //console.log('APPLICATION_STATE: ' + action.status)
      //Prevent loading status from showing up
      if (action.reducer != "profile") {
        return updatedState;
      }
      updatedState.appStatus = action.status;

      return updatedState;

    default:
      return state;
  }
};