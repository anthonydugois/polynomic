"use strict";

var _chai = require("chai");

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

var _isEqual = require("path/is-equal");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _clean = require("path/clean");

var _clean2 = _interopRequireDefault(_clean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("clean-path", function () {
  it("should simplify the closures of the path", function () {
    var path = (0, _parse2.default)("M0 0L100 0L100 100l-100 -100 M50 50h50v50l-50-50");
    var test = (0, _clean.simplifyClosures)(path);
    var expected = "M0 0L100 0L100 100z M50 50h50v50z";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });

  it("should make the path start with a M point", function () {
    var path = (0, _parse2.default)("L0 0zL0 0");
    var test = (0, _clean.makeSureFirstPointsAreM)(path);
    var expected = "M0 0zM0 0";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });

  it("should delete the two consecutive same points", function () {
    var path = (0, _parse2.default)("M0 0L50 50L50 50L50 50");
    var test = (0, _clean.removeConsecutiveSamePoints)(path);
    var expected = "M0 0L50 50";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });

  it("should clean the invalid path", function () {
    var path = (0, _parse2.default)("L0 0l50 50l0 0h50v50 L0 0");
    var test = (0, _clean2.default)(path);
    var expected = "M0 0l50 50h50v50z";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });
});