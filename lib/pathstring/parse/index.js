"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parse;
exports.getSegments = getSegments;

var _points = require("point/points");

var points = _interopRequireWildcard(_points);

var _is = require("point/is");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

/**
 * Transforms a pathstring in a formatted point list
 * and converts relative positions into absolute positions.
 * e.g. parse("M0 0 l50 50 q100 100 150 150 z")
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "l", x: 50, y: 50, parameters: {} },
 *   { code: "q", x: 200, y: 200, parameters: { x1: 150, y1: 150 } },
 *   { code: "z", x: 0, y: 0, parameters: {} },
 * ]
 */
function parse(d) {
  return buildPointList(getSegments(d));
}

/**
 * Transforms a pathstring in array of segments
 * e.g. getSegments("M0 0 l50 50 q100 100 150 150z")
 * --> [["M", 0, 0], ["l", 50, 50], ["q", 100, 100, 150, 150], ["z"]]
 */
function getSegments(d) {
  return d
  // remove invalid characters
  .replace(/[^mlhvqtcsaz\d\s,.-]/gi, "")
  // split in segments e.g. ["M0 0", "l50 50", ...]
  .split(/([mlhvqtcsaz][\d\s,.-]*)/i)
  // remove empty segments
  .filter(isStringNotEmpty)
  // split segment by path values
  .map(splitSegment);
}

function isStringNotEmpty(str) {
  return str.trim().length > 0;
}

function convertNumberLikeInActualNumber(str) {
  str = str.trim();
  return isNaN(str) ? str : parseFloat(str);
}

function splitSegment(segment) {
  return segment
  // remove extra whitespaces
  .replace(/[\s,]+/g, " ")
  // split command and parameters
  .split(/([mlhvqtcsaz]|-*[\d.]+)/i)
  // remove empty values
  .filter(isStringNotEmpty)
  // trim and parse numbers
  .map(convertNumberLikeInActualNumber);
}

/**
 * Transforms an array of segments in a formatted point list
 * and converts relative positions into absolute positions.
 * e.g. buildPointList([["M", 0, 0], ["l", 50, 50], ["q", 100, 100, 150, 150], ["z"]])
 * --> [
 *   { code: "M", x: 0, y: 0, parameters: {} },
 *   { code: "l", x: 50, y: 50, parameters: {} },
 *   { code: "q", x: 200, y: 200, parameters: { x1: 150, y1: 150 } },
 *   { code: "z", x: 0, y: 0, parameters: {} },
 * ]
 */
function buildPointList(segments) {
  var firstPoint = void 0;

  return segments.reduce(function (acc, _ref) {
    var _ref2 = _toArray(_ref);

    var code = _ref2[0];

    var parameters = _ref2.slice(1);

    var p = points[code];
    var pointList = void 0,
        prev = void 0;

    if (acc.length > 0) {
      prev = acc[acc.length - 1];
    }

    if (prev && (0, _is.isM)(prev)) {
      firstPoint = prev;
    }

    if (p.length > 0) {
      pointList = chunks(parameters, p.length);
      pointList = pointList.map(function (chunk) {
        return prev = p.apply(undefined, _toConsumableArray(chunk).concat([prev]));
      });
    } else {
      pointList = [p(firstPoint)];
    }

    return [].concat(_toConsumableArray(acc), _toConsumableArray(pointList));
  }, []);
}

/**
 * Cuts the given array every n values
 * e.g. chunks([0, 1, 2, 0, 1, 2, 0, 1, 2], 3)
 * --> [[0, 1, 2], [0, 1, 2], [0, 1, 2]]
 */
function chunks(array, n) {
  var tmp = [];

  for (var i = 0, j = array.length; i < j; i += n) {
    var chunk = array.slice(i, i + n);

    if (chunk.length === n) {
      tmp.push(chunk);
    }
  }

  return tmp;
}