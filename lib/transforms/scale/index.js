"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scale;

var _matrixOrigin = require("transforms/matrix-origin");

var _matrixOrigin2 = _interopRequireDefault(_matrixOrigin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scale(path, sx, sy) {
  var x = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
  var y = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

  // uniform scaling
  if (typeof sy === "undefined") {
    sy = sx;
  }

  return (0, _matrixOrigin2.default)(path, [sx, 0, 0, 0, sy, 0, 0, 0, 1], x, y);
}