"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isValid;

var _points = require("point/points");

var points = _interopRequireWildcard(_points);

var _parse = require("pathstring/parse");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function isValid(d) {
  return checkFirstM(d) && checkParametersNumber(d) && noInvalidCharacters(d);
}

function checkFirstM(d) {
  return (/^m/gi.test(d.trim())
  );
}

function checkParametersNumber(d) {
  return (0, _parse.getSegments)(d).every(function (_ref) {
    var _ref2 = _toArray(_ref);

    var code = _ref2[0];

    var parameters = _ref2.slice(1);

    return typeof points[code] === "function" && parameters.length >= points[code].length;
  });
}

function noInvalidCharacters(d) {
  return (/^[mlhvqtcsaz\d\s,.-]*$/gi.test(d)
  );
}