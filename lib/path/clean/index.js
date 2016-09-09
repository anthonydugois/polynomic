"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clean;
exports.simplifyClosures = simplifyClosures;
exports.makeSureFirstPointsAreM = makeSureFirstPointsAreM;
exports.removeConsecutiveSamePoints = removeConsecutiveSamePoints;

var _points = require("point/points");

var _is = require("point/is");

var _isRelative = require("point/is-relative");

var _isRelative2 = _interopRequireDefault(_isRelative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Cleans the given path
 * e.g. clean([
 *   { code: "L", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 0, y: 0, parameters: {} },
 * ])
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "z", x: 0, y: 0, parameters: {} },
 * ]
 */
function clean(path) {
  return simplifyClosures(makeSureFirstPointsAreM(removeConsecutiveSamePoints(path)));
}

/**
 * Close the path with the "z" command if the
 * first point and the last point are the same
 * e.g. simplifyClosures([
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 0, y: 0, parameters: {} },
 * ])
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "z", x: 0, y: 0, parameters: {} },
 * ]
 */
function simplifyClosures(path) {
  var first = void 0;

  return path.map(function (point) {
    if ((0, _is.isM)(point)) {
      first = point;
    }

    if (shouldSimplifyClosure(first, point)) {
      return (0, _points.z)(first);
    }

    return point;
  });
}

function shouldSimplifyClosure(first, point) {
  return ((0, _is.isL)(point) || (0, _is.isH)(point) || (0, _is.isV)(point)) && first.x === point.x && first.y === point.y;
}

/**
 * Make sure that the path starts with the "m" command
 * e.g. makeSureFirstPointsAreM([
 *   { code: "L", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 * ])
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 * ]
 */
function makeSureFirstPointsAreM(path) {
  return path.map(function (point, index) {
    if (index === 0 && !(0, _is.isM)(point)) {
      return (0, _isRelative2.default)(point) ? (0, _points.m)(point.x, point.y) : (0, _points.M)(point.x, point.y);
    }

    if (index > 0 && (0, _is.isZ)(path[index - 1]) && !(0, _is.isM)(point)) {
      var prev = path[index - 1];

      return (0, _isRelative2.default)(point) ? (0, _points.m)(point.x, point.y, prev) : (0, _points.M)(point.x, point.y, prev);
    }

    return point;
  });
}

/**
 * Simplifies the path by removing consecutive same points
 * e.g. removeConsecutiveSamePoints([
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 * ])
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 * ]
 */
function removeConsecutiveSamePoints(path) {
  return path.reduce(function (acc, point, index) {
    var prev = index > 0 && acc[acc.length - 1];

    if (prev && prev.x === point.x && prev.y === point.y) {
      return acc;
    }

    return [].concat(_toConsumableArray(acc), [point]);
  }, []);
}