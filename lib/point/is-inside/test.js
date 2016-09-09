"use strict";

var _chai = require("chai");

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

var _points = require("point/points");

var _isInside = require("point/is-inside");

var _isInside2 = _interopRequireDefault(_isInside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("point-is-inside", function () {
  var path = (0, _parse2.default)("M0 0L100 0L100 100L0 100");

  it("should check that the point is inside the given path", function () {
    _chai.assert.isTrue((0, _isInside2.default)((0, _points.M)(50, 50), path));
  });

  it("should check that the point is not inside the given path", function () {
    _chai.assert.isFalse((0, _isInside2.default)((0, _points.M)(400, 50), path));
  });
});