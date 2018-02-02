"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var Dropzone = _interopRequire(require("react-dropzone"));

var _utils = require("../../utils");

var APIManager = _utils.APIManager;
var ImageHelper = _utils.ImageHelper;
var sha1 = _interopRequire(require("sha1"));

var CurrentUser = (function (Component) {
  function CurrentUser() {
    _classCallCheck(this, CurrentUser);

    _get(Object.getPrototypeOf(CurrentUser.prototype), "constructor", this).call(this);
    this.state = {
      updatedState: {}
    };
  }

  _inherits(CurrentUser, Component);

  _prototypeProperties(CurrentUser, null, {
    componentDidMount: {
      value: function componentDidMount() {
        console.log("componentDidMount: " + JSON.stringify(this.props.user));
      },
      writable: true,
      configurable: true
    },
    updateCurrentUser: {
      value: function updateCurrentUser(e) {
        e.preventDefault();
        console.log("updateCurrentUser: " + e.target.id + "==" + e.target.value);

        var updatedProfile = Object.assign({}, this.state.updatedState);
        updatedProfile[e.target.id] = e.target.value;
        this.setState({
          updatedState: updatedProfile
        });
      },
      writable: true,
      configurable: true
    },
    updateProfile: {
      value: function updateProfile(e) {
        e.preventDefault();
        console.log("updateProfile: " + JSON.stringify(this.state.updatedState));

        //Alert user if nothing was entered into input field
        if (Object.keys(this.state.updatedState).length == 0) {
          alert("It appears you did not make any changes");
          return;
        }
        this.props.updateProfile(this.props.user, this.state.updatedState);
        alert("Your information was successfully saved");
      },
      writable: true,
      configurable: true
    },
    uploadImage: {
      value: function uploadImage(files) {
        var _this = this;
        //Cloudinary API documentation guidelines
        var image = files[0];
        //console.log('uploadImage: ')
        var cloudName = "hn7c4ygti";
        var url = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";
        var timestamp = Date.now() / 1000;
        var uploadPreset = "o9nsr8bs";
        var paramsStr = "timestamp=" + timestamp + "&upload_preset=" + uploadPreset + "Fv46VeYzRpkbPK48iOHQ_lKnB34";
        var signature = sha1(paramsStr);
        var params = {
          api_key: "229545792548632",
          timestamp: timestamp,
          upload_preset: uploadPreset,
          signature: signature
        };

        APIManager.upload(url, image, params, function (err, response) {
          if (err) {
            console.log("Upload error" + JSON.stringify(err));
            return;
          }
          console.log("Upload complete: " + JSON.stringify(response.body));
          var updatedProfile = Object.assign({}, _this.state.updatedState);
          updatedProfile.image = response.body.secure_url;
          _this.setState({
            updatedState: updatedProfile
          });
        });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var currentUser = this.props.user;
        var image = this.state.updatedState.image == null ? "" : ImageHelper.thumbnail(this.state.updatedState.image, 150); //Render thumbnail
        return React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            null,
            "Welcome ",
            currentUser.username
          ),
          React.createElement("input", { type: "text", id: "username", onChange: this.updateCurrentUser.bind(this), defaultValue: currentUser.username, placeholder: "Username" }),
          React.createElement("br", null),
          React.createElement("input", { type: "text", id: "area", onChange: this.updateCurrentUser.bind(this), defaultValue: currentUser.area, placeholder: "Neighborhood" }),
          React.createElement("br", null),
          React.createElement("input", { type: "text", id: "gender", onChange: this.updateCurrentUser.bind(this), defaultValue: currentUser.gender, placeholder: "Gender" }),
          React.createElement("br", null),
          React.createElement("img", { src: image }),
          React.createElement("br", null),
          React.createElement(Dropzone, { onDrop: this.uploadImage.bind(this) }),
          React.createElement(
            "button",
            { onClick: this.updateProfile.bind(this) },
            "Update Profile"
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return CurrentUser;
})(Component);

var stateToProps = function (state) {
  return {
    user: state.account.user
  };
};

var dispatchToProps = function (dispatch) {
  return {
    updateProfile: function (profile, updatedState) {
      return dispatch(actions.updateProfile(profile, updatedState));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(CurrentUser);