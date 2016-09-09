"use strict";

var _chai = require("chai");

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

var _isEqual = require("path/is-equal");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _split = require("path/split");

var _split2 = _interopRequireDefault(_split);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("split-path", function () {
  it("should split the path in three subpaths", function () {
    var path = (0, _parse2.default)("M0 0L100 0L100 100zM100 100L200 100L200 200zM200 200L300 200L300 300");
    var test = (0, _split2.default)(path, "z");

    _chai.assert.isTrue((0, _isEqual2.default)(test[0], "M0 0L100 0L100 100"));
    _chai.assert.isTrue((0, _isEqual2.default)(test[1], "M100 100L200 100L200 200"));
    _chai.assert.isTrue((0, _isEqual2.default)(test[2], "M200 200L300 200L300 300"));
  });
});