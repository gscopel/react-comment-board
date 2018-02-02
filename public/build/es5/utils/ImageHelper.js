"use strict";

module.exports = {

  thumbnail: function (url, dimen) {
    var thumbParams = "upload/c_thumb,h_" + dimen + ",w_" + dimen + ",x_0,y_0";
    return url.replace("upload", thumbParams);
  }

};