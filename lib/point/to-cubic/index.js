"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toCubic;

var _is = require("point/is");

var _lineToCubic = require("point/line-to-cubic");

var _lineToCubic2 = _interopRequireDefault(_lineToCubic);

var _quadraticToCubic = require("point/quadratic-to-cubic");

var _quadraticToCubic2 = _interopRequireDefault(_quadraticToCubic);

var _arcToCubic = require("point/arc-to-cubic");

var _arcToCubic2 = _interopRequireDefault(_arcToCubic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toCubic(prev, point) {
  if ((0, _is.isL)(point) || (0, _is.isH)(point) || (0, _is.isV)(point)) {
    return (0, _lineToCubic2.default)(prev, point);
  }

  if ((0, _is.isQ)(point) || (0, _is.isT)(point)) {
    return (0, _quadraticToCubic2.default)(prev, point);
  }

  if ((0, _is.isA)(point)) {
    return (0, _arcToCubic2.default)(prev, point);
  }

  return point;
}