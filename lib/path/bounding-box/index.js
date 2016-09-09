"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = boundingBox;

var _points = require("point/points");

var _points2 = _interopRequireDefault(_points);

var _is = require("point/is");

var _toCubic = require("path/to-cubic");

var _toCubic2 = _interopRequireDefault(_toCubic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function boundingBox(rawPath) {
  var path = (0, _toCubic2.default)(rawPath);
  var x = [];
  var y = [];

  for (var i = 0; i < path.length; i++) {
    var point = path[i];
    var prev = i > 0 && path[i - 1];

    if ((0, _is.isM)(point) || (0, _is.isZ)(point)) {
      x.push(point.x);
      y.push(point.y);
    } else {
      var _cubicBoundingBox = cubicBoundingBox(prev, point);

      var _xMin = _cubicBoundingBox.xMin;
      var _xMax = _cubicBoundingBox.xMax;
      var _yMin = _cubicBoundingBox.yMin;
      var _yMax = _cubicBoundingBox.yMax;


      x.push(_xMin, _xMax);
      y.push(_yMin, _yMax);
    }
  }

  var xMin = Math.min.apply(Math, x);
  var xMax = Math.max.apply(Math, x);
  var yMin = Math.min.apply(Math, y);
  var yMax = Math.max.apply(Math, y);

  return {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin
  };
}

function cubicBoundingBox(prev, point) {
  var p0 = (0, _points2.default)(null, prev.x, prev.y);
  var p1 = (0, _points2.default)(null, point.parameters.x1, point.parameters.y1);
  var p2 = (0, _points2.default)(null, point.parameters.x2, point.parameters.y2);
  var p3 = (0, _points2.default)(null, point.x, point.y);

  var x = getMinMax(p0.x, p1.x, p2.x, p3.x);
  var y = getMinMax(p0.y, p1.y, p2.y, p3.y);

  return {
    xMin: x.min,
    xMax: x.max,
    yMin: y.min,
    yMax: y.max
  };
}

function getMinMax(p0, p1, p2, p3) {
  var a = 3 * p3 - 9 * p2 + (9 * p1 - 3 * p0);
  var b = 6 * p0 - 12 * p1 + 6 * p2;
  var c = 3 * p1 - 3 * p0;
  var d = Math.pow(b, 2) - 4 * a * c;

  var min = p0;
  var max = p0;

  if (p3 < min) {
    min = p3;
  }

  if (p3 > max) {
    max = p3;
  }

  if (d >= 0) {
    var t1 = (-b + Math.sqrt(d)) / (2 * a);

    if (t1 > 0 && t1 < 1) {
      var p = cubic(p0, p1, p2, p3, t1);

      if (p < min) {
        min = p;
      }

      if (p > max) {
        max = p;
      }
    }

    var t2 = (-b - Math.sqrt(d)) / (2 * a);

    if (t2 > 0 && t2 < 1) {
      var _p = cubic(p0, p1, p2, p3, t2);

      if (_p < min) {
        min = _p;
      }

      if (_p > max) {
        max = _p;
      }
    }
  }

  return { min: min, max: max };
}

function cubic(p0, p1, p2, p3, t) {
  return p0 * Math.pow(1 - t, 3) + p1 * 3 * t * Math.pow(1 - t, 2) + p2 * 3 * Math.pow(t, 2) * (1 - t) + p3 * Math.pow(t, 3);
}