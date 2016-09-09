"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = join;

var _points = require("point/points");

var _is = require("point/is");

var _clean = require("path/clean");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Joins the paths and returns one global path
 * e.g. join([
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 * ],
 * [
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 200, y: 200, parameters: {} },
 * ], true)
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "L", x: 100, y: 100, parameters: {} },
 *   { code: "z", x: 0, y: 0, parameters: {} },
 *   { code: "M", x: 100, y: 100, parameters: {} },
 *   { code: "L", x: 200, y: 200, parameters: {} },
 *   { code: "z", x: 100, y: 100, parameters: {} },
 * ]
 */
function join(paths) {
  var shouldClose = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  return paths.reduce(function (acc, path) {
    if (shouldClose) {
      path = (0, _clean.makeSureFirstPointsAreM)(path);

      return [].concat(_toConsumableArray(acc), _toConsumableArray(path), _toConsumableArray(!(0, _is.isZ)(path[path.length - 1]) && [(0, _points.z)(path[0])]));
    }

    return [].concat(_toConsumableArray(acc), _toConsumableArray(path));
  }, []);
}