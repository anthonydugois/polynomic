"use strict";

var _chai = require("chai");

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

var _isEqual = require("path/is-equal");

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("path-is-equal", function () {
  describe("check equal paths", function () {
    it("should check that the paths are equal", function () {
      var test = (0, _parse2.default)("M0 0l10 10");

      _chai.assert.isTrue((0, _isEqual2.default)(test, "M0 0l10 10"));
    });

    it("should check that the pathstrings are equal", function () {
      _chai.assert.isTrue((0, _isEqual2.default)("M0,000l10 10", "M 0 0 l 10 , 10"));
    });
  });

  describe("check non-equal paths", function () {
    it("should check that the paths are not equal", function () {
      var test = (0, _parse2.default)("M0 0l10 10");

      _chai.assert.isFalse((0, _isEqual2.default)(test, "M0 0l10 10l20 20"));
    });

    it("should check that the pathstrings are not equal", function () {
      _chai.assert.isFalse((0, _isEqual2.default)("M0,0l10 10", "M 0 0 l 10 , 10l20 20"));
    });
  });
});