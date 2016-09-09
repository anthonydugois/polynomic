"use strict";

var _chai = require("chai");

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

var _isEqual = require("path/is-equal");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _reverse = require("path/reverse");

var _reverse2 = _interopRequireDefault(_reverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("reverse-path", function () {
  it("should reverse the path", function () {
    var path = (0, _parse2.default)("M 0 0 H 100 Q 150 0 150 100 T 200 150 T 250 200 V 200 A 50 50 0 0 1 250 250 V 350 H 350 C 400 350 400 450 400 550 S 400 700 300 700 z M 500 350 L 450 250 V 100 H 600 L 650 250 T 655 250 S 20 20 20 20 z");
    var test = (0, _reverse2.default)(path);
    var expected = "M20 20C20 20 655 250 655 250Q650 250 650 250L600 100H450V250L500 350zM300 700C400 700 400 650 400 550C400 450 400 350 350 350H250V250A50 50 0 0 0 250 200V200Q250 100 200 150Q150 200 150 100Q150 0 100 0H0z";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });

  it("should reverse the reversed path and give the exact initial path", function () {
    var path = (0, _parse2.default)("M0 0 L100 0 L100 100");
    var reversed = (0, _reverse2.default)(path);
    var test = (0, _reverse2.default)(reversed);
    var expected = path;

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });
});