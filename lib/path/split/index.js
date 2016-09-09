"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = split;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function split(path, separators) {
  var shouldKeep = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  if (!Array.isArray(separators)) {
    separators = [separators];
  }

  return path.reduce(function (acc, point, index) {
    if (separators.includes(point.code) || index === 0) {
      return [].concat(_toConsumableArray(acc), [shouldKeep || index === 0 ? [point] : []]);
    }

    var subpath = [].concat(_toConsumableArray(acc[acc.length - 1]), [point]);

    return [].concat(_toConsumableArray(acc.slice(0, acc.length - 1)), [subpath]);
  }, []);
}