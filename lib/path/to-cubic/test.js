"use strict";

var _chai = require("chai");

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

var _isEqual = require("path/is-equal");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _toCubic = require("path/to-cubic");

var _toCubic2 = _interopRequireDefault(_toCubic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("path/to-cubics", function () {
  it("should convert points into cubic curves", function () {
    var path = (0, _parse2.default)("M0 0L100 0L100 100");
    var test = (0, _toCubic2.default)(path);
    var expected = "M0 0C0 0 100 0 100 0C100 0 100 100 100 100";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });
});