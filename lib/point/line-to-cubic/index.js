"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lineToCubic;

var _points = require("point/points");

var _isRelative = require("point/is-relative");

var _isRelative2 = _interopRequireDefault(_isRelative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function lineToCubic(prev, point) {
  return (0, _isRelative2.default)(point) ? (0, _points.c)(prev.x, prev.y, point.x, point.y, point.x, point.y) : (0, _points.C)(prev.x, prev.y, point.x, point.y, point.x, point.y);
}