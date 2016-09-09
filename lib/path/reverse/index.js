"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reverse;

var _points = require("point/points");

var _points2 = _interopRequireDefault(_points);

var _is = require("point/is");

var _isRelative = require("point/is-relative");

var _isRelative2 = _interopRequireDefault(_isRelative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reverse(path) {
  var reversed = [];
  var firstPointIndex = void 0;

  for (var i = 0, len = path.length; i < len; i++) {
    var insert = reversed.length;
    var point = path[i];

    if ((0, _is.isM)(point)) {
      firstPointIndex = i;
    }

    var next = i < len - 1 && !(0, _is.isZ)(path[i + 1]) ? path[i + 1] : path[firstPointIndex];

    if ((0, _is.isZ)(point)) {
      insert = firstPointIndex;
      next = point;
      point = path[i - 1];
    }

    var code = next.code;
    var parameters = next.parameters;

    if ((0, _is.isT)(next)) {
      code = (0, _isRelative2.default)(next) ? "q" : "Q";
    }

    if ((0, _is.isS)(next)) {
      code = (0, _isRelative2.default)(next) ? "c" : "C";
    }

    if ((0, _is.isC)(next) || (0, _is.isS)(next)) {
      parameters = reverseAnchors(parameters);
    }

    if ((0, _is.isA)(next)) {
      parameters = reverseArc(parameters);
    }

    reversed.splice(insert, 0, (0, _points2.default)(code, point.x, point.y, parameters));
  }

  return reversed.reverse();
}

function reverseAnchors(parameters) {
  return _extends({}, parameters, {
    x1: parameters.x2,
    y1: parameters.y2,
    x2: parameters.x1,
    y2: parameters.y1
  });
}

function reverseArc(parameters) {
  return _extends({}, parameters, {
    sweep: parameters.sweep ^ 1
  });
}