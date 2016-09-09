"use strict";

var _chai = require("chai");

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

var _isEqual = require("path/is-equal");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _translate = require("transforms/translate");

var _translate2 = _interopRequireDefault(_translate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("translate-path", function () {
  it("should translate the path of 100px on x and y", function () {
    var path = (0, _parse2.default)("M0 0L100 0Q150 150 200 200");
    var test = (0, _translate2.default)(path, 100, 100);
    var expected = "M100 100L200 100Q250 250 300 300";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });

  it("should translate the path of 100px on x", function () {
    var path = (0, _parse2.default)("M0 0L100 0Q150 150 200 200");
    var test = (0, _translate2.default)(path, 100, 0);
    var expected = "M100 0L200 0Q250 150 300 200";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });

  it("should translate the path of 100px on y", function () {
    var path = (0, _parse2.default)("M0 0L100 0Q150 150 200 200");
    var test = (0, _translate2.default)(path, 0, 100);
    var expected = "M0 100L100 100Q150 250 200 300";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });

  it("should translate the path of 50% on x and y", function () {
    var path = (0, _parse2.default)("M0 0L100 0L100 100");
    var test = (0, _translate2.default)(path, "50%", "50%");
    var expected = "M50 50L150 50L150 150";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });
});