"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _points = require("point/points");

var points = _interopRequireWildcard(_points);

var _is = require("point/is");

var asserts = _interopRequireWildcard(_is);

var _isInside = require("point/is-inside");

var _isInside2 = _interopRequireDefault(_isInside);

var _isRelative = require("point/is-relative");

var _isRelative2 = _interopRequireDefault(_isRelative);

var _distance = require("point/distance");

var _distance2 = _interopRequireDefault(_distance);

var _minMax = require("point/min-max");

var _toCubic = require("point/to-cubic");

var _toCubic2 = _interopRequireDefault(_toCubic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = _extends({
  Point: points.default,
  is: asserts.default,
  isInside: _isInside2.default,
  isRelative: _isRelative2.default,
  distance: _distance2.default,
  min: _minMax.min,
  max: _minMax.max,
  toCubic: _toCubic2.default
}, asserts, points);