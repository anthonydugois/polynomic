"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = translate;

var _matrix = require("transforms/matrix");

var _matrix2 = _interopRequireDefault(_matrix);

var _utils = require("utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function translate(path, dx, dy) {
  var coords = (0, _utils.absoluteCoords)(path, dx, dy);

  return (0, _matrix2.default)(path, [1, 0, coords.x, 0, 1, coords.y, 0, 0, 1]);
}