(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Point = undefined;

	var _bernsteinCore = __webpack_require__(1);

	var _bernsteinCore2 = _interopRequireDefault(_bernsteinCore);

	var _bernsteinPoint = __webpack_require__(3);

	var _bernsteinPoint2 = _interopRequireDefault(_bernsteinPoint);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _bernsteinCore2.default;
	exports.Point = _bernsteinPoint2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _bernsteinCleanPath = __webpack_require__(2);

	var _bernsteinCleanPath2 = _interopRequireDefault(_bernsteinCleanPath);

	var _bernsteinCombinePath = __webpack_require__(14);

	var _bernsteinCombinePath2 = _interopRequireDefault(_bernsteinCombinePath);

	var _bernsteinReversePath = __webpack_require__(15);

	var _bernsteinReversePath2 = _interopRequireDefault(_bernsteinReversePath);

	var _bernsteinSimplifyPath = __webpack_require__(16);

	var _bernsteinSimplifyPath2 = _interopRequireDefault(_bernsteinSimplifyPath);

	var _bernsteinJoinPaths = __webpack_require__(17);

	var _bernsteinJoinPaths2 = _interopRequireDefault(_bernsteinJoinPaths);

	var _bernsteinPathIsEqual = __webpack_require__(18);

	var _bernsteinPathIsEqual2 = _interopRequireDefault(_bernsteinPathIsEqual);

	var _bernsteinTranslatePath = __webpack_require__(23);

	var _bernsteinTranslatePath2 = _interopRequireDefault(_bernsteinTranslatePath);

	var _bernsteinScalePath = __webpack_require__(24);

	var _bernsteinScalePath2 = _interopRequireDefault(_bernsteinScalePath);

	var _bernsteinSkewPath = __webpack_require__(25);

	var _bernsteinSkewPath2 = _interopRequireDefault(_bernsteinSkewPath);

	var _bernsteinRotatePath = __webpack_require__(12);

	var _bernsteinRotatePath2 = _interopRequireDefault(_bernsteinRotatePath);

	var _bernsteinPathToCubics = __webpack_require__(26);

	var _bernsteinPathToCubics2 = _interopRequireDefault(_bernsteinPathToCubics);

	var _bernsteinPathBoundingbox = __webpack_require__(27);

	var _bernsteinPathBoundingbox2 = _interopRequireDefault(_bernsteinPathBoundingbox);

	var _bernsteinParsePathstring = __webpack_require__(22);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	var _bernsteinBuildPathstring = __webpack_require__(28);

	var _bernsteinBuildPathstring2 = _interopRequireDefault(_bernsteinBuildPathstring);

	var _bernsteinPathstringIsValid = __webpack_require__(29);

	var _bernsteinPathstringIsValid2 = _interopRequireDefault(_bernsteinPathstringIsValid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Bernstein = function () {
	  function Bernstein(input) {
	    _classCallCheck(this, Bernstein);

	    this.path = this.getPointList(input);
	    this.origin = { x: 0, y: 0 };
	  }

	  _createClass(Bernstein, [{
	    key: "getPointList",
	    value: function getPointList(input) {
	      if (input instanceof SVGPathElement) {
	        return (0, _bernsteinParsePathstring2.default)(input.getAttribute("d"));
	      }

	      if (input instanceof Bernstein) {
	        return input.getPath();
	      }

	      if (typeof input === "string") {
	        return (0, _bernsteinParsePathstring2.default)(input);
	      }

	      return input;
	    }
	  }, {
	    key: "getPointListArray",
	    value: function getPointListArray(arr) {
	      if (!Array.isArray(arr)) {
	        arr = [arr];
	      }

	      return arr.map(this.getPointList);
	    }
	  }, {
	    key: "isEqual",
	    value: function isEqual(path) {
	      return (0, _bernsteinPathIsEqual2.default)(this.path, path);
	    }
	  }, {
	    key: "clean",
	    value: function clean() {
	      this.path = (0, _bernsteinCleanPath2.default)(this.path);

	      return this;
	    }
	  }, {
	    key: "combine",
	    value: function combine() {
	      this.path = (0, _bernsteinCombinePath2.default)(this.path);

	      return this;
	    }
	  }, {
	    key: "reverse",
	    value: function reverse() {
	      this.path = (0, _bernsteinReversePath2.default)(this.path);

	      return this;
	    }
	  }, {
	    key: "simplify",
	    value: function simplify(tolerance) {
	      this.path = (0, _bernsteinSimplifyPath2.default)(this.path, tolerance);

	      return this;
	    }
	  }, {
	    key: "join",
	    value: function join(paths) {
	      var shouldClose = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	      paths = this.getPointListArray(paths);

	      this.path = (0, _bernsteinJoinPaths2.default)([this.path].concat(_toConsumableArray(paths)), shouldClose);

	      return this;
	    }
	  }, {
	    key: "convertToCubics",
	    value: function convertToCubics() {
	      this.path = (0, _bernsteinPathToCubics2.default)(this.path);

	      return this;
	    }
	  }, {
	    key: "boundingBox",
	    value: function boundingBox() {
	      return (0, _bernsteinPathBoundingbox2.default)(this.path);
	    }

	    /**
	     * Transforms
	     */

	  }, {
	    key: "relToAbs",
	    value: function relToAbs(n) {
	      var bbox = this.boundingBox();

	      return {
	        x: bbox.xMin + bbox.width * n / 100,
	        y: bbox.yMin + bbox.height * n / 100
	      };
	    }
	  }, {
	    key: "parseRel",
	    value: function parseRel(str) {
	      return parseFloat(str.replace("%", ""));
	    }
	  }, {
	    key: "setOrigin",
	    value: function setOrigin(x, y) {
	      if (typeof x === "string") {
	        switch (x) {
	          case "left":
	            x = this.relToAbs(0).x;
	            break;

	          case "center":
	            x = this.relToAbs(50).x;
	            break;

	          case "right":
	            x = this.relToAbs(100).x;
	            break;

	          default:
	            x = this.relToAbs(this.parseRel(x)).x;
	            break;
	        }
	      }

	      if (typeof y === "string") {
	        switch (y) {
	          case "top":
	            y = this.relToAbs(0).y;
	            break;

	          case "center":
	            y = this.relToAbs(50).y;
	            break;

	          case "bottom":
	            y = this.relToAbs(100).y;
	            break;

	          default:
	            y = this.relToAbs(this.parseRel(y)).y;
	            break;
	        }
	      }

	      this.origin = { x: x, y: y };

	      return this;
	    }
	  }, {
	    key: "computeOrigin",
	    value: function computeOrigin() {
	      this.translate(-this.origin.x, -this.origin.y);
	    }
	  }, {
	    key: "resetOrigin",
	    value: function resetOrigin() {
	      this.translate(this.origin.x, this.origin.y);
	    }
	  }, {
	    key: "translate",
	    value: function translate(dx, dy) {
	      this.path = (0, _bernsteinTranslatePath2.default)(this.path, dx, dy);

	      return this;
	    }
	  }, {
	    key: "translateX",
	    value: function translateX(dx) {
	      this.path = (0, _bernsteinTranslatePath2.default)(this.path, dx, 0);

	      return this;
	    }
	  }, {
	    key: "translateY",
	    value: function translateY(dy) {
	      this.path = (0, _bernsteinTranslatePath2.default)(this.path, 0, dy);

	      return this;
	    }
	  }, {
	    key: "scale",
	    value: function scale(dx, dy) {
	      if (typeof dy === "undefined") {
	        dy = dx;
	      }

	      this.computeOrigin();
	      this.path = (0, _bernsteinScalePath2.default)(this.path, dx, dy);
	      this.resetOrigin();

	      return this;
	    }
	  }, {
	    key: "scaleX",
	    value: function scaleX(dx) {
	      this.path = (0, _bernsteinScalePath2.default)(this.path, dx, 1);

	      return this;
	    }
	  }, {
	    key: "scaleY",
	    value: function scaleY(dy) {
	      this.path = (0, _bernsteinScalePath2.default)(this.path, 1, dy);

	      return this;
	    }
	  }, {
	    key: "skew",
	    value: function skew(dx, dy) {
	      this.computeOrigin();
	      this.path = (0, _bernsteinSkewPath2.default)(this.path, dx, dy);
	      this.resetOrigin();

	      return this;
	    }
	  }, {
	    key: "skewX",
	    value: function skewX(dx) {
	      this.path = (0, _bernsteinSkewPath2.default)(this.path, dx, 0);

	      return this;
	    }
	  }, {
	    key: "skewY",
	    value: function skewY(dy) {
	      this.path = (0, _bernsteinSkewPath2.default)(this.path, 0, dy);

	      return this;
	    }
	  }, {
	    key: "rotate",
	    value: function rotate(theta) {
	      this.computeOrigin();
	      this.path = (0, _bernsteinRotatePath2.default)(this.path, theta);
	      this.resetOrigin();

	      return this;
	    }

	    /**
	     * Getters
	     */

	  }, {
	    key: "getPath",
	    value: function getPath() {
	      return this.path;
	    }
	  }, {
	    key: "getPathstring",
	    value: function getPathstring() {
	      return (0, _bernsteinBuildPathstring2.default)(this.getPath());
	    }
	  }], [{
	    key: "isValid",
	    value: function isValid(pathstring) {
	      return (0, _bernsteinPathstringIsValid2.default)(pathstring);
	    }
	  }]);

	  return Bernstein;
	}();

	exports.default = Bernstein;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = clean;
	exports.simplifyClosures = simplifyClosures;
	exports.makeSureFirstPointsAreM = makeSureFirstPointsAreM;
	exports.removeConsecutiveSamePoints = removeConsecutiveSamePoints;

	var _bernsteinPoint = __webpack_require__(3);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * Cleans the given path
	 * e.g. clean([
	 *   { code: "L", x: 0, y: 0, parameters: {} },
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 *   { code: "L", x: 0, y: 0, parameters: {} },
	 * ])
	 * --> [
	 *   { code: "M", x: 0, y: 0, parameters: {} },
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 *   { code: "z", x: 0, y: 0, parameters: {} },
	 * ]
	 */
	function clean(path) {
	  return simplifyClosures(makeSureFirstPointsAreM(removeConsecutiveSamePoints(path)));
	}

	/**
	 * Close the path with the "z" command if the
	 * first point and the last point are the same
	 * e.g. simplifyClosures([
	 *   { code: "M", x: 0, y: 0, parameters: {} },
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 *   { code: "L", x: 0, y: 0, parameters: {} },
	 * ])
	 * --> [
	 *   { code: "M", x: 0, y: 0, parameters: {} },
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 *   { code: "z", x: 0, y: 0, parameters: {} },
	 * ]
	 */
	function simplifyClosures(path) {
	  var first = void 0;

	  return path.map(function (point, index) {
	    if (point.isM()) {
	      first = point;
	    }

	    if (shouldSimplifyClosure(first, point)) {
	      return (0, _bernsteinPoint.z)(first);
	    }

	    return point;
	  });
	}

	function shouldSimplifyClosure(first, point) {
	  return (point.isL() || point.isH() || point.isV()) && first.x === point.x && first.y === point.y;
	}

	/**
	 * Make sure that the path starts with the "m" command
	 * e.g. makeSureFirstPointsAreM([
	 *   { code: "L", x: 0, y: 0, parameters: {} },
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 * ])
	 * --> [
	 *   { code: "M", x: 0, y: 0, parameters: {} },
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 * ]
	 */
	function makeSureFirstPointsAreM(path) {
	  return path.map(function (point, i) {
	    if (i === 0 && !point.isM()) {
	      return point.isRelative() ? (0, _bernsteinPoint.m)(point.x, point.y) : (0, _bernsteinPoint.M)(point.x, point.y);
	    }

	    if (i > 0 && path[i - 1].isZ() && !point.isM()) {
	      var prev = path[i - 1];

	      return point.isRelative() ? (0, _bernsteinPoint.m)(point.x, point.y, prev) : (0, _bernsteinPoint.M)(point.x, point.y, prev);
	    }

	    return point;
	  });
	}

	/**
	 * Simplifies the path by removing consecutive same points
	 * e.g. removeConsecutiveSamePoints([
	 *   { code: "M", x: 0, y: 0, parameters: {} },
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 * ])
	 * --> [
	 *   { code: "M", x: 0, y: 0, parameters: {} },
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 * ]
	 */
	function removeConsecutiveSamePoints(path) {
	  return path.reduce(function (acc, point, i) {
	    var prev = i > 0 && acc[acc.length - 1];

	    if (prev && prev.x === point.x && prev.y === point.y) {
	      return acc;
	    }

	    return [].concat(_toConsumableArray(acc), [point]);
	  }, []);
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.defaultPoint = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.m = m;
	exports.M = M;
	exports.l = l;
	exports.L = L;
	exports.h = h;
	exports.H = H;
	exports.v = v;
	exports.V = V;
	exports.q = q;
	exports.Q = Q;
	exports.t = t;
	exports.T = T;
	exports.c = c;
	exports.C = C;
	exports.s = s;
	exports.S = S;
	exports.a = a;
	exports.A = A;
	exports.z = z;
	exports.Z = Z;

	var _pointTypes = __webpack_require__(4);

	var pointTypes = _interopRequireWildcard(_pointTypes);

	var _bernsteinPointIs = __webpack_require__(5);

	var assertTypes = _interopRequireWildcard(_bernsteinPointIs);

	var _bernsteinPointIsRelative = __webpack_require__(6);

	var _bernsteinPointIsRelative2 = _interopRequireDefault(_bernsteinPointIsRelative);

	var _bernsteinPointIsInside = __webpack_require__(7);

	var _bernsteinPointIsInside2 = _interopRequireDefault(_bernsteinPointIsInside);

	var _bernsteinPointDistance = __webpack_require__(8);

	var _bernsteinPointDistance2 = _interopRequireDefault(_bernsteinPointDistance);

	var _bernsteinPointLToC = __webpack_require__(9);

	var _bernsteinPointLToC2 = _interopRequireDefault(_bernsteinPointLToC);

	var _bernsteinPointQToC = __webpack_require__(10);

	var _bernsteinPointQToC2 = _interopRequireDefault(_bernsteinPointQToC);

	var _bernsteinPointAToC = __webpack_require__(11);

	var _bernsteinPointAToC2 = _interopRequireDefault(_bernsteinPointAToC);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Point = function () {
	  function Point(code, x, y) {
	    var parameters = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    _classCallCheck(this, Point);

	    this.code = code;
	    this.x = x;
	    this.y = y;
	    this.parameters = parameters;
	  }

	  _createClass(Point, [{
	    key: "toCubic",
	    value: function toCubic(prev) {
	      if (this.isL() || this.isH() || this.isV()) {
	        return (0, _bernsteinPointLToC2.default)(prev, this);
	      }

	      if (this.isQ() || this.isT()) {
	        return (0, _bernsteinPointQToC2.default)(prev, this);
	      }

	      if (this.isA()) {
	        return (0, _bernsteinPointAToC2.default)(prev, this);
	      }

	      return this;
	    }
	  }, {
	    key: "distance",
	    value: function distance(point) {
	      return (0, _bernsteinPointDistance2.default)(this, point);
	    }
	  }, {
	    key: "distanceSegment",
	    value: function distanceSegment(l1, l2) {
	      return (0, _bernsteinPointDistance.distanceSegment)(this, l1, l2);
	    }
	  }, {
	    key: "isInside",
	    value: function isInside(path) {
	      return (0, _bernsteinPointIsInside2.default)(this, path);
	    }
	  }, {
	    key: "isRelative",
	    value: function isRelative() {
	      return (0, _bernsteinPointIsRelative2.default)(this);
	    }
	  }, {
	    key: "isM",
	    value: function isM() {
	      return assertTypes.isM(this);
	    }
	  }, {
	    key: "isL",
	    value: function isL() {
	      return assertTypes.isL(this);
	    }
	  }, {
	    key: "isH",
	    value: function isH() {
	      return assertTypes.isH(this);
	    }
	  }, {
	    key: "isV",
	    value: function isV() {
	      return assertTypes.isV(this);
	    }
	  }, {
	    key: "isQ",
	    value: function isQ() {
	      return assertTypes.isQ(this);
	    }
	  }, {
	    key: "isT",
	    value: function isT() {
	      return assertTypes.isT(this);
	    }
	  }, {
	    key: "isC",
	    value: function isC() {
	      return assertTypes.isC(this);
	    }
	  }, {
	    key: "isS",
	    value: function isS() {
	      return assertTypes.isS(this);
	    }
	  }, {
	    key: "isA",
	    value: function isA() {
	      return assertTypes.isA(this);
	    }
	  }, {
	    key: "isZ",
	    value: function isZ() {
	      return assertTypes.isZ(this);
	    }
	  }]);

	  return Point;
	}();

	exports.default = Point;
	var defaultPoint = exports.defaultPoint = new Point(null, 0, 0);

	function m(dx, dy) {
	  var prev = arguments.length <= 2 || arguments[2] === undefined ? defaultPoint : arguments[2];

	  return new Point(pointTypes.m, prev.x + dx, prev.y + dy);
	}

	function M(x, y) {
	  var prev = arguments.length <= 2 || arguments[2] === undefined ? defaultPoint : arguments[2];

	  return new Point(pointTypes.M, x, y);
	}

	function l(dx, dy) {
	  var prev = arguments.length <= 2 || arguments[2] === undefined ? defaultPoint : arguments[2];

	  return new Point(pointTypes.l, prev.x + dx, prev.y + dy);
	}

	function L(x, y) {
	  var prev = arguments.length <= 2 || arguments[2] === undefined ? defaultPoint : arguments[2];

	  return new Point(pointTypes.L, x, y);
	}

	function h(dx) {
	  var prev = arguments.length <= 1 || arguments[1] === undefined ? defaultPoint : arguments[1];

	  return new Point(pointTypes.h, prev.x + dx, prev.y);
	}

	function H(x) {
	  var prev = arguments.length <= 1 || arguments[1] === undefined ? defaultPoint : arguments[1];

	  return new Point(pointTypes.H, x, prev.y);
	}

	function v(dy) {
	  var prev = arguments.length <= 1 || arguments[1] === undefined ? defaultPoint : arguments[1];

	  return new Point(pointTypes.v, prev.x, prev.y + dy);
	}

	function V(y) {
	  var prev = arguments.length <= 1 || arguments[1] === undefined ? defaultPoint : arguments[1];

	  return new Point(pointTypes.V, prev.x, y);
	}

	function q(dx1, dy1, dx, dy) {
	  var prev = arguments.length <= 4 || arguments[4] === undefined ? defaultPoint : arguments[4];

	  return new Point(pointTypes.q, prev.x + dx, prev.y + dy, {
	    x1: prev.x + dx1,
	    y1: prev.y + dy1
	  });
	}

	function Q(x1, y1, x, y) {
	  var prev = arguments.length <= 4 || arguments[4] === undefined ? defaultPoint : arguments[4];

	  return new Point(pointTypes.Q, x, y, {
	    x1: x1,
	    y1: y1
	  });
	}

	function t(dx, dy) {
	  var prev = arguments.length <= 2 || arguments[2] === undefined ? defaultPoint : arguments[2];

	  var parameters = {
	    x1: prev.x,
	    y1: prev.y
	  };

	  if (prev.isQ() || prev.isT()) {
	    parameters = {
	      x1: 2 * prev.x - prev.parameters.x1,
	      y1: 2 * prev.y - prev.parameters.y1
	    };
	  }

	  return new Point(pointTypes.t, prev.x + dx, prev.y + dy, parameters);
	}

	function T(x, y) {
	  var prev = arguments.length <= 2 || arguments[2] === undefined ? defaultPoint : arguments[2];

	  var parameters = {
	    x1: prev.x,
	    y1: prev.y
	  };

	  if (prev.isQ() || prev.isT()) {
	    parameters = {
	      x1: 2 * prev.x - prev.parameters.x1,
	      y1: 2 * prev.y - prev.parameters.y1
	    };
	  }

	  return new Point(pointTypes.T, x, y, parameters);
	}

	function c(dx1, dy1, dx2, dy2, dx, dy) {
	  var prev = arguments.length <= 6 || arguments[6] === undefined ? defaultPoint : arguments[6];

	  return new Point(pointTypes.c, prev.x + dx, prev.y + dy, {
	    x1: prev.x + dx1,
	    y1: prev.y + dy1,
	    x2: prev.x + dx2,
	    y2: prev.y + dy2
	  });
	}

	function C(x1, y1, x2, y2, x, y) {
	  var prev = arguments.length <= 6 || arguments[6] === undefined ? defaultPoint : arguments[6];

	  return new Point(pointTypes.C, x, y, {
	    x1: x1,
	    y1: y1,
	    x2: x2,
	    y2: y2
	  });
	}

	function s(dx2, dy2, dx, dy) {
	  var prev = arguments.length <= 4 || arguments[4] === undefined ? defaultPoint : arguments[4];

	  var parameters = {
	    x1: prev.x,
	    y1: prev.y,
	    x2: prev.x + dx2,
	    y2: prev.y + dy2
	  };

	  if (prev.isC() || prev.isS()) {
	    parameters = _extends({}, parameters, {
	      x1: 2 * prev.x - prev.parameters.x2,
	      y1: 2 * prev.y - prev.parameters.y2
	    });
	  }

	  return new Point(pointTypes.s, prev.x + dx, prev.y + dy, parameters);
	}

	function S(x2, y2, x, y) {
	  var prev = arguments.length <= 4 || arguments[4] === undefined ? defaultPoint : arguments[4];

	  var parameters = {
	    x1: prev.x,
	    y1: prev.y,
	    x2: x2,
	    y2: y2
	  };

	  if (prev.isC() || prev.isS()) {
	    parameters = _extends({}, parameters, {
	      x1: 2 * prev.x - prev.parameters.x2,
	      y1: 2 * prev.y - prev.parameters.y2
	    });
	  }

	  return new Point(pointTypes.S, x, y, parameters);
	}

	function a(rx, ry, rotation, large, sweep, dx, dy) {
	  var prev = arguments.length <= 7 || arguments[7] === undefined ? defaultPoint : arguments[7];

	  return new Point(pointTypes.a, prev.x + dx, prev.y + dy, {
	    rx: rx,
	    ry: ry,
	    rotation: rotation,
	    large: large,
	    sweep: sweep
	  });
	}

	function A(rx, ry, rotation, large, sweep, x, y) {
	  var prev = arguments.length <= 7 || arguments[7] === undefined ? defaultPoint : arguments[7];

	  return new Point(pointTypes.A, x, y, {
	    rx: rx,
	    ry: ry,
	    rotation: rotation,
	    large: large,
	    sweep: sweep
	  });
	}

	function z() {
	  var firstPoint = arguments.length <= 0 || arguments[0] === undefined ? defaultPoint : arguments[0];

	  return new Point(pointTypes.z, firstPoint.x, firstPoint.y);
	}

	function Z() {
	  var firstPoint = arguments.length <= 0 || arguments[0] === undefined ? defaultPoint : arguments[0];

	  return new Point(pointTypes.Z, firstPoint.x, firstPoint.y);
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var m = exports.m = "m";
	var M = exports.M = "M";
	var l = exports.l = "l";
	var L = exports.L = "L";
	var h = exports.h = "h";
	var H = exports.H = "H";
	var v = exports.v = "v";
	var V = exports.V = "V";
	var q = exports.q = "q";
	var Q = exports.Q = "Q";
	var t = exports.t = "t";
	var T = exports.T = "T";
	var c = exports.c = "c";
	var C = exports.C = "C";
	var s = exports.s = "s";
	var S = exports.S = "S";
	var a = exports.a = "a";
	var A = exports.A = "A";
	var z = exports.z = "z";
	var Z = exports.Z = "Z";

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isM = isM;
	exports.isL = isL;
	exports.isH = isH;
	exports.isV = isV;
	exports.isQ = isQ;
	exports.isT = isT;
	exports.isC = isC;
	exports.isS = isS;
	exports.isA = isA;
	exports.isZ = isZ;
	function isM(point) {
	  return point.code.toLowerCase() === "m";
	}

	function isL(point) {
	  return point.code.toLowerCase() === "l";
	}

	function isH(point) {
	  return point.code.toLowerCase() === "h";
	}

	function isV(point) {
	  return point.code.toLowerCase() === "v";
	}

	function isQ(point) {
	  return point.code.toLowerCase() === "q";
	}

	function isT(point) {
	  return point.code.toLowerCase() === "t";
	}

	function isC(point) {
	  return point.code.toLowerCase() === "c";
	}

	function isS(point) {
	  return point.code.toLowerCase() === "s";
	}

	function isA(point) {
	  return point.code.toLowerCase() === "a";
	}

	function isZ(point) {
	  return point.code.toLowerCase() === "z";
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isRelative;
	function isRelative(point) {
	  return point.code.toLowerCase() === point.code;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isInside;
	function isInside(point, path) {
	  var inside = false;

	  for (var i = 0, j = path.length - 1; i < path.length; i++) {
	    var current = path[i];
	    var previous = path[j];
	    var slope = (previous.y - current.y) / (previous.x - current.x);
	    var isVerticallyBetween = current.y > point.y !== previous.y > point.y;
	    var isHorizontallyBefore = point.x < current.x + (point.y - current.y) / slope;

	    if (isVerticallyBetween && isHorizontallyBefore) {
	      inside = !inside;
	    }

	    j = i;
	  }

	  return inside;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = distance;
	exports.distanceSegment = distanceSegment;

	var _bernsteinPoint = __webpack_require__(3);

	var _bernsteinPoint2 = _interopRequireDefault(_bernsteinPoint);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function distance(p1, p2) {
	  return Math.sqrt(sqDistance(p1, p2));
	}

	function sqDistance(p1, p2) {
	  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
	}

	function distanceSegment(p1, p2, p3) {
	  return Math.sqrt(sqDistanceSegment(p1, p2, p3));
	}

	function sqDistanceSegment(p1, p2, p3) {
	  var segment = sqDistance(p2, p3);

	  if (segment === 0) {
	    return sqDistance(p1, p2);
	  }

	  var t = Math.max(0, Math.min(1, ((p1.x - p2.x) * (p3.x - p2.x) + (p1.y - p2.y) * (p3.y - p2.y)) / segment));
	  var p4 = new _bernsteinPoint2.default(null, p2.x + t * (p3.x - p2.x), p2.y + t * (p3.y - p2.y));

	  return sqDistance(p1, p4);
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = lineToCubic;

	var _bernsteinPoint = __webpack_require__(3);

	function lineToCubic(prev, point) {
	  return point.isRelative() ? (0, _bernsteinPoint.c)(prev.x, prev.y, point.x, point.y, point.x, point.y) : (0, _bernsteinPoint.C)(prev.x, prev.y, point.x, point.y, point.x, point.y);
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = quadraticToCubic;

	var _bernsteinPoint = __webpack_require__(3);

	function quadraticToCubic(prev, point) {
	  var x1 = 1 / 3 * prev.x + 2 / 3 * point.parameters.x1;
	  var y1 = 1 / 3 * prev.y + 2 / 3 * point.parameters.y1;
	  var x2 = 1 / 3 * point.x + 2 / 3 * point.parameters.x1;
	  var y2 = 1 / 3 * point.y + 2 / 3 * point.parameters.y1;

	  return point.isRelative() ? (0, _bernsteinPoint.c)(x1, y1, x2, y2, point.x, point.y) : (0, _bernsteinPoint.C)(x1, y1, x2, y2, point.x, point.y);
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = arcToCubic;

	var _bernsteinRotatePath = __webpack_require__(12);

	var _bernsteinRotatePath2 = _interopRequireDefault(_bernsteinRotatePath);

	var _bernsteinPoint = __webpack_require__(3);

	var _bernsteinPoint2 = _interopRequireDefault(_bernsteinPoint);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function arcToCubic(prev, point) {
	  var center = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	  var partial = [];
	  var cx = void 0,
	      cy = void 0,
	      f1 = void 0,
	      f2 = void 0;

	  var x1 = prev.x;
	  var y1 = prev.y;
	  var x2 = point.x;
	  var y2 = point.y;
	  var rx = point.parameters.rx;
	  var ry = point.parameters.ry;

	  var pi2_3 = 2 * Math.PI / 3;
	  var angle = Math.PI / 180 * point.parameters.rotation;

	  if (center) {
	    cx = center[0];
	    cy = center[1];
	    f1 = center[2];
	    f2 = center[3];
	  } else {
	    var _prev = (0, _bernsteinRotatePath2.default)([prev], -angle)[0];
	    var _point = (0, _bernsteinRotatePath2.default)([point], -angle)[0];

	    x1 = _prev.x;
	    y1 = _prev.y;
	    x2 = _point.x;
	    y2 = _point.y;

	    var x = (x1 - x2) / 2;
	    var y = (y1 - y2) / 2;
	    var sqX = Math.pow(x, 2);
	    var sqY = Math.pow(y, 2);

	    var sqRx = Math.pow(rx, 2);
	    var sqRy = Math.pow(ry, 2);
	    var ellipse = sqX / sqRx + sqY / sqRy;

	    if (ellipse > 1) {
	      ellipse = Math.sqrt(ellipse);
	      rx *= ellipse;
	      ry *= ellipse;
	    }

	    sqRx = Math.pow(rx, 2);
	    sqRy = Math.pow(ry, 2);

	    var sign = point.parameters.large === point.parameters.sweep ? -1 : 1;
	    var k = sign * Math.sqrt(Math.abs((sqRx * sqRy - sqRx * sqY - sqRy * sqX) / (sqRx * sqY + sqRy * sqX)));

	    cx = k * rx * y / ry + (x1 + x2) / 2;
	    cy = k * -ry * x / rx + (y1 + y2) / 2;

	    f1 = Math.asin((y1 - cy) / ry);
	    f2 = Math.asin((y2 - cy) / ry);

	    if (x1 < cx) {
	      f1 = Math.PI - f1;
	    }

	    if (f1 < 0) {
	      f1 += 2 * Math.PI;
	    }

	    if (x2 < cx) {
	      f2 = Math.PI - f2;
	    }

	    if (f2 < 0) {
	      f2 += 2 * Math.PI;
	    }

	    if (point.parameters.sweep === 1 && f1 > f2) {
	      f1 -= 2 * Math.PI;
	    }

	    if (point.parameters.sweep === 0 && f2 > f1) {
	      f2 -= 2 * Math.PI;
	    }
	  }

	  if (Math.abs(f2 - f1) > pi2_3) {
	    var _f2 = f2;
	    var _point2 = new _bernsteinPoint2.default(point.code, x2, y2, point.parameters);

	    f2 = f1 + pi2_3 * (point.parameters.sweep === 1 && f2 > f1 ? 1 : -1);
	    x2 = cx + rx * Math.cos(f2);
	    y2 = cy + ry * Math.sin(f2);

	    var _prev2 = new _bernsteinPoint2.default(prev.code, x2, y2, prev.parameters);

	    partial = arcToCubic(_prev2, _point2, [cx, cy, f2, _f2]);
	  }

	  var t = Math.tan((f2 - f1) / 4);
	  var hx = 4 / 3 * rx * t;
	  var hy = 4 / 3 * ry * t;

	  var p1 = [x1, y1];
	  var p2 = [x1 + hx * Math.sin(f1), y1 - hy * Math.cos(f1)];
	  var p3 = [x2 + hx * Math.sin(f2), y2 - hy * Math.cos(f2)];
	  var p4 = [x2, y2];

	  p2[0] = 2 * p1[0] - p2[0];
	  p2[1] = 2 * p1[1] - p2[1];

	  var cubic = point.isRelative() ? (0, _bernsteinPoint.c)(p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]) : (0, _bernsteinPoint.C)(p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]);

	  if (center) {
	    return [cubic].concat(_toConsumableArray(partial));
	  }

	  return (0, _bernsteinRotatePath2.default)([cubic].concat(_toConsumableArray(partial)), angle);
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = rotate;

	var _bernsteinMatrixPath = __webpack_require__(13);

	var _bernsteinMatrixPath2 = _interopRequireDefault(_bernsteinMatrixPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function rotate(path, theta) {
	  return (0, _bernsteinMatrixPath2.default)(path, [Math.cos(theta), -Math.sin(theta), 0, Math.sin(theta), Math.cos(theta), 0, 0, 0, 1]);
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.default = matrix;
	exports.multiply3x1 = multiply3x1;

	var _bernsteinPoint = __webpack_require__(3);

	var _bernsteinPoint2 = _interopRequireDefault(_bernsteinPoint);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function matrix(path, a) {
	  var lastComputedPoint = _bernsteinPoint.defaultPoint;

	  return path.map(function (p, i) {
	    var prev = i > 0 && path[i - 1];
	    var px = typeof p.x === "number" ? p.x : prev.x;
	    var py = typeof p.y === "number" ? p.y : prev.y;
	    var px1 = typeof p.parameters.x1 === "number" && p.parameters.x1;
	    var py1 = typeof p.parameters.y1 === "number" && p.parameters.y1;
	    var px2 = typeof p.parameters.x2 === "number" && p.parameters.x2;
	    var py2 = typeof p.parameters.y2 === "number" && p.parameters.y2;

	    // compute position

	    var _multiply3x = multiply3x1(a, [px, py, 1]);

	    var _multiply3x2 = _slicedToArray(_multiply3x, 2);

	    var x = _multiply3x2[0];
	    var y = _multiply3x2[1];

	    // get point code

	    var code = p.code;

	    if (p.isH() && y !== lastComputedPoint.y || p.isV() && x !== lastComputedPoint.x) {
	      code = p.isRelative() ? "l" : "L";
	    }

	    // compute parameters
	    var x1 = void 0,
	        y1 = void 0,
	        x2 = void 0,
	        y2 = void 0;

	    if (px1 !== false && py1 !== false) {
	      var _multiply3x3 = multiply3x1(a, [px1, py1, 1]);

	      var _multiply3x4 = _slicedToArray(_multiply3x3, 2);

	      x1 = _multiply3x4[0];
	      y1 = _multiply3x4[1];
	    }

	    if (px2 !== false && py2 !== false) {
	      var _multiply3x5 = multiply3x1(a, [px2, py2, 1]);

	      var _multiply3x6 = _slicedToArray(_multiply3x5, 2);

	      x2 = _multiply3x6[0];
	      y2 = _multiply3x6[1];
	    }

	    var parameters = _extends({}, p.parameters, typeof x1 !== "undefined" && { x1: x1 }, typeof y1 !== "undefined" && { y1: y1 }, typeof x2 !== "undefined" && { x2: x2 }, typeof y2 !== "undefined" && { y2: y2 });

	    // this point will be used to know if the next H or V
	    // should be converted into L
	    lastComputedPoint = new _bernsteinPoint2.default(code, x, y, parameters);

	    return lastComputedPoint;
	  });
	}

	function multiply3x1(a, b) {
	  var a00 = a[0 * 3 + 0];
	  var a01 = a[0 * 3 + 1];
	  var a02 = a[0 * 3 + 2];
	  var a10 = a[1 * 3 + 0];
	  var a11 = a[1 * 3 + 1];
	  var a12 = a[1 * 3 + 2];
	  var a20 = a[2 * 3 + 0];
	  var a21 = a[2 * 3 + 1];
	  var a22 = a[2 * 3 + 2];
	  var b0 = b[0];
	  var b1 = b[1];
	  var b2 = b[2];

	  return [a00 * b0 + a01 * b1 + a02 * b2, a10 * b0 + a11 * b1 + a12 * b2, a20 * b0 + a21 * b1 + a22 * b2];
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = combine;

	var _bernsteinPoint = __webpack_require__(3);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * Combines the subpaths by removing "zM" commands
	 * e.g. combine([
	 *   { code: "M", x: 0, y: 0, parameters: {} },
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 *   { code: "z", x: 0, y: 0, parameters: {} },
	 *   { code: "M", x: 100, y: 100, parameters: {} },
	 *   { code: "L", x: 200, y: 200, parameters: {} },
	 * ])
	 * --> [
	 *   { code: "M", x: 0, y: 0, parameters: {} },
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 *   { code: "L", x: 200, y: 200, parameters: {} },
	 * ]
	 */
	function combine(path) {
	  return path.reduce(function (acc, point, i) {
	    if (i > 0 && point.isM()) {
	      return [].concat(_toConsumableArray(acc), [point.isRelative() ? (0, _bernsteinPoint.l)(point.x, point.y) : (0, _bernsteinPoint.L)(point.x, point.y)]);
	    }

	    if (point.isZ()) {
	      if (i === path.length - 1) {
	        return [].concat(_toConsumableArray(acc), [point.isRelative() ? (0, _bernsteinPoint.z)(path[0]) : (0, _bernsteinPoint.Z)(path[0])]);
	      }

	      return acc;
	    }

	    return [].concat(_toConsumableArray(acc), [point]);
	  }, []);
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = reverse;

	var _bernsteinPoint = __webpack_require__(3);

	var _bernsteinPoint2 = _interopRequireDefault(_bernsteinPoint);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function reverse(path) {
	  var reversed = [];
	  var firstPointIndex = void 0;

	  for (var i = 0, len = path.length; i < len; i++) {
	    var insert = reversed.length;
	    var point = path[i];

	    if (point.isM()) {
	      firstPointIndex = i;
	    }

	    var next = i < len - 1 && !path[i + 1].isZ() ? path[i + 1] : path[firstPointIndex];

	    if (point.isZ()) {
	      insert = firstPointIndex;
	      next = point;
	      point = path[i - 1];
	    }

	    var code = next.code;
	    var parameters = next.parameters;

	    if (next.isT()) {
	      code = next.isRelative() ? "q" : "Q";
	    }

	    if (next.isS()) {
	      code = next.isRelative() ? "c" : "C";
	    }

	    if (next.isC() || next.isS()) {
	      parameters = reverseAnchors(parameters);
	    }

	    if (next.isA()) {
	      parameters = reverseArc(parameters);
	    }

	    reversed.splice(insert, 0, new _bernsteinPoint2.default(code, point.x, point.y, parameters));
	  }

	  return reversed.reverse();
	}

	function reverseAnchors(parameters) {
	  return _extends({}, parameters, {
	    x1: parameters.x2,
	    y1: parameters.y2,
	    x2: parameters.x1,
	    y2: parameters.y1
	  });
	}

	function reverseArc(parameters) {
	  return _extends({}, parameters, {
	    sweep: parameters.sweep ^ 1
	  });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = simplify;

	var _bernsteinPointDistance = __webpack_require__(8);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function simplify(path, tolerance) {
	  return douglasPeucker(path, tolerance);
	}

	function douglasPeucker(path, tolerance) {
	  var simplified = void 0;
	  var max = 0;
	  var index = 0;

	  for (var i = 1, len = path.length; i < len - 1; i++) {
	    var point = path[i];
	    var distance = (0, _bernsteinPointDistance.distanceSegment)(point, path[0], path[path.length - 1]);

	    if (distance > max) {
	      index = i;
	      max = distance;
	    }
	  }

	  if (max >= tolerance) {
	    var res1 = douglasPeucker(path.slice(0, index + 1), tolerance);
	    var res2 = douglasPeucker(path.slice(index, path.length), tolerance);

	    simplified = [].concat(_toConsumableArray(res1.slice(0, res1.length - 1)), _toConsumableArray(res2));
	  } else {
	    simplified = [path[0], path[path.length - 1]];
	  }

	  return simplified;
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = join;

	var _bernsteinPoint = __webpack_require__(3);

	var _bernsteinCleanPath = __webpack_require__(2);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/**
	 * Joins the paths and returns one global path
	 * e.g. join([
	 *   { code: "M", x: 0, y: 0, parameters: {} },
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 * ],
	 * [
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 *   { code: "L", x: 200, y: 200, parameters: {} },
	 * ], true)
	 * --> [
	 *   { code: "M", x: 0, y: 0, parameters: {} },
	 *   { code: "L", x: 100, y: 100, parameters: {} },
	 *   { code: "z", x: 0, y: 0, parameters: {} },
	 *   { code: "M", x: 100, y: 100, parameters: {} },
	 *   { code: "L", x: 200, y: 200, parameters: {} },
	 *   { code: "z", x: 100, y: 100, parameters: {} },
	 * ]
	 */
	function join(paths, shouldClose) {
	  return paths.reduce(function (acc, path) {
	    if (shouldClose) {
	      path = (0, _bernsteinCleanPath.makeSureFirstPointsAreM)(path);

	      return [].concat(_toConsumableArray(acc), _toConsumableArray(path), _toConsumableArray(!path[path.length - 1].isZ() && [(0, _bernsteinPoint.z)(path[0])]));
	    }

	    return [].concat(_toConsumableArray(acc), _toConsumableArray(path));
	  }, []);
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isEqual;

	var _deepEqual = __webpack_require__(19);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _bernsteinParsePathstring = __webpack_require__(22);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isEqual(d1, d2) {
	  if (typeof d1 === "string" && typeof d2 === "string") {
	    return (0, _deepEqual2.default)((0, _bernsteinParsePathstring2.default)(d1), (0, _bernsteinParsePathstring2.default)(d2));
	  } else if (Array.isArray(d1) && Array.isArray(d2)) {
	    return (0, _deepEqual2.default)(d1, d2);
	  } else if (typeof d1 === "string" && Array.isArray(d2)) {
	    return (0, _deepEqual2.default)((0, _bernsteinParsePathstring2.default)(d1), d2);
	  } else if (Array.isArray(d1) && typeof d2 === "string") {
	    return (0, _deepEqual2.default)(d1, (0, _bernsteinParsePathstring2.default)(d2));
	  }

	  throw new Error("isEqual() only accepts strings and arrays as parameters.");
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(20);
	var isArguments = __webpack_require__(21);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 20 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = parsePathstring;
	exports.getSegments = getSegments;

	var _bernsteinPoint = __webpack_require__(3);

	var points = _interopRequireWildcard(_bernsteinPoint);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

	/**
	 * Transforms a pathstring in a formatted point list
	 * and converts relative positions into absolute positions.
	 * e.g. parsePathstring("M0 0 l50 50 q100 100 150 150 z")
	 * --> [
	 *   { code: "M", x: 0, y: 0, parameters: {} },
	 *   { code: "l", x: 50, y: 50, parameters: {} },
	 *   { code: "q", x: 200, y: 200, parameters: { x1: 150, y1: 150 } },
	 *   { code: "z", x: 0, y: 0, parameters: {} },
	 * ]
	 */
	function parsePathstring(d) {
	  if (typeof d !== "string") {
	    throw new Error("The provided value in parsePathstring() should be a string.");
	  }

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

	    if (prev && prev.isM()) {
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

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = translate;

	var _bernsteinMatrixPath = __webpack_require__(13);

	var _bernsteinMatrixPath2 = _interopRequireDefault(_bernsteinMatrixPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function translate(path, dx, dy) {
	  return (0, _bernsteinMatrixPath2.default)(path, [1, 0, dx, 0, 1, dy, 0, 0, 1]);
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = scale;

	var _bernsteinMatrixPath = __webpack_require__(13);

	var _bernsteinMatrixPath2 = _interopRequireDefault(_bernsteinMatrixPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function scale(path, sx, sy) {
	  return (0, _bernsteinMatrixPath2.default)(path, [sx, 0, 0, 0, sy, 0, 0, 0, 1]);
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = skew;

	var _bernsteinMatrixPath = __webpack_require__(13);

	var _bernsteinMatrixPath2 = _interopRequireDefault(_bernsteinMatrixPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function skew(path, thetaX, thetaY) {
	  return (0, _bernsteinMatrixPath2.default)(path, [1, Math.tan(thetaX), 0, Math.tan(thetaY), 1, 0, 0, 0, 1]);
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toCubics;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function toCubics(path) {
	  return path.reduce(function (acc, point, i) {
	    var cubic = point.toCubic(i > 0 && path[i - 1]);

	    if (Array.isArray(cubic)) {
	      return [].concat(_toConsumableArray(acc), _toConsumableArray(cubic));
	    }

	    return [].concat(_toConsumableArray(acc), [cubic]);
	  }, []);
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = boundingBox;

	var _bernsteinPoint = __webpack_require__(3);

	var _bernsteinPoint2 = _interopRequireDefault(_bernsteinPoint);

	var _bernsteinPathToCubics = __webpack_require__(26);

	var _bernsteinPathToCubics2 = _interopRequireDefault(_bernsteinPathToCubics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function boundingBox(_path) {
	  var path = (0, _bernsteinPathToCubics2.default)(_path);
	  var x = [];
	  var y = [];

	  for (var i = 0; i < path.length; i++) {
	    var point = path[i];
	    var prev = i > 0 && path[i - 1];

	    if (point.isM() || point.isZ()) {
	      x.push(point.x);
	      y.push(point.y);
	    } else {
	      var _cubicBoundingBox = cubicBoundingBox(prev, point);

	      var _xMin = _cubicBoundingBox.xMin;
	      var _xMax = _cubicBoundingBox.xMax;
	      var _yMin = _cubicBoundingBox.yMin;
	      var _yMax = _cubicBoundingBox.yMax;


	      x.push(_xMin);
	      x.push(_xMax);
	      y.push(_yMin);
	      y.push(_yMax);
	    }
	  }

	  var xMin = Math.min.apply(Math, x);
	  var xMax = Math.max.apply(Math, x);
	  var yMin = Math.min.apply(Math, y);
	  var yMax = Math.max.apply(Math, y);

	  return {
	    xMin: xMin,
	    xMax: xMax,
	    yMin: yMin,
	    yMax: yMax,
	    width: xMax - xMin,
	    height: yMax - yMin
	  };
	}

	function cubicBoundingBox(prev, point) {
	  var p0 = new _bernsteinPoint2.default(null, prev.x, prev.y);
	  var p1 = new _bernsteinPoint2.default(null, point.parameters.x1, point.parameters.y1);
	  var p2 = new _bernsteinPoint2.default(null, point.parameters.x2, point.parameters.y2);
	  var p3 = new _bernsteinPoint2.default(null, point.x, point.y);

	  var x = getMinMax(p0.x, p1.x, p2.x, p3.x);
	  var y = getMinMax(p0.y, p1.y, p2.y, p3.y);

	  return {
	    xMin: x.min,
	    xMax: x.max,
	    yMin: y.min,
	    yMax: y.max
	  };
	}

	function getMinMax(p0, p1, p2, p3) {
	  var a = 3 * p3 - 9 * p2 + (9 * p1 - 3 * p0);
	  var b = 6 * p0 - 12 * p1 + 6 * p2;
	  var c = 3 * p1 - 3 * p0;
	  var d = Math.pow(b, 2) - 4 * a * c;

	  var min = p0;
	  var max = p0;

	  if (p3 < min) {
	    min = p3;
	  }

	  if (p3 > max) {
	    max = p3;
	  }

	  if (d >= 0) {
	    var t1 = (-b + Math.sqrt(d)) / (2 * a);

	    if (t1 > 0 && t1 < 1) {
	      var p = cubic(p0, p1, p2, p3, t1);

	      if (p < min) {
	        min = p;
	      }

	      if (p > max) {
	        max = p;
	      }
	    }

	    var t2 = (-b - Math.sqrt(d)) / (2 * a);

	    if (t2 > 0 && t2 < 1) {
	      var _p = cubic(p0, p1, p2, p3, t2);

	      if (_p < min) {
	        min = _p;
	      }

	      if (_p > max) {
	        max = _p;
	      }
	    }
	  }

	  return { min: min, max: max };
	}

	function cubic(p0, p1, p2, p3, t) {
	  return p0 * Math.pow(1 - t, 3) + p1 * 3 * t * Math.pow(1 - t, 2) + p2 * 3 * Math.pow(t, 2) * (1 - t) + p3 * Math.pow(t, 3);
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = buildPathstring;

	var _bernsteinPoint = __webpack_require__(3);

	/**
	 * This object references all the functions which build pathstring segments.
	 * Every functions take the same signature (point, prev) and return a string.
	 * e.g. buildSegment.l(
	 *   { code: "l", x: 50, y: 50, parameters: {} },
	 *   { code: "m", x: 0, y: 0, parameters: {} }
	 * )
	 * --> "l50 50"
	 */
	var buildSegment = {
	  m: function m(_ref, prev) {
	    var x = _ref.x;
	    var y = _ref.y;
	    var parameters = _ref.parameters;

	    return r(x - prev.x) + " " + r(y - prev.y);
	  },
	  M: function M(_ref2, prev) {
	    var x = _ref2.x;
	    var y = _ref2.y;
	    var parameters = _ref2.parameters;

	    return r(x) + " " + r(y);
	  },
	  l: function l(_ref3, prev) {
	    var x = _ref3.x;
	    var y = _ref3.y;
	    var parameters = _ref3.parameters;

	    return r(x - prev.x) + " " + r(y - prev.y);
	  },
	  L: function L(_ref4, prev) {
	    var x = _ref4.x;
	    var y = _ref4.y;
	    var parameters = _ref4.parameters;

	    return r(x) + " " + r(y);
	  },
	  h: function h(_ref5, prev) {
	    var x = _ref5.x;
	    var y = _ref5.y;
	    var parameters = _ref5.parameters;

	    return "" + r(x - prev.x);
	  },
	  H: function H(_ref6, prev) {
	    var x = _ref6.x;
	    var y = _ref6.y;
	    var parameters = _ref6.parameters;

	    return "" + r(x);
	  },
	  v: function v(_ref7, prev) {
	    var x = _ref7.x;
	    var y = _ref7.y;
	    var parameters = _ref7.parameters;

	    return "" + r(y - prev.y);
	  },
	  V: function V(_ref8, prev) {
	    var x = _ref8.x;
	    var y = _ref8.y;
	    var parameters = _ref8.parameters;

	    return "" + r(y);
	  },
	  q: function q(_ref9, prev) {
	    var x = _ref9.x;
	    var y = _ref9.y;
	    var parameters = _ref9.parameters;

	    return r(parameters.x1 - prev.x) + " " + r(parameters.y1 - prev.y) + " " + r(x - prev.x) + " " + r(y - prev.y);
	  },
	  Q: function Q(_ref10, prev) {
	    var x = _ref10.x;
	    var y = _ref10.y;
	    var parameters = _ref10.parameters;

	    return r(parameters.x1) + " " + r(parameters.y1) + " " + r(x) + " " + r(y);
	  },
	  t: function t(_ref11, prev) {
	    var x = _ref11.x;
	    var y = _ref11.y;
	    var parameters = _ref11.parameters;

	    return r(x - prev.x) + " " + r(y - prev.y);
	  },
	  T: function T(_ref12, prev) {
	    var x = _ref12.x;
	    var y = _ref12.y;
	    var parameters = _ref12.parameters;

	    return r(x) + " " + r(y);
	  },
	  c: function c(_ref13, prev) {
	    var x = _ref13.x;
	    var y = _ref13.y;
	    var parameters = _ref13.parameters;

	    return r(parameters.x1 - prev.x) + " " + r(parameters.y1 - prev.y) + " " + r(parameters.x2 - prev.x) + " " + r(parameters.y2 - prev.y) + " " + r(x - prev.x) + " " + r(y - prev.y);
	  },
	  C: function C(_ref14, prev) {
	    var x = _ref14.x;
	    var y = _ref14.y;
	    var parameters = _ref14.parameters;

	    return r(parameters.x1) + " " + r(parameters.y1) + " " + r(parameters.x2) + " " + r(parameters.y2) + " " + r(x) + " " + r(y);
	  },
	  s: function s(_ref15, prev) {
	    var x = _ref15.x;
	    var y = _ref15.y;
	    var parameters = _ref15.parameters;

	    return r(parameters.x2 - prev.x) + " " + r(parameters.y2 - prev.y) + " " + r(x - prev.x) + " " + r(y - prev.y);
	  },
	  S: function S(_ref16, prev) {
	    var x = _ref16.x;
	    var y = _ref16.y;
	    var parameters = _ref16.parameters;

	    return r(parameters.x2) + " " + r(parameters.y2) + " " + r(x) + " " + r(y);
	  },
	  a: function a(_ref17, prev) {
	    var x = _ref17.x;
	    var y = _ref17.y;
	    var parameters = _ref17.parameters;

	    return r(parameters.rx) + " " + r(parameters.ry) + " " + r(parameters.rotation) + " " + parameters.large + " " + parameters.sweep + " " + r(x - prev.x) + " " + r(y - prev.y);
	  },
	  A: function A(_ref18, prev) {
	    var x = _ref18.x;
	    var y = _ref18.y;
	    var parameters = _ref18.parameters;

	    return r(parameters.rx) + " " + r(parameters.ry) + " " + r(parameters.rotation) + " " + parameters.large + " " + parameters.sweep + " " + r(x) + " " + r(y);
	  },
	  z: function z() {
	    return "";
	  },
	  Z: function Z() {
	    return "";
	  }
	};

	function r(n) {
	  var precision = arguments.length <= 1 || arguments[1] === undefined ? 3 : arguments[1];

	  var coef = Math.pow(10, precision);
	  return Math.round(n * coef) / coef;
	}

	/**
	 * Transforms a formatted point list into pathstring
	 * e.g. [
	 *   { code: "M", x: 0, y: 0, parameters: {} },
	 *   { code: "l", x: 50, y: 50, parameters: {} },
	 *   { code: "q", x: 150, y: 150, parameters: { x1: 100, y1: 100 } },
	 * ]
	 * --> "M0 0 l50 50 q50 50 100 100"
	 */
	function buildPathstring(points) {
	  return points.reduce(function (acc, point, i) {
	    return "" + acc + point.code + buildSegment[point.code](point, i > 0 ? points[i - 1] : _bernsteinPoint.defaultPoint);
	  }, "").replace(/\s+/g, " ");
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isValid;

	var _bernsteinPoint = __webpack_require__(3);

	var points = _interopRequireWildcard(_bernsteinPoint);

	var _bernsteinParsePathstring = __webpack_require__(22);

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
	  return (0, _bernsteinParsePathstring.getSegments)(d).every(function (_ref) {
	    var _ref2 = _toArray(_ref);

	    var code = _ref2[0];

	    var parameters = _ref2.slice(1);

	    return typeof points[code] === "function" && parameters.length >= points[code].length;
	  });
	}

	function noInvalidCharacters(d) {
	  return (/^[mlhvqtcsaz\d\s,-]*$/gi.test(d)
	  );
	}

/***/ }
/******/ ])
});
;