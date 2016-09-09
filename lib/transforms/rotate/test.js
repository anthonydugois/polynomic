"use strict";

var _chai = require("chai");

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

var _build = require("pathstring/build");

var _build2 = _interopRequireDefault(_build);

var _isEqual = require("path/is-equal");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _rotate = require("transforms/rotate");

var _rotate2 = _interopRequireDefault(_rotate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("rotate-path", function () {
  it("should rotate the path of PI/2", function () {
    var path = (0, _parse2.default)("M0 0L100 0");
    var test = (0, _build2.default)((0, _rotate2.default)(path, Math.PI / 2));
    var expected = "M0 0L0 100";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });

  it("should rotate the path of 90°", function () {
    var path = (0, _parse2.default)("M0 0L100 0");
    var test = (0, _build2.default)((0, _rotate2.default)(path, "90deg"));
    var expected = "M0 0L0 100";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });

  it("should rotate the path of PI/2 with a set origin", function () {
    var path = (0, _parse2.default)("M0 0L100 0");
    var test = (0, _build2.default)((0, _rotate2.default)(path, Math.PI / 2, "50%", 0));
    var expected = "M50 -50L50 50";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });
});