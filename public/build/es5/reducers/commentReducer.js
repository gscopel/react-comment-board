"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
  map: {}
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];


  var updatedState = Object.assign({}, state);
  var updatedMap = Object.assign({}, updatedState.map);

  switch (action.type) {
    case constants.COMMENTS_RECEIVED:
      //console.log('COMMENTS_RECEIVED: ' + JSON.stringify(action.comments))
      //console.log('COMMENTS_RECEIVED FROM ZONE: ' + JSON.stringify(action.zone))

      //let updatedMap = Object.assign({}, updatedState.map)
      var zoneComments = updatedMap[action.zone._id];
      if (zoneComments == null) {
        zoneComments = [];
      } else {
        zoneComments = Object.assign([], zoneComments);
      }

      action.comments.forEach(function (comment, i) {
        zoneComments.push(comment);
      });

      updatedMap[action.zone._id] = zoneComments;
      updatedState.map = updatedMap;

      //console.log('COMMENTS_RECEIVED: ' + JSON.stringify(updatedState))

      return updatedState;

    case constants.COMMENT_CREATED:
      //  console.log('COMMENT_CREATED: ' + JSON.stringify(action.comment))
      var commentList = updatedMap[action.comment.zoneIndex];
      if (commentList == null) {
        commentList = [];
      } else {
        commentList = Object.assign([], commentList);
      }
      commentList.push(action.comment);

      updatedMap[action.comment.zone] = commentList;
      updatedState.map = updatedMap;

      return updatedState;

    case constants.COMMENT_UPDATED:
      console.log("COMMENT_UPDATED: " + JSON.stringify(action.comment));
      var list = updatedMap[action.comment.zone];
      var newList = [];

      list.forEach(function (comment, i) {
        if (comment._id == action.comment._id) {
          newList.push(action.comment);
        } else {
          newList.push(comment);
        }
      });

      updatedMap[action.comment.zone] = newList;
      updatedState.map = updatedMap;

      return updatedState;

    case constants.SELECT_ZONE:
      return updatedState;

    default:
      return updatedState;

  }
};