"use strict";

var _chai = require("chai");

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

var _isEqual = require("path/is-equal");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _simplify = require("path/simplify");

var _simplify2 = _interopRequireDefault(_simplify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("path/simplify", function () {
  it("should simplify the path", function () {
    var path = (0, _parse2.default)("M0 0 L50 0 L100 5");
    var test = (0, _simplify2.default)(path, 5);
    var expected = "M0 0 L100 5";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });

  it("shouldn't simplify the path", function () {
    var path = (0, _parse2.default)("M0 0 L50 0 L100 5");
    var test = (0, _simplify2.default)(path, 1);
    var expected = "M0 0 L50 0 L100 5";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });
});