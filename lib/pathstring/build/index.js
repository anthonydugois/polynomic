"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = build;

var _points = require("point/points");

/**
 * This object references all the functions which build pathstring segments.
 * Every functions take the same signature (point, prev) and return a string.
 * e.g. builder.l(
 *   { code: "l", x: 150, y: 150, parameters: {} }, <-- the point you want
 *   { code: "m", x: 100, y: 100, parameters: {} }, <-- the previous point used to compute relative coords
 * )
 * --> "l50 50"
 */
var builder = {
  m: function m(_ref, prev) {
    var x = _ref.x;
    var y = _ref.y;

    return r(x - prev.x) + " " + r(y - prev.y);
  },
  M: function M(_ref2) {
    var x = _ref2.x;
    var y = _ref2.y;

    return r(x) + " " + r(y);
  },
  l: function l(_ref3, prev) {
    var x = _ref3.x;
    var y = _ref3.y;

    return r(x - prev.x) + " " + r(y - prev.y);
  },
  L: function L(_ref4) {
    var x = _ref4.x;
    var y = _ref4.y;

    return r(x) + " " + r(y);
  },
  h: function h(_ref5, prev) {
    var x = _ref5.x;

    return "" + r(x - prev.x);
  },
  H: function H(_ref6) {
    var x = _ref6.x;

    return "" + r(x);
  },
  v: function v(_ref7, prev) {
    var y = _ref7.y;

    return "" + r(y - prev.y);
  },
  V: function V(_ref8) {
    var y = _ref8.y;

    return "" + r(y);
  },
  q: function q(_ref9, prev) {
    var x = _ref9.x;
    var y = _ref9.y;
    var parameters = _ref9.parameters;

    return r(parameters.x1 - prev.x) + " " + r(parameters.y1 - prev.y) + " " + r(x - prev.x) + " " + r(y - prev.y);
  },
  Q: function Q(_ref10) {
    var x = _ref10.x;
    var y = _ref10.y;
    var parameters = _ref10.parameters;

    return r(parameters.x1) + " " + r(parameters.y1) + " " + r(x) + " " + r(y);
  },
  t: function t(_ref11, prev) {
    var x = _ref11.x;
    var y = _ref11.y;
    var parameters = _ref11.parameters;

    return r(x - prev.x) + " " + r(y - prev.y);
  },
  T: function T(_ref12) {
    var x = _ref12.x;
    var y = _ref12.y;
    var parameters = _ref12.parameters;

    return r(x) + " " + r(y);
  },
  c: function c(_ref13, prev) {
    var x = _ref13.x;
    var y = _ref13.y;
    var parameters = _ref13.parameters;

    return r(parameters.x1 - prev.x) + " " + r(parameters.y1 - prev.y) + " " + r(parameters.x2 - prev.x) + " " + r(parameters.y2 - prev.y) + " " + r(x - prev.x) + " " + r(y - prev.y);
  },
  C: function C(_ref14) {
    var x = _ref14.x;
    var y = _ref14.y;
    var parameters = _ref14.parameters;

    return r(parameters.x1) + " " + r(parameters.y1) + " " + r(parameters.x2) + " " + r(parameters.y2) + " " + r(x) + " " + r(y);
  },
  s: function s(_ref15, prev) {
    var x = _ref15.x;
    var y = _ref15.y;
    var parameters = _ref15.parameters;

    return r(parameters.x2 - prev.x) + " " + r(parameters.y2 - prev.y) + " " + r(x - prev.x) + " " + r(y - prev.y);
  },
  S: function S(_ref16) {
    var x = _ref16.x;
    var y = _ref16.y;
    var parameters = _ref16.parameters;

    return r(parameters.x2) + " " + r(parameters.y2) + " " + r(x) + " " + r(y);
  },
  a: function a(_ref17, prev) {
    var x = _ref17.x;
    var y = _ref17.y;
    var parameters = _ref17.parameters;

    return r(parameters.rx) + " " + r(parameters.ry) + " " + r(parameters.rotation) + " " + parameters.large + " " + parameters.sweep + " " + r(x - prev.x) + " " + r(y - prev.y);
  },
  A: function A(_ref18) {
    var x = _ref18.x;
    var y = _ref18.y;
    var parameters = _ref18.parameters;

    return r(parameters.rx) + " " + r(parameters.ry) + " " + r(parameters.rotation) + " " + parameters.large + " " + parameters.sweep + " " + r(x) + " " + r(y);
  },
  z: function z() {
    return "";
  },
  Z: function Z() {
    return "";
  }
};

function r(n) {
  var precision = arguments.length <= 1 || arguments[1] === undefined ? 3 : arguments[1];

  var coef = Math.pow(10, precision);
  return Math.round(n * coef) / coef;
}

/**
 * Transforms a formatted point list into pathstring
 * e.g. [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "l", x: 50, y: 50, parameters: {} },
 *   { code: "q", x: 150, y: 150, parameters: { x1: 100, y1: 100 } },
 * ]
 * --> "M0 0 l50 50 q50 50 100 100"
 */
function build(points) {
  return points.reduce(function (acc, point, index) {
    return "" + acc + point.code + builder[point.code](point, index > 0 ? points[index - 1] : _points.defaultPoint);
  }, "").replace(/\s+/g, " ");
}