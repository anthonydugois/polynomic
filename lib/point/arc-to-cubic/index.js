"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = arcToCubic;

var _points = require("point/points");

var _points2 = _interopRequireDefault(_points);

var _isRelative = require("point/is-relative");

var _isRelative2 = _interopRequireDefault(_isRelative);

var _rotate = require("transforms/rotate");

var _rotate2 = _interopRequireDefault(_rotate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function arcToCubic(prev, point) {
  var center = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var partial = [];
  var cx = void 0,
      cy = void 0,
      f1 = void 0,
      f2 = void 0;

  var x1 = prev.x;
  var y1 = prev.y;
  var x2 = point.x;
  var y2 = point.y;
  var rx = point.parameters.rx;
  var ry = point.parameters.ry;

  var pi2_3 = 2 * Math.PI / 3;
  var angle = Math.PI / 180 * point.parameters.rotation;

  if (center) {
    cx = center[0];
    cy = center[1];
    f1 = center[2];
    f2 = center[3];
  } else {
    var _prev = (0, _rotate2.default)([prev], -angle)[0];
    var _point = (0, _rotate2.default)([point], -angle)[0];

    x1 = _prev.x;
    y1 = _prev.y;
    x2 = _point.x;
    y2 = _point.y;

    var x = (x1 - x2) / 2;
    var y = (y1 - y2) / 2;
    var sqX = Math.pow(x, 2);
    var sqY = Math.pow(y, 2);

    var sqRx = Math.pow(rx, 2);
    var sqRy = Math.pow(ry, 2);
    var ellipse = sqX / sqRx + sqY / sqRy;

    if (ellipse > 1) {
      ellipse = Math.sqrt(ellipse);
      rx *= ellipse;
      ry *= ellipse;
    }

    sqRx = Math.pow(rx, 2);
    sqRy = Math.pow(ry, 2);

    var sign = point.parameters.large === point.parameters.sweep ? -1 : 1;
    var k = sign * Math.sqrt(Math.abs((sqRx * sqRy - sqRx * sqY - sqRy * sqX) / (sqRx * sqY + sqRy * sqX)));

    cx = k * rx * y / ry + (x1 + x2) / 2;
    cy = k * -ry * x / rx + (y1 + y2) / 2;

    f1 = Math.asin((y1 - cy) / ry);
    f2 = Math.asin((y2 - cy) / ry);

    if (x1 < cx) {
      f1 = Math.PI - f1;
    }

    if (f1 < 0) {
      f1 += 2 * Math.PI;
    }

    if (x2 < cx) {
      f2 = Math.PI - f2;
    }

    if (f2 < 0) {
      f2 += 2 * Math.PI;
    }

    if (point.parameters.sweep === 1 && f1 > f2) {
      f1 -= 2 * Math.PI;
    }

    if (point.parameters.sweep === 0 && f2 > f1) {
      f2 -= 2 * Math.PI;
    }
  }

  if (Math.abs(f2 - f1) > pi2_3) {
    var _f2 = f2;
    var _point2 = (0, _points2.default)(point.code, x2, y2, point.parameters);

    f2 = f1 + pi2_3 * (point.parameters.sweep === 1 && f2 > f1 ? 1 : -1);
    x2 = cx + rx * Math.cos(f2);
    y2 = cy + ry * Math.sin(f2);

    var _prev2 = (0, _points2.default)(prev.code, x2, y2, prev.parameters);

    partial = arcToCubic(_prev2, _point2, [cx, cy, f2, _f2]);
  }

  var t = Math.tan((f2 - f1) / 4);
  var hx = 4 / 3 * rx * t;
  var hy = 4 / 3 * ry * t;

  var p1 = [x1, y1];
  var p2 = [x1 + hx * Math.sin(f1), y1 - hy * Math.cos(f1)];
  var p3 = [x2 + hx * Math.sin(f2), y2 - hy * Math.cos(f2)];
  var p4 = [x2, y2];

  p2[0] = 2 * p1[0] - p2[0];
  p2[1] = 2 * p1[1] - p2[1];

  var cubic = (0, _isRelative2.default)(point) ? (0, _points.c)(p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]) : (0, _points.C)(p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]);

  if (center) {
    return [cubic].concat(_toConsumableArray(partial));
  }

  return (0, _rotate2.default)([cubic].concat(_toConsumableArray(partial)), angle);
}