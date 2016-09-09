"use strict";

var _chai = require("chai");

var _isValid = require("pathstring/is-valid");

var _isValid2 = _interopRequireDefault(_isValid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("pathstring-is-valid", function () {
  describe("check valid pathstrings", function () {
    it("should check that pathstrings are valid", function () {
      _chai.assert.isTrue((0, _isValid2.default)("M0,0"));
      _chai.assert.isTrue((0, _isValid2.default)("M0,0l0 0"));
      _chai.assert.isTrue((0, _isValid2.default)("M0,0l0 0a50 50, 0,1,0 -10 10"));
    });
  });

  describe("check invalid pathstrings", function () {
    it("should check that there is a missing M point", function () {
      _chai.assert.isFalse((0, _isValid2.default)("l10,10"));
    });

    it("should check that there is not the correct number of parameters", function () {
      _chai.assert.isFalse((0, _isValid2.default)("M0"));
      _chai.assert.isFalse((0, _isValid2.default)("q10 20,30"));
    });

    it("should check that there are invalid characters", function () {
      _chai.assert.isFalse((0, _isValid2.default)("M/10__10"));
    });
  });
});