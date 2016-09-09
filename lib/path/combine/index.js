"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combine;

var _points = require("point/points");

var _is = require("point/is");

var _isRelative = require("point/is-relative");

var _isRelative2 = _interopRequireDefault(_isRelative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Combines the subpaths by removing "zM" commands
 * e.g. combine([
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "z", x: 0, y: 0, parameters: {} },
 *   { code: "M", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 200, y: 200, parameters: {} },
 * ])
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 200, y: 200, parameters: {} },
 * ]
 */
function combine(path) {
  return path.reduce(function (acc, point, index) {
    if (index > 0 && (0, _is.isM)(point)) {
      return [].concat(_toConsumableArray(acc), [(0, _isRelative2.default)(point) ? (0, _points.l)(point.x, point.y) : (0, _points.L)(point.x, point.y)]);
    }

    if ((0, _is.isZ)(point)) {
      if (index === path.length - 1) {
        return [].concat(_toConsumableArray(acc), [(0, _isRelative2.default)(point) ? (0, _points.z)(path[0]) : (0, _points.Z)(path[0])]);
      }

      return acc;
    }

    return [].concat(_toConsumableArray(acc), [point]);
  }, []);
}