"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = quadraticToCubic;

var _points = require("point/points");

var _isRelative = require("point/is-relative");

var _isRelative2 = _interopRequireDefault(_isRelative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function quadraticToCubic(prev, point) {
  var x1 = 1 / 3 * prev.x + 2 / 3 * point.parameters.x1;
  var y1 = 1 / 3 * prev.y + 2 / 3 * point.parameters.y1;
  var x2 = 1 / 3 * point.x + 2 / 3 * point.parameters.x1;
  var y2 = 1 / 3 * point.y + 2 / 3 * point.parameters.y1;

  return (0, _isRelative2.default)(point) ? (0, _points.c)(x1, y1, x2, y2, point.x, point.y) : (0, _points.C)(x1, y1, x2, y2, point.x, point.y);
}