"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = distance;
exports.distanceSegment = distanceSegment;

var _points = require("point/points");

var _points2 = _interopRequireDefault(_points);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function distance(p1, p2) {
  return Math.sqrt(squareDistance(p1, p2));
}

function squareDistance(p1, p2) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

function distanceSegment(p1, p2, p3) {
  return Math.sqrt(squareDistanceSegment(p1, p2, p3));
}

function squareDistanceSegment(p1, p2, p3) {
  var segment = squareDistance(p2, p3);

  if (segment === 0) {
    return squareDistance(p1, p2);
  }

  var t = Math.max(0, Math.min(1, ((p1.x - p2.x) * (p3.x - p2.x) + (p1.y - p2.y) * (p3.y - p2.y)) / segment));
  var p4 = (0, _points2.default)(null, p2.x + t * (p3.x - p2.x), p2.y + t * (p3.y - p2.y));

  return squareDistance(p1, p4);
}