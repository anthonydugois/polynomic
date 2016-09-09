"use strict";

var _chai = require("chai");

var _points = require("point/points");

var points = _interopRequireWildcard(_points);

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe("parse-pathstring", function () {
  it("should parse the code and return an array of segments", function () {
    var test = (0, _parse.getSegments)("M0 0l50 50 20 -20Q 30, 30, 60, 60t20 20C80 80 60,60 5 5s -5 6 2,2 zm 50 50z");
    var expected = [["M", 0, 0], ["l", 50, 50, 20, -20], ["Q", 30, 30, 60, 60], ["t", 20, 20], ["C", 80, 80, 60, 60, 5, 5], ["s", -5, 6, 2, 2], ["z"], ["m", 50, 50], ["z"]];

    _chai.assert.deepEqual(test, expected);
  });

  it("should parse the code and return an array of points", function () {
    var test = (0, _parse2.default)("M0 0l50 50 20 -20Q 30, 30, 60, 60t20 20C80 80 60,60 5 5s -5 6 2,2 zm 50 50z");
    var expected = [points.M(0, 0), points.l(50, 50, points.M(0, 0)), points.l(20, -20, points.l(50, 50, points.M(0, 0))), points.Q(30, 30, 60, 60), points.t(20, 20, points.Q(30, 30, 60, 60)), points.C(80, 80, 60, 60, 5, 5), points.s(-5, 6, 2, 2, points.C(80, 80, 60, 60, 5, 5)), points.z(points.M(0, 0)), points.m(50, 50, points.z(points.M(0, 0))), points.z(points.m(50, 50, points.z(points.M(0, 0))))];

    _chai.assert.deepEqual(test, expected);
  });

  it("should parse the invalid code and return an empty array", function () {
    var test = (0, _parse2.default)("___:(___");
    var expected = [];

    _chai.assert.deepEqual(test, expected);
  });
});