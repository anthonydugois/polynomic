"use strict";

var _chai = require("chai");

var _points = require("point/points");

var _points2 = _interopRequireDefault(_points);

var _minMax = require("point/min-max");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("point-minmax", function () {
  it("should give the min point", function () {
    _chai.assert.deepEqual((0, _minMax.min)((0, _points.M)(0, 100), (0, _points.M)(100, 0)), (0, _points2.default)(null, 0, 0));
  });

  it("should give the max point", function () {
    _chai.assert.deepEqual((0, _minMax.max)((0, _points.M)(0, 100), (0, _points.M)(100, 0)), (0, _points2.default)(null, 100, 100));
  });
});