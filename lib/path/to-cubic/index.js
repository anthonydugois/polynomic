"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toCubic;

var _toCubic = require("point/to-cubic");

var _toCubic2 = _interopRequireDefault(_toCubic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function toCubic(path) {
  return path.reduce(function (acc, point, index) {
    var prev = index > 0 && path[index - 1];
    var cubic = (0, _toCubic2.default)(prev, point);

    return [].concat(_toConsumableArray(acc), _toConsumableArray(Array.isArray(cubic) ? cubic : [cubic]));
  }, []);
}