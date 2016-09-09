"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.min = min;
exports.max = max;

var _points = require("point/points");

var _points2 = _interopRequireDefault(_points);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function min(p1, p2) {
  return (0, _points2.default)(null, Math.min(p1.x, p2.x), Math.min(p1.y, p2.y));
}

function max(p1, p2) {
  return (0, _points2.default)(null, Math.max(p1.x, p2.x), Math.max(p1.y, p2.y));
}