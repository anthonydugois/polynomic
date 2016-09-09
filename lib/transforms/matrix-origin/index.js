"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matrixOrigin;

var _matrix = require("transforms/matrix");

var _matrix2 = _interopRequireDefault(_matrix);

var _translate = require("transforms/translate");

var _translate2 = _interopRequireDefault(_translate);

var _utils = require("utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function matrixOrigin(path, m) {
  var x = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
  var y = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

  var coords = (0, _utils.absoluteCoords)(path, x, y);

  if (coords.x !== 0 || coords.y !== 0) {
    path = (0, _translate2.default)(path, -coords.x, -coords.y);
    path = (0, _matrix2.default)(path, m);
    path = (0, _translate2.default)(path, coords.x, coords.y);
  } else {
    path = (0, _matrix2.default)(path, m);
  }

  return path;
}