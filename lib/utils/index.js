"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.absoluteCoords = absoluteCoords;
exports.parseDeg = parseDeg;
exports.degToRad = degToRad;

var _boundingBox = require("path/bounding-box");

var _boundingBox2 = _interopRequireDefault(_boundingBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// alias for relative positions (%)
var POSITIONS = {
  left: 0,
  right: 100,
  top: 0,
  bottom: 100,
  center: 50
};

function relativeToAbsoluteX(x, bbox) {
  x = x.toLowerCase();
  x = Object.keys(POSITIONS).indexOf(x) > -1 ? POSITIONS[x] : parseRelative(x);

  return bbox.x + bbox.width * x / 100;
}

function relativeToAbsoluteY(y, bbox) {
  y = y.toLowerCase();
  y = Object.keys(POSITIONS).indexOf(y) > -1 ? POSITIONS[y] : parseRelative(y);

  return bbox.y + bbox.height * y / 100;
}

function parseRelative(str) {
  return parseFloat(str.replace("%", ""));
}

function absoluteCoords(path, x, y) {
  if (typeof x === "string" || typeof y === "string") {
    var bbox = (0, _boundingBox2.default)(path);

    if (typeof x === "string") {
      x = relativeToAbsoluteX(x, bbox);
    }

    if (typeof y === "string") {
      y = relativeToAbsoluteY(y, bbox);
    }
  }

  return { x: x, y: y };
}

function parseDeg(str) {
  return parseFloat(str.replace("deg", ""));
}

function degToRad(deg) {
  return Math.PI / 180 * deg;
}