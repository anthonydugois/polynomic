"use strict";

var _chai = require("chai");

var _parse = require("pathstring/parse");

var _parse2 = _interopRequireDefault(_parse);

var _isEqual = require("path/is-equal");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _matrix = require("transforms/matrix");

var _matrix2 = _interopRequireDefault(_matrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("matrix-path", function () {
  it("should multiply two matrix", function () {
    _chai.assert.deepEqual((0, _matrix.multiply3x1)([1, 2, 3, 2, 1, 3, 3, 2, 1], [2, 2, 2]), [12, 12, 12]);
  });

  it("should apply the matrix to each coordinate", function () {
    var m = [1, 0, 100, 0, 1, 100, 0, 0, 1];
    var path = (0, _parse2.default)("M0 0L100 100Q150 150 200 200");
    var test = (0, _matrix2.default)(path, m);
    var expected = "M100 100L200 200Q250 250 300 300";

    _chai.assert.isTrue((0, _isEqual2.default)(test, expected));
  });
});