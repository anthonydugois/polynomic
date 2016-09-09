"use strict";

var _chai = require("chai");

var _points = require("point/points");

var _is = require("point/is");

describe("point-is", function () {
  it("should check that the point is M", function () {
    _chai.assert.isTrue((0, _is.isM)((0, _points.m)(0, 0)));
  });

  it("should check that the point is Q", function () {
    _chai.assert.isTrue((0, _is.isQ)((0, _points.Q)(20, 20, 0, 0)));
  });

  it("should check that the point is not Z", function () {
    _chai.assert.isFalse((0, _is.isZ)((0, _points.L)(0, 0)));
  });
});