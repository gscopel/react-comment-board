"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _containers = require("../containers");

var Account = _containers.Account;
var Comments = _containers.Comments;
var Zones = _containers.Zones;
var Home = (function (Component) {
  function Home() {
    _classCallCheck(this, Home);

    if (Component != null) {
      Component.apply(this, arguments);
    }
  }

  _inherits(Home, Component);

  _prototypeProperties(Home, null, {
    render: {
      value: function render() {
        return React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-md-4" },
              React.createElement(Account, null),
              React.createElement(Zones, null)
            ),
            React.createElement(
              "div",
              { className: "col-md-8" },
              React.createElement(Comments, null)
            )
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Home;
})(Component);

module.exports = Home;