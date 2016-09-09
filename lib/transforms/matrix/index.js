"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = matrix;
exports.multiply3x1 = multiply3x1;

var _points = require("point/points");

var _points2 = _interopRequireDefault(_points);

var _is = require("point/is");

var _isRelative = require("point/is-relative");

var _isRelative2 = _interopRequireDefault(_isRelative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function matrix(path, m) {
  var lastComputedPoint = _points.defaultPoint;

  return path.map(function (point, index) {
    var prev = index > 0 && path[index - 1];

    var px = typeof point.x === "number" ? point.x : prev.x;
    var py = typeof point.y === "number" ? point.y : prev.y;
    var px1 = typeof point.parameters.x1 === "number" && point.parameters.x1;
    var py1 = typeof point.parameters.y1 === "number" && point.parameters.y1;
    var px2 = typeof point.parameters.x2 === "number" && point.parameters.x2;
    var py2 = typeof point.parameters.y2 === "number" && point.parameters.y2;

    // compute position

    var _multiply3x = multiply3x1(m, [px, py, 1]);

    var _multiply3x2 = _slicedToArray(_multiply3x, 2);

    var x = _multiply3x2[0];
    var y = _multiply3x2[1];

    // get point code

    var code = point.code;

    if ((0, _is.isH)(point) && y !== lastComputedPoint.y || (0, _is.isV)(point) && x !== lastComputedPoint.x) {
      code = (0, _isRelative2.default)(point) ? "l" : "L";
    }

    // compute parameters
    var x1 = void 0,
        y1 = void 0,
        x2 = void 0,
        y2 = void 0;

    if (px1 !== false && py1 !== false) {
      var _multiply3x3 = multiply3x1(m, [px1, py1, 1]);

      var _multiply3x4 = _slicedToArray(_multiply3x3, 2);

      x1 = _multiply3x4[0];
      y1 = _multiply3x4[1];
    }

    if (px2 !== false && py2 !== false) {
      var _multiply3x5 = multiply3x1(m, [px2, py2, 1]);

      var _multiply3x6 = _slicedToArray(_multiply3x5, 2);

      x2 = _multiply3x6[0];
      y2 = _multiply3x6[1];
    }

    var parameters = _extends({}, point.parameters, typeof x1 !== "undefined" && { x1: x1 }, typeof y1 !== "undefined" && { y1: y1 }, typeof x2 !== "undefined" && { x2: x2 }, typeof y2 !== "undefined" && { y2: y2 });

    // this point will be used to know if the next H or V
    // should be converted into L
    lastComputedPoint = (0, _points2.default)(code, x, y, parameters);

    return lastComputedPoint;
  });
}

function multiply3x1(a, b) {
  var a00 = a[0 * 3 + 0];
  var a01 = a[0 * 3 + 1];
  var a02 = a[0 * 3 + 2];
  var a10 = a[1 * 3 + 0];
  var a11 = a[1 * 3 + 1];
  var a12 = a[1 * 3 + 2];
  var a20 = a[2 * 3 + 0];
  var a21 = a[2 * 3 + 1];
  var a22 = a[2 * 3 + 2];
  var b0 = b[0];
  var b1 = b[1];
  var b2 = b[2];

  return [a00 * b0 + a01 * b1 + a02 * b2, a10 * b0 + a11 * b1 + a12 * b2, a20 * b0 + a21 * b1 + a22 * b2];
}