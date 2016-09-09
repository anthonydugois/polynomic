"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _build = require("pathstring/build");

var _build2 = _interopRequireDefault(_build);

var _isValid = require("pathstring/is-valid");

var _isValid2 = _interopRequireDefault(_isValid);

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  build: _build2.default,
  isValid: _isValid2.default,
  parse: _parse2.default
};