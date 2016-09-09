"use strict";

var _chai = require("chai");

var _points = require("point/points");

var _isRelative = require("point/is-relative");

var _isRelative2 = _interopRequireDefault(_isRelative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("point-is-relative", function () {
  it("should check that the command `m` is relative", function () {
    _chai.assert.isTrue((0, _isRelative2.default)((0, _points.m)(0, 0)));
  });

  it("should check that the command `M` is absolute", function () {
    _chai.assert.isFalse((0, _isRelative2.default)((0, _points.M)(0, 0)));
  });
});