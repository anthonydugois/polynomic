"use strict";

var _chai = require("chai");

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

var _build = require("pathstring/build");

var _build2 = _interopRequireDefault(_build);

var _isEqual = require("path/is-equal");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _isValid = require("pathstring/is-valid");

var _isValid2 = _interopRequireDefault(_isValid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("build-pathstring", function () {
  var expected = "M0 0l10 10z m0 0L100,56Q10 10 50 60t10,10c10 20 30 40 50 60s400 350 236 241a50,50,0,1,0,50,50Z";
  var test = (0, _build2.default)((0, _parse2.default)(expected));

  it("should build a pathstring from array of points", function () {
    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });

  it("should build a valid pathstring", function () {
    _chai.assert.isTrue((0, _isValid2.default)(test));
  });
});