"use strict";

var _chai = require("chai");

var _points = require("point/points");

var _distance = require("point/distance");

var _distance2 = _interopRequireDefault(_distance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("point-distance", function () {
  it("should give the distance between two points", function () {
    var test = (0, _distance2.default)((0, _points.M)(0, 0), (0, _points.M)(0, 100));
    var expected = 100;

    _chai.assert.strictEqual(test, expected);
  });

  it("should give the distance between a point and a segment", function () {
    var test = (0, _distance.distanceSegment)((0, _points.M)(100, 50), (0, _points.M)(0, 0), (0, _points.M)(0, 100));
    var expected = 100;

    _chai.assert.strictEqual(test, expected);
  });

  it("should give the distance between a point and a segment", function () {
    var test = (0, _distance.distanceSegment)((0, _points.M)(0, 200), (0, _points.M)(0, 0), (0, _points.M)(0, 100));
    var expected = 100;

    _chai.assert.strictEqual(test, expected);
  });
});