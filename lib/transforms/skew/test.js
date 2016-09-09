"use strict";

var _chai = require("chai");

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

var _build = require("pathstring/build");

var _build2 = _interopRequireDefault(_build);

var _isEqual = require("path/is-equal");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _skew = require("transforms/skew");

var _skew2 = _interopRequireDefault(_skew);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("skew-path", function () {
  var path = (0, _parse2.default)("M0 0L100 0L100 100");

  it("should skew the path of PI/6 on x and y", function () {
    var test = (0, _build2.default)((0, _skew2.default)(path, Math.PI / 6, Math.PI / 6));
    var expected = "M0 0L100 57.735L157.735 157.735";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });

  it("should skew the path of PI/6 on x", function () {
    var test = (0, _build2.default)((0, _skew2.default)(path, Math.PI / 6, 0));
    var expected = "M0 0L100 0L157.735 100";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });

  it("should skew the path of PI/6 on y", function () {
    var test = (0, _build2.default)((0, _skew2.default)(path, 0, Math.PI / 6));
    var expected = "M0 0L100 57.735L100 157.735";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });
});