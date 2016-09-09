"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEqual;

var _deepEqual = require("deep-equal");

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isEqual(d1, d2) {
  if (typeof d1 === "string" && typeof d2 === "string") {
    return (0, _deepEqual2.default)((0, _parse2.default)(d1), (0, _parse2.default)(d2));
  } else if (Array.isArray(d1) && Array.isArray(d2)) {
    return (0, _deepEqual2.default)(d1, d2);
  } else if (typeof d1 === "string" && Array.isArray(d2)) {
    return (0, _deepEqual2.default)((0, _parse2.default)(d1), d2);
  } else if (Array.isArray(d1) && typeof d2 === "string") {
    return (0, _deepEqual2.default)(d1, (0, _parse2.default)(d2));
  }

  throw new Error("isEqual() only accepts strings and arrays as parameters.");
}