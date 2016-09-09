"use strict";

var _chai = require("chai");

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

var _isEqual = require("path/is-equal");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _join = require("path/join");

var _join2 = _interopRequireDefault(_join);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("join-paths", function () {
  var p1 = (0, _parse2.default)("M0 0L100 0");
  var p2 = (0, _parse2.default)("L100 100L100 200");
  var p3 = (0, _parse2.default)("M200 200h50v50");

  it("should join the paths without closing them", function () {
    var test = (0, _join2.default)([p1, p2, p3]);
    var expected = "M0 0L100 0 L100 100L100 200 M200 200h50v50";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });

  it("should join the paths and close them", function () {
    var test = (0, _join2.default)([p1, p2, p3], true);
    var expected = "M0 0L100 0z M100 100L100 200z M200 200h50v50z";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });
});