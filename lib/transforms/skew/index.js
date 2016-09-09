"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = skew;

var _matrixOrigin = require("transforms/matrix-origin");

var _matrixOrigin2 = _interopRequireDefault(_matrixOrigin);

var _utils = require("utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function skew(path, thetaX, thetaY) {
  var x = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
  var y = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

  if (typeof thetaY === "undefined") {
    thetaY = thetaX;
  }

  if (typeof thetaX === "string") {
    thetaX = (0, _utils.degToRad)((0, _utils.parseDeg)(thetaX));
  }

  if (typeof thetaY === "string") {
    thetaY = (0, _utils.degToRad)((0, _utils.parseDeg)(thetaY));
  }

  return (0, _matrixOrigin2.default)(path, [1, Math.tan(thetaX), 0, Math.tan(thetaY), 1, 0, 0, 0, 1], x, y);
}