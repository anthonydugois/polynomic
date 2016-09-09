"use strict";

var _chai = require("chai");

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

var _isEqual = require("path/is-equal");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _scale = require("transforms/scale");

var _scale2 = _interopRequireDefault(_scale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("scale-path", function () {
  var path = (0, _parse2.default)("M0 0L100 0Q150 150 200 200");

  it("should scale x2 the path on x and y", function () {
    var test = (0, _scale2.default)(path, 2, 2);
    var expected = "M0 0L200 0Q300 300 400 400";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });

  it("should scale x0.5 the path on x", function () {
    var test = (0, _scale2.default)(path, .5, 1);
    var expected = "M0 0L50 0Q75 150 100 200";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });

  it("should scale x0.5 the path on y", function () {
    var test = (0, _scale2.default)(path, 1, .5);
    var expected = "M0 0L100 0Q150 75 200 100";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });
});