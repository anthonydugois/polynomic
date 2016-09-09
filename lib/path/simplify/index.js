"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = simplify;

var _distance = require("point/distance");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function simplify(path, tolerance) {
  var max = 0;
  var index = 0;

  for (var i = 1, len = path.length; i < len - 1; i++) {
    var point = path[i];
    var distance = (0, _distance.distanceSegment)(point, path[0], path[path.length - 1]);

    if (distance > max) {
      index = i;
      max = distance;
    }
  }

  if (max >= tolerance) {
    var res1 = simplify(path.slice(0, index + 1), tolerance);
    var res2 = simplify(path.slice(index, path.length), tolerance);

    return [].concat(_toConsumableArray(res1.slice(0, res1.length - 1)), _toConsumableArray(res2));
  }

  return [path[0], path[path.length - 1]];
}