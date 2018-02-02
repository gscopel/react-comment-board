"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
  user: null
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];


  var updated = Object.assign({}, state);
  switch (action.type) {

    case constants.CURRENT_USER_RECEIVED:
      //console.log('CURRENT_USER_RECEIVED: ' + JSON.stringify(action.user))
      //User no longer null
      updated.user = action.user;

      return updated;

    case constants.PROFILE_UPDATED:
      console.log("PROFILE_UPDATED: " + JSON.stringify(action.profile));
      if (action.profile._id != updated.user._id) return updated;

      updated.user = action.profile;
      return updated;

    default:
      return state;
  }
};