"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rotate;

var _matrixOrigin = require("transforms/matrix-origin");

var _matrixOrigin2 = _interopRequireDefault(_matrixOrigin);

var _utils = require("utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rotate(path, theta) {
  var x = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
  var y = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

  if (typeof theta === "string") {
    theta = (0, _utils.degToRad)((0, _utils.parseDeg)(theta));
  }

  return (0, _matrixOrigin2.default)(path, [Math.cos(theta), -Math.sin(theta), 0, Math.sin(theta), Math.cos(theta), 0, 0, 0, 1], x, y);
}