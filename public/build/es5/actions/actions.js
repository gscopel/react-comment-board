"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var APIManager = require("../utils").APIManager;
module.exports = {

  fetchProfile: function (params) {
    return function (dispatch) {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: "loading",
        reducer: "profile"
      });

      APIManager.get("/api/profile", params, function (err, response) {
        if (err) {
          console.log("ERROR: " + err);
          return;
        }
        //console.log('fetchProfile: ' + JSON.stringify(response))
        if (response.results.length == 0) {
          alert("Sorry, this profile does not exist.");
          return;
        }
        dispatch({
          type: constants.PROFILE_RECEIVED,
          profile: response.results[0]
        });
      });
    };
  },

  // profileReceived: (profile) => {
  //   return {
  //     type: constants.PROFILE_RECEIVED,
  //     profile: profile
  //   }
  // },

  commentCreated: function (comment) {
    return {
      type: constants.COMMENT_CREATED,
      comment: comment
    };
  },

  updateComment: function (comment, params) {
    return function (dispatch) {
      var endpoint = "/api/comment/" + comment._id;
      APIManager.put(endpoint, params, function (err, response) {
        if (err) {
          alert(err);
          return;
        }
        console.log(JSON.stringify(response));
        var updatedComment = response.result;
        dispatch({
          type: constants.COMMENT_UPDATED,
          comment: updatedComment
        });
      });
    };
  },

  commentsReceived: function (comments, zone) {
    return {
      type: constants.COMMENTS_RECEIVED,
      comments: comments,
      zone: zone
    };
  },

  fetchZones: function (params) {
    return function (dispatch) {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: "loading",
        reducer: "zone"
      });
      APIManager.get("/api/zone", params, function (err, response) {
        if (err) {
          alert(err);
          return;
        }
        console.log(JSON.stringify(response));
        dispatch({
          type: constants.ZONES_RECEIVED,
          zones: response.results
        });
      });
    };
  },

  zonesReceived: function (zones) {
    return {
      type: constants.ZONES_RECEIVED,
      zones: zones
    };
  },

  zoneCreated: function (zone) {
    return {
      type: constants.ZONE_CREATED,
      zone: zone
    };
  },

  selectZone: function (zoneIndex) {
    return {
      type: constants.SELECT_ZONE,
      selectedZone: zoneIndex
    };
  },

  currentUserReceived: function (user) {
    return {
      type: constants.CURRENT_USER_RECEIVED,
      user: user
    };
  },

  updateProfile: function (profile, updatedState) {
    return function (dispatch) {
      var endpoint = "/api/profile/" + profile._id;
      APIManager.put(endpoint, updatedState, function (err, response) {
        if (err) {
          alert("Error" + JSON.stringify(err));
          return;
        }
        var updateProfile = response.result;
        dispatch({
          type: constants.PROFILE_UPDATED,
          profile: updateProfile
        });
        console.log("profile updated" + JSON.stringify(response));
      });
    };
  }

};