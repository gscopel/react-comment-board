"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Profile = require("../containers").Profile;
var ProfileDetail = (function (Component) {
  function ProfileDetail() {
    _classCallCheck(this, ProfileDetail);

    if (Component != null) {
      Component.apply(this, arguments);
    }
  }

  _inherits(ProfileDetail, Component);

  _prototypeProperties(ProfileDetail, null, {
    componentDidMount: {
      value: function componentDidMount() {
        console.log("componentDidMount: " + JSON.stringify(this.props.match.params));
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          null,
          "ProfileDetail Entry Point",
          React.createElement(Profile, { username: this.props.match.params.username })
        );
      },
      writable: true,
      configurable: true
    }
  });

  return ProfileDetail;
})(Component);

module.exports = ProfileDetail;