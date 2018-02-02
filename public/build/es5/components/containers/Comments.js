"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _presentation = require("../presentation");

var Comment = _presentation.Comment;
var CreateComment = _presentation.CreateComment;
var styles = _interopRequire(require("./styles"));

var APIManager = require("../../utils").APIManager;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var Comments = (function (Component) {
  function Comments() {
    _classCallCheck(this, Comments);

    _get(Object.getPrototypeOf(Comments.prototype), "constructor", this).call(this);
    this.state = {
      commentsLoaded: false,
      zoneIndex: 0
    };
  }

  _inherits(Comments, Component);

  _prototypeProperties(Comments, null, {
    submitComment: {
      value: function submitComment(comment) {
        var _this = this;
        if (this.props.user == null) {
          alert("Please create an account to access this feature");
          return;
        }
        //console.log('submitComment: ' + JSON.stringify(comment))
        var updatedComment = Object.assign({}, comment);

        var zone = this.props.zones[this.props.zoneIndex];
        updatedComment.zone = zone._id;
        updatedComment.username = this.props.user.username;
        updatedComment.author = {
          username: this.props.user.username,
          id: this.props.user._id,
          image: this.props.user.image
        };

        APIManager.post("/api/comment", updatedComment, function (err, response) {
          if (err) {
            alert(err);
            return;
          }
          //console.log(JSON.stringify(response))
          //Return comment after post
          var comment = response.result;
          _this.props.commentsReceived([comment], zone);
        });
      },
      writable: true,
      configurable: true
    },
    componentDidUpdate: {
      value: function componentDidUpdate() {
        var _this = this;
        //console.log('componentDidUpdate: ')
        var zone = this.props.zones[this.props.zoneIndex];
        if (zone == null) {
          console.log("no selected zone exists");
          return;
        }

        var commentsArray = this.props.commentsMap[zone._id];
        if (commentsArray != null) {
          return;
        }

        APIManager.get("/api/comment", { zone: zone._id }, function (err, response) {
          if (err) {
            alert("ERROR: " + err.message);
            return;
          }
          _this.props.commentsReceived(response.results, zone);
        });
      },
      writable: true,
      configurable: true
    },
    updatedComment: {
      value: function updatedComment(comment, updateBody) {
        console.log("updatedComment: " + comment._id + "," + updateBody);
        this.props.updateComment(comment, { body: updateBody });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var _this = this;


        var selectedZone = this.props.zones[this.props.zoneIndex];
        var currentUser = this.props.user; //null if not logged in
        //console.log('ZONE' + JSON.stringify(selectedZone))

        var zoneName = null;
        var commentList = null;

        if (selectedZone != null) {
          zoneName = selectedZone.name;
          var zoneComments = this.props.commentsMap[selectedZone._id];

          if (zoneComments != null) {
            commentList = zoneComments.map(function (comment, i) {
              var editable = false;
              if (currentUser != null) {
                editable = currentUser._id == comment.author.id;
              }
              return React.createElement(
                "li",
                { key: i },
                React.createElement(Comment, { onUpdate: _this.updatedComment.bind(_this), isEditable: editable, currentComment: comment })
              );
            });
          }
        }

        return React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            null,
            zoneName
          ),
          React.createElement(
            "div",
            { style: styles.comment.commentBox },
            React.createElement(
              "ul",
              { style: { listStyleType: "none" } },
              commentList
            ),
            React.createElement(CreateComment, { onCreateComment: this.submitComment.bind(this) })
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Comments;
})(Component);

var stateToProps = function (state) {
  return {
    commentsMap: state.comment.map,
    commentsLoaded: state.comment.commentsLoaded,
    zoneIndex: state.zone.selectedZone,
    zones: state.zone.list,
    user: state.account.user
  };
};

var dispatchToProps = function (dispatch) {
  return {
    commentsReceived: function (comments, zone) {
      return dispatch(actions.commentsReceived(comments, zone));
    },
    commentCreated: function (comment) {
      return dispatch(actions.commentCreated(comment));
    },
    updateComment: function (comment, params) {
      return dispatch(actions.updateComment(comment, params));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(Comments);