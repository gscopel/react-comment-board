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

var CreateZone = _presentation.CreateZone;
var Zone = _presentation.Zone;
var APIManager = require("../../utils").APIManager;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var store = _interopRequire(require("../../stores/store"));

var Zones = (function (Component) {
  function Zones() {
    _classCallCheck(this, Zones);

    _get(Object.getPrototypeOf(Zones.prototype), "constructor", this).call(this);
    this.state = {};
  }

  _inherits(Zones, Component);

  _prototypeProperties(Zones, null, {
    componentDidMount: {
      value: function componentDidMount() {
        //  console.log('componentDidMount')
        this.props.fetchZones(null);
      },
      writable: true,
      configurable: true
    },
    submitZone: {
      value: function submitZone(zone) {
        var _this = this;
        var updatedZone = Object.assign({}, zone);
        updatedZone.zipCodes = updatedZone.zipCode.split(",");
        //  console.log('submitZone: ' + JSON.stringify(updatedZone))

        APIManager.post("/api/zone", updatedZone, function (err, response) {
          if (err) {
            alert("error: " + err.message);
            return;
          }
          var zone = response.result;
          _this.props.zoneCreated(zone);
        });
      },
      writable: true,
      configurable: true
    },
    selectZone: {
      value: function selectZone(zoneIndex) {
        //  console.log('selectZone: ' + zoneIndex)
        this.props.selectZone(zoneIndex);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var _this = this;


        var listItem = this.props.list.map(function (zone, i) {
          var selected = i == _this.props.selected;
          return React.createElement(
            "li",
            { key: i },
            React.createElement(Zone, { zoneIndex: i, onSelect: _this.selectZone.bind(_this),
              isSelected: selected, currentZone: zone })
          );
        });

        var content = null;
        if (this.props.appStatus == "loading") {
          content = "Loading...";
        } else {
          content = React.createElement(
            "div",
            null,
            React.createElement(
              "ol",
              null,
              listItem
            ),
            React.createElement(CreateZone, { onCreateZone: this.submitZone.bind(this) })
          );
        }

        return React.createElement(
          "div",
          null,
          content
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Zones;
})(Component);

var stateToProps = function (state) {
  return {
    appStatus: state.zone.appStatus,
    list: state.zone.list,
    selected: state.zone.selectedZone
  };
};

var dispatchToProps = function (dispatch) {
  return {
    fetchZones: function (parmas) {
      return dispatch(actions.fetchZones(parmas));
    },
    zonesReceived: function (zones) {
      return dispatch(actions.zonesReceived(zones));
    },
    zoneCreated: function (zone) {
      return dispatch(actions.zoneCreated(zone));
    },
    selectZone: function (zoneIndex) {
      return dispatch(actions.selectZone(zoneIndex));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(Zones);
// APIManager.get('/api/zone', null, (err, response) => {
//   if (err){
//     alert('ERROR: ' + err.message)
//     return
//   }
//   const zones = response.results
//   this.props.zonesReceived(zones)
// Redux used to replace setState
// this.setState({
//   list: response.results
// })
//})
// console.log('ZONE CREATED: ' + JSON.stringify(response))
// let updatedList = Object.assign([], this.state.list)
// updatedList.push(response.result)
// this.setState({
//   list: updatedList
// })