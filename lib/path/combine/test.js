"use strict";

var _chai = require("chai");

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

var _isEqual = require("path/is-equal");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _combine = require("path/combine");

var _combine2 = _interopRequireDefault(_combine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("combine-path", function () {
  it("should combine compound path", function () {
    var path = (0, _parse2.default)("M0 0h50v50z m100 100h100v100z");
    var test = (0, _combine2.default)(path);
    var expected = "M0 0h50v50 l50 50h100v100z";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });
});