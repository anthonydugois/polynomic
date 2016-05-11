/******/ (function(modules) { // webpackBootstrap
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

	var context = __webpack_require__(1);
	context.keys().forEach(context);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bernstein-build-pathstring/test/index.js": 2,
		"./bernstein-clean-path/test/index.js": 53,
		"./bernstein-clip-paths/test/index.js": 55,
		"./bernstein-combine-path/test/index.js": 58,
		"./bernstein-core/test/index.js": 59,
		"./bernstein-intersections/test/index.js": 60,
		"./bernstein-join-paths/test/index.js": 63,
		"./bernstein-matrix-path/test/index.js": 65,
		"./bernstein-parse-pathstring/test/index.js": 67,
		"./bernstein-path-is-equal/test/index.js": 68,
		"./bernstein-pathstring-is-valid/test/index.js": 69,
		"./bernstein-point-distance/test/index.js": 70,
		"./bernstein-point-is-inside/test/index.js": 71,
		"./bernstein-point-is-relative/test/index.js": 72,
		"./bernstein-point-is/test/index.js": 73,
		"./bernstein-point-minmax/test/index.js": 74,
		"./bernstein-point/test/index.js": 76,
		"./bernstein-reverse-path/test/index.js": 77,
		"./bernstein-rotate-path/test/index.js": 79,
		"./bernstein-scale-path/test/index.js": 81,
		"./bernstein-simplify-path/test/index.js": 83,
		"./bernstein-skew-path/test/index.js": 85,
		"./bernstein-split-path/test/index.js": 87,
		"./bernstein-translate-path/test/index.js": 89,
		"./bernstein-union-paths/test/index.js": 91
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinParsePathstring = __webpack_require__(40);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	var _bernsteinBuildPathstring = __webpack_require__(47);

	var _bernsteinBuildPathstring2 = _interopRequireDefault(_bernsteinBuildPathstring);

	var _bernsteinPathIsEqual = __webpack_require__(48);

	var _bernsteinPathIsEqual2 = _interopRequireDefault(_bernsteinPathIsEqual);

	var _bernsteinPathstringIsValid = __webpack_require__(52);

	var _bernsteinPathstringIsValid2 = _interopRequireDefault(_bernsteinPathstringIsValid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("build-pathstring", function () {
	  var expected = "M0 0l10 10z m0 0L100,56Q10 10 50 60t10,10c10 20 30 40 50 60s400 350 236 241a50,50,0,1,0,50,50Z";
	  var test = (0, _bernsteinBuildPathstring2.default)((0, _bernsteinParsePathstring2.default)(expected));

	  it("should build a pathstring from array of points", function () {
	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });

	  it("should build a valid pathstring", function () {
	    _chai.assert.isTrue((0, _bernsteinPathstringIsValid2.default)(test));
	  });
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	var used = []
	  , exports = module.exports = {};

	/*!
	 * Chai version
	 */

	exports.version = '3.5.0';

	/*!
	 * Assertion Error
	 */

	exports.AssertionError = __webpack_require__(5);

	/*!
	 * Utils for plugins (not exported)
	 */

	var util = __webpack_require__(6);

	/**
	 * # .use(function)
	 *
	 * Provides a way to extend the internals of Chai
	 *
	 * @param {Function}
	 * @returns {this} for chaining
	 * @api public
	 */

	exports.use = function (fn) {
	  if (!~used.indexOf(fn)) {
	    fn(this, util);
	    used.push(fn);
	  }

	  return this;
	};

	/*!
	 * Utility Functions
	 */

	exports.util = util;

	/*!
	 * Configuration
	 */

	var config = __webpack_require__(19);
	exports.config = config;

	/*!
	 * Primary `Assertion` prototype
	 */

	var assertion = __webpack_require__(35);
	exports.use(assertion);

	/*!
	 * Core Assertions
	 */

	var core = __webpack_require__(36);
	exports.use(core);

	/*!
	 * Expect interface
	 */

	var expect = __webpack_require__(37);
	exports.use(expect);

	/*!
	 * Should interface
	 */

	var should = __webpack_require__(38);
	exports.use(should);

	/*!
	 * Assert interface
	 */

	var assert = __webpack_require__(39);
	exports.use(assert);


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*!
	 * assertion-error
	 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
	 * MIT Licensed
	 */

	/*!
	 * Return a function that will copy properties from
	 * one object to another excluding any originally
	 * listed. Returned function will create a new `{}`.
	 *
	 * @param {String} excluded properties ...
	 * @return {Function}
	 */

	function exclude () {
	  var excludes = [].slice.call(arguments);

	  function excludeProps (res, obj) {
	    Object.keys(obj).forEach(function (key) {
	      if (!~excludes.indexOf(key)) res[key] = obj[key];
	    });
	  }

	  return function extendExclude () {
	    var args = [].slice.call(arguments)
	      , i = 0
	      , res = {};

	    for (; i < args.length; i++) {
	      excludeProps(res, args[i]);
	    }

	    return res;
	  };
	};

	/*!
	 * Primary Exports
	 */

	module.exports = AssertionError;

	/**
	 * ### AssertionError
	 *
	 * An extension of the JavaScript `Error` constructor for
	 * assertion and validation scenarios.
	 *
	 * @param {String} message
	 * @param {Object} properties to include (optional)
	 * @param {callee} start stack function (optional)
	 */

	function AssertionError (message, _props, ssf) {
	  var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON')
	    , props = extend(_props || {});

	  // default values
	  this.message = message || 'Unspecified AssertionError';
	  this.showDiff = false;

	  // copy from properties
	  for (var key in props) {
	    this[key] = props[key];
	  }

	  // capture stack trace
	  ssf = ssf || arguments.callee;
	  if (ssf && Error.captureStackTrace) {
	    Error.captureStackTrace(this, ssf);
	  } else {
	    this.stack = new Error().stack;
	  }
	}

	/*!
	 * Inherit from Error.prototype
	 */

	AssertionError.prototype = Object.create(Error.prototype);

	/*!
	 * Statically set name
	 */

	AssertionError.prototype.name = 'AssertionError';

	/*!
	 * Ensure correct constructor
	 */

	AssertionError.prototype.constructor = AssertionError;

	/**
	 * Allow errors to be converted to JSON for static transfer.
	 *
	 * @param {Boolean} include stack (default: `true`)
	 * @return {Object} object that can be `JSON.stringify`
	 */

	AssertionError.prototype.toJSON = function (stack) {
	  var extend = exclude('constructor', 'toJSON', 'stack')
	    , props = extend({ name: this.name }, this);

	  // include stack if exists and not turned off
	  if (false !== stack && this.stack) {
	    props.stack = this.stack;
	  }

	  return props;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * chai
	 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Main exports
	 */

	var exports = module.exports = {};

	/*!
	 * test utility
	 */

	exports.test = __webpack_require__(7);

	/*!
	 * type utility
	 */

	exports.type = __webpack_require__(9);

	/*!
	 * expectTypes utility
	 */
	exports.expectTypes = __webpack_require__(11);

	/*!
	 * message utility
	 */

	exports.getMessage = __webpack_require__(12);

	/*!
	 * actual utility
	 */

	exports.getActual = __webpack_require__(13);

	/*!
	 * Inspect util
	 */

	exports.inspect = __webpack_require__(14);

	/*!
	 * Object Display util
	 */

	exports.objDisplay = __webpack_require__(18);

	/*!
	 * Flag utility
	 */

	exports.flag = __webpack_require__(8);

	/*!
	 * Flag transferring utility
	 */

	exports.transferFlags = __webpack_require__(20);

	/*!
	 * Deep equal utility
	 */

	exports.eql = __webpack_require__(21);

	/*!
	 * Deep path value
	 */

	exports.getPathValue = __webpack_require__(26);

	/*!
	 * Deep path info
	 */

	exports.getPathInfo = __webpack_require__(27);

	/*!
	 * Check if a property exists
	 */

	exports.hasProperty = __webpack_require__(28);

	/*!
	 * Function name
	 */

	exports.getName = __webpack_require__(15);

	/*!
	 * add Property
	 */

	exports.addProperty = __webpack_require__(29);

	/*!
	 * add Method
	 */

	exports.addMethod = __webpack_require__(30);

	/*!
	 * overwrite Property
	 */

	exports.overwriteProperty = __webpack_require__(31);

	/*!
	 * overwrite Method
	 */

	exports.overwriteMethod = __webpack_require__(32);

	/*!
	 * Add a chainable method
	 */

	exports.addChainableMethod = __webpack_require__(33);

	/*!
	 * Overwrite chainable method
	 */

	exports.overwriteChainableMethod = __webpack_require__(34);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - test utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Module dependancies
	 */

	var flag = __webpack_require__(8);

	/**
	 * # test(object, expression)
	 *
	 * Test and object for expression.
	 *
	 * @param {Object} object (constructed Assertion)
	 * @param {Arguments} chai.Assertion.prototype.assert arguments
	 * @namespace Utils
	 * @name test
	 */

	module.exports = function (obj, args) {
	  var negate = flag(obj, 'negate')
	    , expr = args[0];
	  return negate ? !expr : expr;
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	/*!
	 * Chai - flag utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * ### flag(object, key, [value])
	 *
	 * Get or set a flag value on an object. If a
	 * value is provided it will be set, else it will
	 * return the currently set value or `undefined` if
	 * the value is not set.
	 *
	 *     utils.flag(this, 'foo', 'bar'); // setter
	 *     utils.flag(this, 'foo'); // getter, returns `bar`
	 *
	 * @param {Object} object constructed Assertion
	 * @param {String} key
	 * @param {Mixed} value (optional)
	 * @namespace Utils
	 * @name flag
	 * @api private
	 */

	module.exports = function (obj, key, value) {
	  var flags = obj.__flags || (obj.__flags = Object.create(null));
	  if (arguments.length === 3) {
	    flags[key] = value;
	  } else {
	    return flags[key];
	  }
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);


/***/ },
/* 10 */
/***/ function(module, exports) {

	/*!
	 * type-detect
	 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Primary Exports
	 */

	var exports = module.exports = getType;

	/**
	 * ### typeOf (obj)
	 *
	 * Use several different techniques to determine
	 * the type of object being tested.
	 *
	 *
	 * @param {Mixed} object
	 * @return {String} object type
	 * @api public
	 */
	var objectTypeRegexp = /^\[object (.*)\]$/;

	function getType(obj) {
	  var type = Object.prototype.toString.call(obj).match(objectTypeRegexp)[1].toLowerCase();
	  // Let "new String('')" return 'object'
	  if (typeof Promise === 'function' && obj instanceof Promise) return 'promise';
	  // PhantomJS has type "DOMWindow" for null
	  if (obj === null) return 'null';
	  // PhantomJS has type "DOMWindow" for undefined
	  if (obj === undefined) return 'undefined';
	  return type;
	}

	exports.Library = Library;

	/**
	 * ### Library
	 *
	 * Create a repository for custom type detection.
	 *
	 * ```js
	 * var lib = new type.Library;
	 * ```
	 *
	 */

	function Library() {
	  if (!(this instanceof Library)) return new Library();
	  this.tests = {};
	}

	/**
	 * #### .of (obj)
	 *
	 * Expose replacement `typeof` detection to the library.
	 *
	 * ```js
	 * if ('string' === lib.of('hello world')) {
	 *   // ...
	 * }
	 * ```
	 *
	 * @param {Mixed} object to test
	 * @return {String} type
	 */

	Library.prototype.of = getType;

	/**
	 * #### .define (type, test)
	 *
	 * Add a test to for the `.test()` assertion.
	 *
	 * Can be defined as a regular expression:
	 *
	 * ```js
	 * lib.define('int', /^[0-9]+$/);
	 * ```
	 *
	 * ... or as a function:
	 *
	 * ```js
	 * lib.define('bln', function (obj) {
	 *   if ('boolean' === lib.of(obj)) return true;
	 *   var blns = [ 'yes', 'no', 'true', 'false', 1, 0 ];
	 *   if ('string' === lib.of(obj)) obj = obj.toLowerCase();
	 *   return !! ~blns.indexOf(obj);
	 * });
	 * ```
	 *
	 * @param {String} type
	 * @param {RegExp|Function} test
	 * @api public
	 */

	Library.prototype.define = function(type, test) {
	  if (arguments.length === 1) return this.tests[type];
	  this.tests[type] = test;
	  return this;
	};

	/**
	 * #### .test (obj, test)
	 *
	 * Assert that an object is of type. Will first
	 * check natives, and if that does not pass it will
	 * use the user defined custom tests.
	 *
	 * ```js
	 * assert(lib.test('1', 'int'));
	 * assert(lib.test('yes', 'bln'));
	 * ```
	 *
	 * @param {Mixed} object
	 * @param {String} type
	 * @return {Boolean} result
	 * @api public
	 */

	Library.prototype.test = function(obj, type) {
	  if (type === getType(obj)) return true;
	  var test = this.tests[type];

	  if (test && 'regexp' === getType(test)) {
	    return test.test(obj);
	  } else if (test && 'function' === getType(test)) {
	    return test(obj);
	  } else {
	    throw new ReferenceError('Type test "' + type + '" not defined or invalid.');
	  }
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - expectTypes utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * ### expectTypes(obj, types)
	 *
	 * Ensures that the object being tested against is of a valid type.
	 *
	 *     utils.expectTypes(this, ['array', 'object', 'string']);
	 *
	 * @param {Mixed} obj constructed Assertion
	 * @param {Array} type A list of allowed types for this assertion
	 * @namespace Utils
	 * @name expectTypes
	 * @api public
	 */

	var AssertionError = __webpack_require__(5);
	var flag = __webpack_require__(8);
	var type = __webpack_require__(9);

	module.exports = function (obj, types) {
	  var obj = flag(obj, 'object');
	  types = types.map(function (t) { return t.toLowerCase(); });
	  types.sort();

	  // Transforms ['lorem', 'ipsum'] into 'a lirum, or an ipsum'
	  var str = types.map(function (t, index) {
	    var art = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(t.charAt(0)) ? 'an' : 'a';
	    var or = types.length > 1 && index === types.length - 1 ? 'or ' : '';
	    return or + art + ' ' + t;
	  }).join(', ');

	  if (!types.some(function (expected) { return type(obj) === expected; })) {
	    throw new AssertionError(
	      'object tested must be ' + str + ', but ' + type(obj) + ' given'
	    );
	  }
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - message composition utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Module dependancies
	 */

	var flag = __webpack_require__(8)
	  , getActual = __webpack_require__(13)
	  , inspect = __webpack_require__(14)
	  , objDisplay = __webpack_require__(18);

	/**
	 * ### .getMessage(object, message, negateMessage)
	 *
	 * Construct the error message based on flags
	 * and template tags. Template tags will return
	 * a stringified inspection of the object referenced.
	 *
	 * Message template tags:
	 * - `#{this}` current asserted object
	 * - `#{act}` actual value
	 * - `#{exp}` expected value
	 *
	 * @param {Object} object (constructed Assertion)
	 * @param {Arguments} chai.Assertion.prototype.assert arguments
	 * @namespace Utils
	 * @name getMessage
	 * @api public
	 */

	module.exports = function (obj, args) {
	  var negate = flag(obj, 'negate')
	    , val = flag(obj, 'object')
	    , expected = args[3]
	    , actual = getActual(obj, args)
	    , msg = negate ? args[2] : args[1]
	    , flagMsg = flag(obj, 'message');

	  if(typeof msg === "function") msg = msg();
	  msg = msg || '';
	  msg = msg
	    .replace(/#\{this\}/g, function () { return objDisplay(val); })
	    .replace(/#\{act\}/g, function () { return objDisplay(actual); })
	    .replace(/#\{exp\}/g, function () { return objDisplay(expected); });

	  return flagMsg ? flagMsg + ': ' + msg : msg;
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	/*!
	 * Chai - getActual utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * # getActual(object, [actual])
	 *
	 * Returns the `actual` value for an Assertion
	 *
	 * @param {Object} object (constructed Assertion)
	 * @param {Arguments} chai.Assertion.prototype.assert arguments
	 * @namespace Utils
	 * @name getActual
	 */

	module.exports = function (obj, args) {
	  return args.length > 4 ? args[4] : obj._obj;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// This is (almost) directly from Node.js utils
	// https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/util.js

	var getName = __webpack_require__(15);
	var getProperties = __webpack_require__(16);
	var getEnumerableProperties = __webpack_require__(17);

	module.exports = inspect;

	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Boolean} showHidden Flag that shows hidden (not enumerable)
	 *    properties of objects.
	 * @param {Number} depth Depth in which to descend in object. Default is 2.
	 * @param {Boolean} colors Flag to turn on ANSI escape codes to color the
	 *    output. Default is false (no coloring).
	 * @namespace Utils
	 * @name inspect
	 */
	function inspect(obj, showHidden, depth, colors) {
	  var ctx = {
	    showHidden: showHidden,
	    seen: [],
	    stylize: function (str) { return str; }
	  };
	  return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
	}

	// Returns true if object is a DOM element.
	var isDOMElement = function (object) {
	  if (typeof HTMLElement === 'object') {
	    return object instanceof HTMLElement;
	  } else {
	    return object &&
	      typeof object === 'object' &&
	      object.nodeType === 1 &&
	      typeof object.nodeName === 'string';
	  }
	};

	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (value && typeof value.inspect === 'function' &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes);
	    if (typeof ret !== 'string') {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // If this is a DOM element, try to get the outer HTML.
	  if (isDOMElement(value)) {
	    if ('outerHTML' in value) {
	      return value.outerHTML;
	      // This value does not have an outerHTML attribute,
	      //   it could still be an XML element
	    } else {
	      // Attempt to serialize it
	      try {
	        if (document.xmlVersion) {
	          var xmlSerializer = new XMLSerializer();
	          return xmlSerializer.serializeToString(value);
	        } else {
	          // Firefox 11- do not support outerHTML
	          //   It does, however, support innerHTML
	          //   Use the following to render the element
	          var ns = "http://www.w3.org/1999/xhtml";
	          var container = document.createElementNS(ns, '_');

	          container.appendChild(value.cloneNode(false));
	          html = container.innerHTML
	            .replace('><', '>' + value.innerHTML + '<');
	          container.innerHTML = '';
	          return html;
	        }
	      } catch (err) {
	        // This could be a non-native DOM implementation,
	        //   continue with the normal flow:
	        //   printing the element as if it is an object.
	      }
	    }
	  }

	  // Look up the keys of the object.
	  var visibleKeys = getEnumerableProperties(value);
	  var keys = ctx.showHidden ? getProperties(value) : visibleKeys;

	  // Some type of object without properties can be shortcutted.
	  // In IE, errors have a single `stack` property, or if they are vanilla `Error`,
	  // a `stack` plus `description` property; ignore those for consistency.
	  if (keys.length === 0 || (isError(value) && (
	      (keys.length === 1 && keys[0] === 'stack') ||
	      (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')
	     ))) {
	    if (typeof value === 'function') {
	      var name = getName(value);
	      var nameSuffix = name ? ': ' + name : '';
	      return ctx.stylize('[Function' + nameSuffix + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (typeof value === 'function') {
	    var name = getName(value);
	    var nameSuffix = name ? ': ' + name : '';
	    base = ' [Function' + nameSuffix + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    return formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  switch (typeof value) {
	    case 'undefined':
	      return ctx.stylize('undefined', 'undefined');

	    case 'string':
	      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                               .replace(/'/g, "\\'")
	                                               .replace(/\\"/g, '"') + '\'';
	      return ctx.stylize(simple, 'string');

	    case 'number':
	      if (value === 0 && (1/value) === -Infinity) {
	        return ctx.stylize('-0', 'number');
	      }
	      return ctx.stylize('' + value, 'number');

	    case 'boolean':
	      return ctx.stylize('' + value, 'boolean');
	  }
	  // For some reason typeof null is "object", so special case here.
	  if (value === null) {
	    return ctx.stylize('null', 'null');
	  }
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (Object.prototype.hasOwnProperty.call(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str;
	  if (value.__lookupGetter__) {
	    if (value.__lookupGetter__(key)) {
	      if (value.__lookupSetter__(key)) {
	        str = ctx.stylize('[Getter/Setter]', 'special');
	      } else {
	        str = ctx.stylize('[Getter]', 'special');
	      }
	    } else {
	      if (value.__lookupSetter__(key)) {
	        str = ctx.stylize('[Setter]', 'special');
	      }
	    }
	  }
	  if (visibleKeys.indexOf(key) < 0) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(value[key]) < 0) {
	      if (recurseTimes === null) {
	        str = formatValue(ctx, value[key], null);
	      } else {
	        str = formatValue(ctx, value[key], recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (typeof name === 'undefined') {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}

	function isArray(ar) {
	  return Array.isArray(ar) ||
	         (typeof ar === 'object' && objectToString(ar) === '[object Array]');
	}

	function isRegExp(re) {
	  return typeof re === 'object' && objectToString(re) === '[object RegExp]';
	}

	function isDate(d) {
	  return typeof d === 'object' && objectToString(d) === '[object Date]';
	}

	function isError(e) {
	  return typeof e === 'object' && objectToString(e) === '[object Error]';
	}

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	/*!
	 * Chai - getName utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * # getName(func)
	 *
	 * Gets the name of a function, in a cross-browser way.
	 *
	 * @param {Function} a function (usually a constructor)
	 * @namespace Utils
	 * @name getName
	 */

	module.exports = function (func) {
	  if (func.name) return func.name;

	  var match = /^\s?function ([^(]*)\(/.exec(func);
	  return match && match[1] ? match[1] : "";
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	/*!
	 * Chai - getProperties utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * ### .getProperties(object)
	 *
	 * This allows the retrieval of property names of an object, enumerable or not,
	 * inherited or not.
	 *
	 * @param {Object} object
	 * @returns {Array}
	 * @namespace Utils
	 * @name getProperties
	 * @api public
	 */

	module.exports = function getProperties(object) {
	  var result = Object.getOwnPropertyNames(object);

	  function addProperty(property) {
	    if (result.indexOf(property) === -1) {
	      result.push(property);
	    }
	  }

	  var proto = Object.getPrototypeOf(object);
	  while (proto !== null) {
	    Object.getOwnPropertyNames(proto).forEach(addProperty);
	    proto = Object.getPrototypeOf(proto);
	  }

	  return result;
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	/*!
	 * Chai - getEnumerableProperties utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * ### .getEnumerableProperties(object)
	 *
	 * This allows the retrieval of enumerable property names of an object,
	 * inherited or not.
	 *
	 * @param {Object} object
	 * @returns {Array}
	 * @namespace Utils
	 * @name getEnumerableProperties
	 * @api public
	 */

	module.exports = function getEnumerableProperties(object) {
	  var result = [];
	  for (var name in object) {
	    result.push(name);
	  }
	  return result;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - flag utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Module dependancies
	 */

	var inspect = __webpack_require__(14);
	var config = __webpack_require__(19);

	/**
	 * ### .objDisplay (object)
	 *
	 * Determines if an object or an array matches
	 * criteria to be inspected in-line for error
	 * messages or should be truncated.
	 *
	 * @param {Mixed} javascript object to inspect
	 * @name objDisplay
	 * @namespace Utils
	 * @api public
	 */

	module.exports = function (obj) {
	  var str = inspect(obj)
	    , type = Object.prototype.toString.call(obj);

	  if (config.truncateThreshold && str.length >= config.truncateThreshold) {
	    if (type === '[object Function]') {
	      return !obj.name || obj.name === ''
	        ? '[Function]'
	        : '[Function: ' + obj.name + ']';
	    } else if (type === '[object Array]') {
	      return '[ Array(' + obj.length + ') ]';
	    } else if (type === '[object Object]') {
	      var keys = Object.keys(obj)
	        , kstr = keys.length > 2
	          ? keys.splice(0, 2).join(', ') + ', ...'
	          : keys.join(', ');
	      return '{ Object (' + kstr + ') }';
	    } else {
	      return str;
	    }
	  } else {
	    return str;
	  }
	};


/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = {

	  /**
	   * ### config.includeStack
	   *
	   * User configurable property, influences whether stack trace
	   * is included in Assertion error message. Default of false
	   * suppresses stack trace in the error message.
	   *
	   *     chai.config.includeStack = true;  // enable stack on error
	   *
	   * @param {Boolean}
	   * @api public
	   */

	   includeStack: false,

	  /**
	   * ### config.showDiff
	   *
	   * User configurable property, influences whether or not
	   * the `showDiff` flag should be included in the thrown
	   * AssertionErrors. `false` will always be `false`; `true`
	   * will be true when the assertion has requested a diff
	   * be shown.
	   *
	   * @param {Boolean}
	   * @api public
	   */

	  showDiff: true,

	  /**
	   * ### config.truncateThreshold
	   *
	   * User configurable property, sets length threshold for actual and
	   * expected values in assertion errors. If this threshold is exceeded, for
	   * example for large data structures, the value is replaced with something
	   * like `[ Array(3) ]` or `{ Object (prop1, prop2) }`.
	   *
	   * Set it to zero if you want to disable truncating altogether.
	   *
	   * This is especially userful when doing assertions on arrays: having this
	   * set to a reasonable large value makes the failure messages readily
	   * inspectable.
	   *
	   *     chai.config.truncateThreshold = 0;  // disable truncating
	   *
	   * @param {Number}
	   * @api public
	   */

	  truncateThreshold: 40

	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	/*!
	 * Chai - transferFlags utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * ### transferFlags(assertion, object, includeAll = true)
	 *
	 * Transfer all the flags for `assertion` to `object`. If
	 * `includeAll` is set to `false`, then the base Chai
	 * assertion flags (namely `object`, `ssfi`, and `message`)
	 * will not be transferred.
	 *
	 *
	 *     var newAssertion = new Assertion();
	 *     utils.transferFlags(assertion, newAssertion);
	 *
	 *     var anotherAsseriton = new Assertion(myObj);
	 *     utils.transferFlags(assertion, anotherAssertion, false);
	 *
	 * @param {Assertion} assertion the assertion to transfer the flags from
	 * @param {Object} object the object to transfer the flags to; usually a new assertion
	 * @param {Boolean} includeAll
	 * @namespace Utils
	 * @name transferFlags
	 * @api private
	 */

	module.exports = function (assertion, object, includeAll) {
	  var flags = assertion.__flags || (assertion.__flags = Object.create(null));

	  if (!object.__flags) {
	    object.__flags = Object.create(null);
	  }

	  includeAll = arguments.length === 3 ? includeAll : true;

	  for (var flag in flags) {
	    if (includeAll ||
	        (flag !== 'object' && flag !== 'ssfi' && flag != 'message')) {
	      object.__flags[flag] = flags[flag];
	    }
	  }
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * deep-eql
	 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Module dependencies
	 */

	var type = __webpack_require__(23);

	/*!
	 * Buffer.isBuffer browser shim
	 */

	var Buffer;
	try { Buffer = __webpack_require__(25).Buffer; }
	catch(ex) {
	  Buffer = {};
	  Buffer.isBuffer = function() { return false; }
	}

	/*!
	 * Primary Export
	 */

	module.exports = deepEqual;

	/**
	 * Assert super-strict (egal) equality between
	 * two objects of any type.
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @param {Array} memoised (optional)
	 * @return {Boolean} equal match
	 */

	function deepEqual(a, b, m) {
	  if (sameValue(a, b)) {
	    return true;
	  } else if ('date' === type(a)) {
	    return dateEqual(a, b);
	  } else if ('regexp' === type(a)) {
	    return regexpEqual(a, b);
	  } else if (Buffer.isBuffer(a)) {
	    return bufferEqual(a, b);
	  } else if ('arguments' === type(a)) {
	    return argumentsEqual(a, b, m);
	  } else if (!typeEqual(a, b)) {
	    return false;
	  } else if (('object' !== type(a) && 'object' !== type(b))
	  && ('array' !== type(a) && 'array' !== type(b))) {
	    return sameValue(a, b);
	  } else {
	    return objectEqual(a, b, m);
	  }
	}

	/*!
	 * Strict (egal) equality test. Ensures that NaN always
	 * equals NaN and `-0` does not equal `+0`.
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @return {Boolean} equal match
	 */

	function sameValue(a, b) {
	  if (a === b) return a !== 0 || 1 / a === 1 / b;
	  return a !== a && b !== b;
	}

	/*!
	 * Compare the types of two given objects and
	 * return if they are equal. Note that an Array
	 * has a type of `array` (not `object`) and arguments
	 * have a type of `arguments` (not `array`/`object`).
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @return {Boolean} result
	 */

	function typeEqual(a, b) {
	  return type(a) === type(b);
	}

	/*!
	 * Compare two Date objects by asserting that
	 * the time values are equal using `saveValue`.
	 *
	 * @param {Date} a
	 * @param {Date} b
	 * @return {Boolean} result
	 */

	function dateEqual(a, b) {
	  if ('date' !== type(b)) return false;
	  return sameValue(a.getTime(), b.getTime());
	}

	/*!
	 * Compare two regular expressions by converting them
	 * to string and checking for `sameValue`.
	 *
	 * @param {RegExp} a
	 * @param {RegExp} b
	 * @return {Boolean} result
	 */

	function regexpEqual(a, b) {
	  if ('regexp' !== type(b)) return false;
	  return sameValue(a.toString(), b.toString());
	}

	/*!
	 * Assert deep equality of two `arguments` objects.
	 * Unfortunately, these must be sliced to arrays
	 * prior to test to ensure no bad behavior.
	 *
	 * @param {Arguments} a
	 * @param {Arguments} b
	 * @param {Array} memoize (optional)
	 * @return {Boolean} result
	 */

	function argumentsEqual(a, b, m) {
	  if ('arguments' !== type(b)) return false;
	  a = [].slice.call(a);
	  b = [].slice.call(b);
	  return deepEqual(a, b, m);
	}

	/*!
	 * Get enumerable properties of a given object.
	 *
	 * @param {Object} a
	 * @return {Array} property names
	 */

	function enumerable(a) {
	  var res = [];
	  for (var key in a) res.push(key);
	  return res;
	}

	/*!
	 * Simple equality for flat iterable objects
	 * such as Arrays or Node.js buffers.
	 *
	 * @param {Iterable} a
	 * @param {Iterable} b
	 * @return {Boolean} result
	 */

	function iterableEqual(a, b) {
	  if (a.length !==  b.length) return false;

	  var i = 0;
	  var match = true;

	  for (; i < a.length; i++) {
	    if (a[i] !== b[i]) {
	      match = false;
	      break;
	    }
	  }

	  return match;
	}

	/*!
	 * Extension to `iterableEqual` specifically
	 * for Node.js Buffers.
	 *
	 * @param {Buffer} a
	 * @param {Mixed} b
	 * @return {Boolean} result
	 */

	function bufferEqual(a, b) {
	  if (!Buffer.isBuffer(b)) return false;
	  return iterableEqual(a, b);
	}

	/*!
	 * Block for `objectEqual` ensuring non-existing
	 * values don't get in.
	 *
	 * @param {Mixed} object
	 * @return {Boolean} result
	 */

	function isValue(a) {
	  return a !== null && a !== undefined;
	}

	/*!
	 * Recursively check the equality of two objects.
	 * Once basic sameness has been established it will
	 * defer to `deepEqual` for each enumerable key
	 * in the object.
	 *
	 * @param {Mixed} a
	 * @param {Mixed} b
	 * @return {Boolean} result
	 */

	function objectEqual(a, b, m) {
	  if (!isValue(a) || !isValue(b)) {
	    return false;
	  }

	  if (a.prototype !== b.prototype) {
	    return false;
	  }

	  var i;
	  if (m) {
	    for (i = 0; i < m.length; i++) {
	      if ((m[i][0] === a && m[i][1] === b)
	      ||  (m[i][0] === b && m[i][1] === a)) {
	        return true;
	      }
	    }
	  } else {
	    m = [];
	  }

	  try {
	    var ka = enumerable(a);
	    var kb = enumerable(b);
	  } catch (ex) {
	    return false;
	  }

	  ka.sort();
	  kb.sort();

	  if (!iterableEqual(ka, kb)) {
	    return false;
	  }

	  m.push([ a, b ]);

	  var key;
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], m)) {
	      return false;
	    }
	  }

	  return true;
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(24);


/***/ },
/* 24 */
/***/ function(module, exports) {

	/*!
	 * type-detect
	 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Primary Exports
	 */

	var exports = module.exports = getType;

	/*!
	 * Detectable javascript natives
	 */

	var natives = {
	    '[object Array]': 'array'
	  , '[object RegExp]': 'regexp'
	  , '[object Function]': 'function'
	  , '[object Arguments]': 'arguments'
	  , '[object Date]': 'date'
	};

	/**
	 * ### typeOf (obj)
	 *
	 * Use several different techniques to determine
	 * the type of object being tested.
	 *
	 *
	 * @param {Mixed} object
	 * @return {String} object type
	 * @api public
	 */

	function getType (obj) {
	  var str = Object.prototype.toString.call(obj);
	  if (natives[str]) return natives[str];
	  if (obj === null) return 'null';
	  if (obj === undefined) return 'undefined';
	  if (obj === Object(obj)) return 'object';
	  return typeof obj;
	}

	exports.Library = Library;

	/**
	 * ### Library
	 *
	 * Create a repository for custom type detection.
	 *
	 * ```js
	 * var lib = new type.Library;
	 * ```
	 *
	 */

	function Library () {
	  this.tests = {};
	}

	/**
	 * #### .of (obj)
	 *
	 * Expose replacement `typeof` detection to the library.
	 *
	 * ```js
	 * if ('string' === lib.of('hello world')) {
	 *   // ...
	 * }
	 * ```
	 *
	 * @param {Mixed} object to test
	 * @return {String} type
	 */

	Library.prototype.of = getType;

	/**
	 * #### .define (type, test)
	 *
	 * Add a test to for the `.test()` assertion.
	 *
	 * Can be defined as a regular expression:
	 *
	 * ```js
	 * lib.define('int', /^[0-9]+$/);
	 * ```
	 *
	 * ... or as a function:
	 *
	 * ```js
	 * lib.define('bln', function (obj) {
	 *   if ('boolean' === lib.of(obj)) return true;
	 *   var blns = [ 'yes', 'no', 'true', 'false', 1, 0 ];
	 *   if ('string' === lib.of(obj)) obj = obj.toLowerCase();
	 *   return !! ~blns.indexOf(obj);
	 * });
	 * ```
	 *
	 * @param {String} type
	 * @param {RegExp|Function} test
	 * @api public
	 */

	Library.prototype.define = function (type, test) {
	  if (arguments.length === 1) return this.tests[type];
	  this.tests[type] = test;
	  return this;
	};

	/**
	 * #### .test (obj, test)
	 *
	 * Assert that an object is of type. Will first
	 * check natives, and if that does not pass it will
	 * use the user defined custom tests.
	 *
	 * ```js
	 * assert(lib.test('1', 'int'));
	 * assert(lib.test('yes', 'bln'));
	 * ```
	 *
	 * @param {Mixed} object
	 * @param {String} type
	 * @return {Boolean} result
	 * @api public
	 */

	Library.prototype.test = function (obj, type) {
	  if (type === getType(obj)) return true;
	  var test = this.tests[type];

	  if (test && 'regexp' === getType(test)) {
	    return test.test(obj);
	  } else if (test && 'function' === getType(test)) {
	    return test(obj);
	  } else {
	    throw new ReferenceError('Type test "' + type + '" not defined or invalid.');
	  }
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("buffer");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - getPathValue utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * @see https://github.com/logicalparadox/filtr
	 * MIT Licensed
	 */

	var getPathInfo = __webpack_require__(27);

	/**
	 * ### .getPathValue(path, object)
	 *
	 * This allows the retrieval of values in an
	 * object given a string path.
	 *
	 *     var obj = {
	 *         prop1: {
	 *             arr: ['a', 'b', 'c']
	 *           , str: 'Hello'
	 *         }
	 *       , prop2: {
	 *             arr: [ { nested: 'Universe' } ]
	 *           , str: 'Hello again!'
	 *         }
	 *     }
	 *
	 * The following would be the results.
	 *
	 *     getPathValue('prop1.str', obj); // Hello
	 *     getPathValue('prop1.att[2]', obj); // b
	 *     getPathValue('prop2.arr[0].nested', obj); // Universe
	 *
	 * @param {String} path
	 * @param {Object} object
	 * @returns {Object} value or `undefined`
	 * @namespace Utils
	 * @name getPathValue
	 * @api public
	 */
	module.exports = function(path, obj) {
	  var info = getPathInfo(path, obj);
	  return info.value;
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - getPathInfo utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	var hasProperty = __webpack_require__(28);

	/**
	 * ### .getPathInfo(path, object)
	 *
	 * This allows the retrieval of property info in an
	 * object given a string path.
	 *
	 * The path info consists of an object with the
	 * following properties:
	 *
	 * * parent - The parent object of the property referenced by `path`
	 * * name - The name of the final property, a number if it was an array indexer
	 * * value - The value of the property, if it exists, otherwise `undefined`
	 * * exists - Whether the property exists or not
	 *
	 * @param {String} path
	 * @param {Object} object
	 * @returns {Object} info
	 * @namespace Utils
	 * @name getPathInfo
	 * @api public
	 */

	module.exports = function getPathInfo(path, obj) {
	  var parsed = parsePath(path),
	      last = parsed[parsed.length - 1];

	  var info = {
	    parent: parsed.length > 1 ? _getPathValue(parsed, obj, parsed.length - 1) : obj,
	    name: last.p || last.i,
	    value: _getPathValue(parsed, obj)
	  };
	  info.exists = hasProperty(info.name, info.parent);

	  return info;
	};


	/*!
	 * ## parsePath(path)
	 *
	 * Helper function used to parse string object
	 * paths. Use in conjunction with `_getPathValue`.
	 *
	 *      var parsed = parsePath('myobject.property.subprop');
	 *
	 * ### Paths:
	 *
	 * * Can be as near infinitely deep and nested
	 * * Arrays are also valid using the formal `myobject.document[3].property`.
	 * * Literal dots and brackets (not delimiter) must be backslash-escaped.
	 *
	 * @param {String} path
	 * @returns {Object} parsed
	 * @api private
	 */

	function parsePath (path) {
	  var str = path.replace(/([^\\])\[/g, '$1.[')
	    , parts = str.match(/(\\\.|[^.]+?)+/g);
	  return parts.map(function (value) {
	    var re = /^\[(\d+)\]$/
	      , mArr = re.exec(value);
	    if (mArr) return { i: parseFloat(mArr[1]) };
	    else return { p: value.replace(/\\([.\[\]])/g, '$1') };
	  });
	}


	/*!
	 * ## _getPathValue(parsed, obj)
	 *
	 * Helper companion function for `.parsePath` that returns
	 * the value located at the parsed address.
	 *
	 *      var value = getPathValue(parsed, obj);
	 *
	 * @param {Object} parsed definition from `parsePath`.
	 * @param {Object} object to search against
	 * @param {Number} object to search against
	 * @returns {Object|Undefined} value
	 * @api private
	 */

	function _getPathValue (parsed, obj, index) {
	  var tmp = obj
	    , res;

	  index = (index === undefined ? parsed.length : index);

	  for (var i = 0, l = index; i < l; i++) {
	    var part = parsed[i];
	    if (tmp) {
	      if ('undefined' !== typeof part.p)
	        tmp = tmp[part.p];
	      else if ('undefined' !== typeof part.i)
	        tmp = tmp[part.i];
	      if (i == (l - 1)) res = tmp;
	    } else {
	      res = undefined;
	    }
	  }
	  return res;
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - hasProperty utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	var type = __webpack_require__(9);

	/**
	 * ### .hasProperty(object, name)
	 *
	 * This allows checking whether an object has
	 * named property or numeric array index.
	 *
	 * Basically does the same thing as the `in`
	 * operator but works properly with natives
	 * and null/undefined values.
	 *
	 *     var obj = {
	 *         arr: ['a', 'b', 'c']
	 *       , str: 'Hello'
	 *     }
	 *
	 * The following would be the results.
	 *
	 *     hasProperty('str', obj);  // true
	 *     hasProperty('constructor', obj);  // true
	 *     hasProperty('bar', obj);  // false
	 *
	 *     hasProperty('length', obj.str); // true
	 *     hasProperty(1, obj.str);  // true
	 *     hasProperty(5, obj.str);  // false
	 *
	 *     hasProperty('length', obj.arr);  // true
	 *     hasProperty(2, obj.arr);  // true
	 *     hasProperty(3, obj.arr);  // false
	 *
	 * @param {Objuect} object
	 * @param {String|Number} name
	 * @returns {Boolean} whether it exists
	 * @namespace Utils
	 * @name getPathInfo
	 * @api public
	 */

	var literals = {
	    'number': Number
	  , 'string': String
	};

	module.exports = function hasProperty(name, obj) {
	  var ot = type(obj);

	  // Bad Object, obviously no props at all
	  if(ot === 'null' || ot === 'undefined')
	    return false;

	  // The `in` operator does not work with certain literals
	  // box these before the check
	  if(literals[ot] && typeof obj !== 'object')
	    obj = new literals[ot](obj);

	  return name in obj;
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - addProperty utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	var config = __webpack_require__(19);
	var flag = __webpack_require__(8);

	/**
	 * ### addProperty (ctx, name, getter)
	 *
	 * Adds a property to the prototype of an object.
	 *
	 *     utils.addProperty(chai.Assertion.prototype, 'foo', function () {
	 *       var obj = utils.flag(this, 'object');
	 *       new chai.Assertion(obj).to.be.instanceof(Foo);
	 *     });
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.addProperty('foo', fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(myFoo).to.be.foo;
	 *
	 * @param {Object} ctx object to which the property is added
	 * @param {String} name of property to add
	 * @param {Function} getter function to be used for name
	 * @namespace Utils
	 * @name addProperty
	 * @api public
	 */

	module.exports = function (ctx, name, getter) {
	  Object.defineProperty(ctx, name,
	    { get: function addProperty() {
	        var old_ssfi = flag(this, 'ssfi');
	        if (old_ssfi && config.includeStack === false)
	          flag(this, 'ssfi', addProperty);

	        var result = getter.call(this);
	        return result === undefined ? this : result;
	      }
	    , configurable: true
	  });
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - addMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	var config = __webpack_require__(19);

	/**
	 * ### .addMethod (ctx, name, method)
	 *
	 * Adds a method to the prototype of an object.
	 *
	 *     utils.addMethod(chai.Assertion.prototype, 'foo', function (str) {
	 *       var obj = utils.flag(this, 'object');
	 *       new chai.Assertion(obj).to.be.equal(str);
	 *     });
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.addMethod('foo', fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(fooStr).to.be.foo('bar');
	 *
	 * @param {Object} ctx object to which the method is added
	 * @param {String} name of method to add
	 * @param {Function} method function to be used for name
	 * @namespace Utils
	 * @name addMethod
	 * @api public
	 */
	var flag = __webpack_require__(8);

	module.exports = function (ctx, name, method) {
	  ctx[name] = function () {
	    var old_ssfi = flag(this, 'ssfi');
	    if (old_ssfi && config.includeStack === false)
	      flag(this, 'ssfi', ctx[name]);
	    var result = method.apply(this, arguments);
	    return result === undefined ? this : result;
	  };
	};


/***/ },
/* 31 */
/***/ function(module, exports) {

	/*!
	 * Chai - overwriteProperty utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * ### overwriteProperty (ctx, name, fn)
	 *
	 * Overwites an already existing property getter and provides
	 * access to previous value. Must return function to use as getter.
	 *
	 *     utils.overwriteProperty(chai.Assertion.prototype, 'ok', function (_super) {
	 *       return function () {
	 *         var obj = utils.flag(this, 'object');
	 *         if (obj instanceof Foo) {
	 *           new chai.Assertion(obj.name).to.equal('bar');
	 *         } else {
	 *           _super.call(this);
	 *         }
	 *       }
	 *     });
	 *
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.overwriteProperty('foo', fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(myFoo).to.be.ok;
	 *
	 * @param {Object} ctx object whose property is to be overwritten
	 * @param {String} name of property to overwrite
	 * @param {Function} getter function that returns a getter function to be used for name
	 * @namespace Utils
	 * @name overwriteProperty
	 * @api public
	 */

	module.exports = function (ctx, name, getter) {
	  var _get = Object.getOwnPropertyDescriptor(ctx, name)
	    , _super = function () {};

	  if (_get && 'function' === typeof _get.get)
	    _super = _get.get

	  Object.defineProperty(ctx, name,
	    { get: function () {
	        var result = getter(_super).call(this);
	        return result === undefined ? this : result;
	      }
	    , configurable: true
	  });
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	/*!
	 * Chai - overwriteMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * ### overwriteMethod (ctx, name, fn)
	 *
	 * Overwites an already existing method and provides
	 * access to previous function. Must return function
	 * to be used for name.
	 *
	 *     utils.overwriteMethod(chai.Assertion.prototype, 'equal', function (_super) {
	 *       return function (str) {
	 *         var obj = utils.flag(this, 'object');
	 *         if (obj instanceof Foo) {
	 *           new chai.Assertion(obj.value).to.equal(str);
	 *         } else {
	 *           _super.apply(this, arguments);
	 *         }
	 *       }
	 *     });
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.overwriteMethod('foo', fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(myFoo).to.equal('bar');
	 *
	 * @param {Object} ctx object whose method is to be overwritten
	 * @param {String} name of method to overwrite
	 * @param {Function} method function that returns a function to be used for name
	 * @namespace Utils
	 * @name overwriteMethod
	 * @api public
	 */

	module.exports = function (ctx, name, method) {
	  var _method = ctx[name]
	    , _super = function () { return this; };

	  if (_method && 'function' === typeof _method)
	    _super = _method;

	  ctx[name] = function () {
	    var result = method(_super).apply(this, arguments);
	    return result === undefined ? this : result;
	  }
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Chai - addChainingMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/*!
	 * Module dependencies
	 */

	var transferFlags = __webpack_require__(20);
	var flag = __webpack_require__(8);
	var config = __webpack_require__(19);

	/*!
	 * Module variables
	 */

	// Check whether `__proto__` is supported
	var hasProtoSupport = '__proto__' in Object;

	// Without `__proto__` support, this module will need to add properties to a function.
	// However, some Function.prototype methods cannot be overwritten,
	// and there seems no easy cross-platform way to detect them (@see chaijs/chai/issues/69).
	var excludeNames = /^(?:length|name|arguments|caller)$/;

	// Cache `Function` properties
	var call  = Function.prototype.call,
	    apply = Function.prototype.apply;

	/**
	 * ### addChainableMethod (ctx, name, method, chainingBehavior)
	 *
	 * Adds a method to an object, such that the method can also be chained.
	 *
	 *     utils.addChainableMethod(chai.Assertion.prototype, 'foo', function (str) {
	 *       var obj = utils.flag(this, 'object');
	 *       new chai.Assertion(obj).to.be.equal(str);
	 *     });
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.addChainableMethod('foo', fn, chainingBehavior);
	 *
	 * The result can then be used as both a method assertion, executing both `method` and
	 * `chainingBehavior`, or as a language chain, which only executes `chainingBehavior`.
	 *
	 *     expect(fooStr).to.be.foo('bar');
	 *     expect(fooStr).to.be.foo.equal('foo');
	 *
	 * @param {Object} ctx object to which the method is added
	 * @param {String} name of method to add
	 * @param {Function} method function to be used for `name`, when called
	 * @param {Function} chainingBehavior function to be called every time the property is accessed
	 * @namespace Utils
	 * @name addChainableMethod
	 * @api public
	 */

	module.exports = function (ctx, name, method, chainingBehavior) {
	  if (typeof chainingBehavior !== 'function') {
	    chainingBehavior = function () { };
	  }

	  var chainableBehavior = {
	      method: method
	    , chainingBehavior: chainingBehavior
	  };

	  // save the methods so we can overwrite them later, if we need to.
	  if (!ctx.__methods) {
	    ctx.__methods = {};
	  }
	  ctx.__methods[name] = chainableBehavior;

	  Object.defineProperty(ctx, name,
	    { get: function () {
	        chainableBehavior.chainingBehavior.call(this);

	        var assert = function assert() {
	          var old_ssfi = flag(this, 'ssfi');
	          if (old_ssfi && config.includeStack === false)
	            flag(this, 'ssfi', assert);
	          var result = chainableBehavior.method.apply(this, arguments);
	          return result === undefined ? this : result;
	        };

	        // Use `__proto__` if available
	        if (hasProtoSupport) {
	          // Inherit all properties from the object by replacing the `Function` prototype
	          var prototype = assert.__proto__ = Object.create(this);
	          // Restore the `call` and `apply` methods from `Function`
	          prototype.call = call;
	          prototype.apply = apply;
	        }
	        // Otherwise, redefine all properties (slow!)
	        else {
	          var asserterNames = Object.getOwnPropertyNames(ctx);
	          asserterNames.forEach(function (asserterName) {
	            if (!excludeNames.test(asserterName)) {
	              var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
	              Object.defineProperty(assert, asserterName, pd);
	            }
	          });
	        }

	        transferFlags(this, assert);
	        return assert;
	      }
	    , configurable: true
	  });
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	/*!
	 * Chai - overwriteChainableMethod utility
	 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	/**
	 * ### overwriteChainableMethod (ctx, name, method, chainingBehavior)
	 *
	 * Overwites an already existing chainable method
	 * and provides access to the previous function or
	 * property.  Must return functions to be used for
	 * name.
	 *
	 *     utils.overwriteChainableMethod(chai.Assertion.prototype, 'length',
	 *       function (_super) {
	 *       }
	 *     , function (_super) {
	 *       }
	 *     );
	 *
	 * Can also be accessed directly from `chai.Assertion`.
	 *
	 *     chai.Assertion.overwriteChainableMethod('foo', fn, fn);
	 *
	 * Then can be used as any other assertion.
	 *
	 *     expect(myFoo).to.have.length(3);
	 *     expect(myFoo).to.have.length.above(3);
	 *
	 * @param {Object} ctx object whose method / property is to be overwritten
	 * @param {String} name of method / property to overwrite
	 * @param {Function} method function that returns a function to be used for name
	 * @param {Function} chainingBehavior function that returns a function to be used for property
	 * @namespace Utils
	 * @name overwriteChainableMethod
	 * @api public
	 */

	module.exports = function (ctx, name, method, chainingBehavior) {
	  var chainableBehavior = ctx.__methods[name];

	  var _chainingBehavior = chainableBehavior.chainingBehavior;
	  chainableBehavior.chainingBehavior = function () {
	    var result = chainingBehavior(_chainingBehavior).call(this);
	    return result === undefined ? this : result;
	  };

	  var _method = chainableBehavior.method;
	  chainableBehavior.method = function () {
	    var result = method(_method).apply(this, arguments);
	    return result === undefined ? this : result;
	  };
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * chai
	 * http://chaijs.com
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	var config = __webpack_require__(19);

	module.exports = function (_chai, util) {
	  /*!
	   * Module dependencies.
	   */

	  var AssertionError = _chai.AssertionError
	    , flag = util.flag;

	  /*!
	   * Module export.
	   */

	  _chai.Assertion = Assertion;

	  /*!
	   * Assertion Constructor
	   *
	   * Creates object for chaining.
	   *
	   * @api private
	   */

	  function Assertion (obj, msg, stack) {
	    flag(this, 'ssfi', stack || arguments.callee);
	    flag(this, 'object', obj);
	    flag(this, 'message', msg);
	  }

	  Object.defineProperty(Assertion, 'includeStack', {
	    get: function() {
	      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
	      return config.includeStack;
	    },
	    set: function(value) {
	      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
	      config.includeStack = value;
	    }
	  });

	  Object.defineProperty(Assertion, 'showDiff', {
	    get: function() {
	      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
	      return config.showDiff;
	    },
	    set: function(value) {
	      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
	      config.showDiff = value;
	    }
	  });

	  Assertion.addProperty = function (name, fn) {
	    util.addProperty(this.prototype, name, fn);
	  };

	  Assertion.addMethod = function (name, fn) {
	    util.addMethod(this.prototype, name, fn);
	  };

	  Assertion.addChainableMethod = function (name, fn, chainingBehavior) {
	    util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
	  };

	  Assertion.overwriteProperty = function (name, fn) {
	    util.overwriteProperty(this.prototype, name, fn);
	  };

	  Assertion.overwriteMethod = function (name, fn) {
	    util.overwriteMethod(this.prototype, name, fn);
	  };

	  Assertion.overwriteChainableMethod = function (name, fn, chainingBehavior) {
	    util.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
	  };

	  /**
	   * ### .assert(expression, message, negateMessage, expected, actual, showDiff)
	   *
	   * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
	   *
	   * @name assert
	   * @param {Philosophical} expression to be tested
	   * @param {String|Function} message or function that returns message to display if expression fails
	   * @param {String|Function} negatedMessage or function that returns negatedMessage to display if negated expression fails
	   * @param {Mixed} expected value (remember to check for negation)
	   * @param {Mixed} actual (optional) will default to `this.obj`
	   * @param {Boolean} showDiff (optional) when set to `true`, assert will display a diff in addition to the message if expression fails
	   * @api private
	   */

	  Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {
	    var ok = util.test(this, arguments);
	    if (true !== showDiff) showDiff = false;
	    if (true !== config.showDiff) showDiff = false;

	    if (!ok) {
	      var msg = util.getMessage(this, arguments)
	        , actual = util.getActual(this, arguments);
	      throw new AssertionError(msg, {
	          actual: actual
	        , expected: expected
	        , showDiff: showDiff
	      }, (config.includeStack) ? this.assert : flag(this, 'ssfi'));
	    }
	  };

	  /*!
	   * ### ._obj
	   *
	   * Quick reference to stored `actual` value for plugin developers.
	   *
	   * @api private
	   */

	  Object.defineProperty(Assertion.prototype, '_obj',
	    { get: function () {
	        return flag(this, 'object');
	      }
	    , set: function (val) {
	        flag(this, 'object', val);
	      }
	  });
	};


/***/ },
/* 36 */
/***/ function(module, exports) {

	/*!
	 * chai
	 * http://chaijs.com
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	module.exports = function (chai, _) {
	  var Assertion = chai.Assertion
	    , toString = Object.prototype.toString
	    , flag = _.flag;

	  /**
	   * ### Language Chains
	   *
	   * The following are provided as chainable getters to
	   * improve the readability of your assertions. They
	   * do not provide testing capabilities unless they
	   * have been overwritten by a plugin.
	   *
	   * **Chains**
	   *
	   * - to
	   * - be
	   * - been
	   * - is
	   * - that
	   * - which
	   * - and
	   * - has
	   * - have
	   * - with
	   * - at
	   * - of
	   * - same
	   *
	   * @name language chains
	   * @namespace BDD
	   * @api public
	   */

	  [ 'to', 'be', 'been'
	  , 'is', 'and', 'has', 'have'
	  , 'with', 'that', 'which', 'at'
	  , 'of', 'same' ].forEach(function (chain) {
	    Assertion.addProperty(chain, function () {
	      return this;
	    });
	  });

	  /**
	   * ### .not
	   *
	   * Negates any of assertions following in the chain.
	   *
	   *     expect(foo).to.not.equal('bar');
	   *     expect(goodFn).to.not.throw(Error);
	   *     expect({ foo: 'baz' }).to.have.property('foo')
	   *       .and.not.equal('bar');
	   *
	   * @name not
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('not', function () {
	    flag(this, 'negate', true);
	  });

	  /**
	   * ### .deep
	   *
	   * Sets the `deep` flag, later used by the `equal` and
	   * `property` assertions.
	   *
	   *     expect(foo).to.deep.equal({ bar: 'baz' });
	   *     expect({ foo: { bar: { baz: 'quux' } } })
	   *       .to.have.deep.property('foo.bar.baz', 'quux');
	   *
	   * `.deep.property` special characters can be escaped
	   * by adding two slashes before the `.` or `[]`.
	   *
	   *     var deepCss = { '.link': { '[target]': 42 }};
	   *     expect(deepCss).to.have.deep.property('\\.link.\\[target\\]', 42);
	   *
	   * @name deep
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('deep', function () {
	    flag(this, 'deep', true);
	  });

	  /**
	   * ### .any
	   *
	   * Sets the `any` flag, (opposite of the `all` flag)
	   * later used in the `keys` assertion.
	   *
	   *     expect(foo).to.have.any.keys('bar', 'baz');
	   *
	   * @name any
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('any', function () {
	    flag(this, 'any', true);
	    flag(this, 'all', false)
	  });


	  /**
	   * ### .all
	   *
	   * Sets the `all` flag (opposite of the `any` flag)
	   * later used by the `keys` assertion.
	   *
	   *     expect(foo).to.have.all.keys('bar', 'baz');
	   *
	   * @name all
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('all', function () {
	    flag(this, 'all', true);
	    flag(this, 'any', false);
	  });

	  /**
	   * ### .a(type)
	   *
	   * The `a` and `an` assertions are aliases that can be
	   * used either as language chains or to assert a value's
	   * type.
	   *
	   *     // typeof
	   *     expect('test').to.be.a('string');
	   *     expect({ foo: 'bar' }).to.be.an('object');
	   *     expect(null).to.be.a('null');
	   *     expect(undefined).to.be.an('undefined');
	   *     expect(new Error).to.be.an('error');
	   *     expect(new Promise).to.be.a('promise');
	   *     expect(new Float32Array()).to.be.a('float32array');
	   *     expect(Symbol()).to.be.a('symbol');
	   *
	   *     // es6 overrides
	   *     expect({[Symbol.toStringTag]:()=>'foo'}).to.be.a('foo');
	   *
	   *     // language chain
	   *     expect(foo).to.be.an.instanceof(Foo);
	   *
	   * @name a
	   * @alias an
	   * @param {String} type
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function an (type, msg) {
	    if (msg) flag(this, 'message', msg);
	    type = type.toLowerCase();
	    var obj = flag(this, 'object')
	      , article = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(type.charAt(0)) ? 'an ' : 'a ';

	    this.assert(
	        type === _.type(obj)
	      , 'expected #{this} to be ' + article + type
	      , 'expected #{this} not to be ' + article + type
	    );
	  }

	  Assertion.addChainableMethod('an', an);
	  Assertion.addChainableMethod('a', an);

	  /**
	   * ### .include(value)
	   *
	   * The `include` and `contain` assertions can be used as either property
	   * based language chains or as methods to assert the inclusion of an object
	   * in an array or a substring in a string. When used as language chains,
	   * they toggle the `contains` flag for the `keys` assertion.
	   *
	   *     expect([1,2,3]).to.include(2);
	   *     expect('foobar').to.contain('foo');
	   *     expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');
	   *
	   * @name include
	   * @alias contain
	   * @alias includes
	   * @alias contains
	   * @param {Object|String|Number} obj
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function includeChainingBehavior () {
	    flag(this, 'contains', true);
	  }

	  function include (val, msg) {
	    _.expectTypes(this, ['array', 'object', 'string']);

	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    var expected = false;

	    if (_.type(obj) === 'array' && _.type(val) === 'object') {
	      for (var i in obj) {
	        if (_.eql(obj[i], val)) {
	          expected = true;
	          break;
	        }
	      }
	    } else if (_.type(val) === 'object') {
	      if (!flag(this, 'negate')) {
	        for (var k in val) new Assertion(obj).property(k, val[k]);
	        return;
	      }
	      var subset = {};
	      for (var k in val) subset[k] = obj[k];
	      expected = _.eql(subset, val);
	    } else {
	      expected = (obj != undefined) && ~obj.indexOf(val);
	    }
	    this.assert(
	        expected
	      , 'expected #{this} to include ' + _.inspect(val)
	      , 'expected #{this} to not include ' + _.inspect(val));
	  }

	  Assertion.addChainableMethod('include', include, includeChainingBehavior);
	  Assertion.addChainableMethod('contain', include, includeChainingBehavior);
	  Assertion.addChainableMethod('contains', include, includeChainingBehavior);
	  Assertion.addChainableMethod('includes', include, includeChainingBehavior);

	  /**
	   * ### .ok
	   *
	   * Asserts that the target is truthy.
	   *
	   *     expect('everything').to.be.ok;
	   *     expect(1).to.be.ok;
	   *     expect(false).to.not.be.ok;
	   *     expect(undefined).to.not.be.ok;
	   *     expect(null).to.not.be.ok;
	   *
	   * @name ok
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('ok', function () {
	    this.assert(
	        flag(this, 'object')
	      , 'expected #{this} to be truthy'
	      , 'expected #{this} to be falsy');
	  });

	  /**
	   * ### .true
	   *
	   * Asserts that the target is `true`.
	   *
	   *     expect(true).to.be.true;
	   *     expect(1).to.not.be.true;
	   *
	   * @name true
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('true', function () {
	    this.assert(
	        true === flag(this, 'object')
	      , 'expected #{this} to be true'
	      , 'expected #{this} to be false'
	      , this.negate ? false : true
	    );
	  });

	  /**
	   * ### .false
	   *
	   * Asserts that the target is `false`.
	   *
	   *     expect(false).to.be.false;
	   *     expect(0).to.not.be.false;
	   *
	   * @name false
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('false', function () {
	    this.assert(
	        false === flag(this, 'object')
	      , 'expected #{this} to be false'
	      , 'expected #{this} to be true'
	      , this.negate ? true : false
	    );
	  });

	  /**
	   * ### .null
	   *
	   * Asserts that the target is `null`.
	   *
	   *     expect(null).to.be.null;
	   *     expect(undefined).to.not.be.null;
	   *
	   * @name null
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('null', function () {
	    this.assert(
	        null === flag(this, 'object')
	      , 'expected #{this} to be null'
	      , 'expected #{this} not to be null'
	    );
	  });

	  /**
	   * ### .undefined
	   *
	   * Asserts that the target is `undefined`.
	   *
	   *     expect(undefined).to.be.undefined;
	   *     expect(null).to.not.be.undefined;
	   *
	   * @name undefined
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('undefined', function () {
	    this.assert(
	        undefined === flag(this, 'object')
	      , 'expected #{this} to be undefined'
	      , 'expected #{this} not to be undefined'
	    );
	  });

	  /**
	   * ### .NaN
	   * Asserts that the target is `NaN`.
	   *
	   *     expect('foo').to.be.NaN;
	   *     expect(4).not.to.be.NaN;
	   *
	   * @name NaN
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('NaN', function () {
	    this.assert(
	        isNaN(flag(this, 'object'))
	        , 'expected #{this} to be NaN'
	        , 'expected #{this} not to be NaN'
	    );
	  });

	  /**
	   * ### .exist
	   *
	   * Asserts that the target is neither `null` nor `undefined`.
	   *
	   *     var foo = 'hi'
	   *       , bar = null
	   *       , baz;
	   *
	   *     expect(foo).to.exist;
	   *     expect(bar).to.not.exist;
	   *     expect(baz).to.not.exist;
	   *
	   * @name exist
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('exist', function () {
	    this.assert(
	        null != flag(this, 'object')
	      , 'expected #{this} to exist'
	      , 'expected #{this} to not exist'
	    );
	  });


	  /**
	   * ### .empty
	   *
	   * Asserts that the target's length is `0`. For arrays and strings, it checks
	   * the `length` property. For objects, it gets the count of
	   * enumerable keys.
	   *
	   *     expect([]).to.be.empty;
	   *     expect('').to.be.empty;
	   *     expect({}).to.be.empty;
	   *
	   * @name empty
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('empty', function () {
	    var obj = flag(this, 'object')
	      , expected = obj;

	    if (Array.isArray(obj) || 'string' === typeof object) {
	      expected = obj.length;
	    } else if (typeof obj === 'object') {
	      expected = Object.keys(obj).length;
	    }

	    this.assert(
	        !expected
	      , 'expected #{this} to be empty'
	      , 'expected #{this} not to be empty'
	    );
	  });

	  /**
	   * ### .arguments
	   *
	   * Asserts that the target is an arguments object.
	   *
	   *     function test () {
	   *       expect(arguments).to.be.arguments;
	   *     }
	   *
	   * @name arguments
	   * @alias Arguments
	   * @namespace BDD
	   * @api public
	   */

	  function checkArguments () {
	    var obj = flag(this, 'object')
	      , type = Object.prototype.toString.call(obj);
	    this.assert(
	        '[object Arguments]' === type
	      , 'expected #{this} to be arguments but got ' + type
	      , 'expected #{this} to not be arguments'
	    );
	  }

	  Assertion.addProperty('arguments', checkArguments);
	  Assertion.addProperty('Arguments', checkArguments);

	  /**
	   * ### .equal(value)
	   *
	   * Asserts that the target is strictly equal (`===`) to `value`.
	   * Alternately, if the `deep` flag is set, asserts that
	   * the target is deeply equal to `value`.
	   *
	   *     expect('hello').to.equal('hello');
	   *     expect(42).to.equal(42);
	   *     expect(1).to.not.equal(true);
	   *     expect({ foo: 'bar' }).to.not.equal({ foo: 'bar' });
	   *     expect({ foo: 'bar' }).to.deep.equal({ foo: 'bar' });
	   *
	   * @name equal
	   * @alias equals
	   * @alias eq
	   * @alias deep.equal
	   * @param {Mixed} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertEqual (val, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'deep')) {
	      return this.eql(val);
	    } else {
	      this.assert(
	          val === obj
	        , 'expected #{this} to equal #{exp}'
	        , 'expected #{this} to not equal #{exp}'
	        , val
	        , this._obj
	        , true
	      );
	    }
	  }

	  Assertion.addMethod('equal', assertEqual);
	  Assertion.addMethod('equals', assertEqual);
	  Assertion.addMethod('eq', assertEqual);

	  /**
	   * ### .eql(value)
	   *
	   * Asserts that the target is deeply equal to `value`.
	   *
	   *     expect({ foo: 'bar' }).to.eql({ foo: 'bar' });
	   *     expect([ 1, 2, 3 ]).to.eql([ 1, 2, 3 ]);
	   *
	   * @name eql
	   * @alias eqls
	   * @param {Mixed} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertEql(obj, msg) {
	    if (msg) flag(this, 'message', msg);
	    this.assert(
	        _.eql(obj, flag(this, 'object'))
	      , 'expected #{this} to deeply equal #{exp}'
	      , 'expected #{this} to not deeply equal #{exp}'
	      , obj
	      , this._obj
	      , true
	    );
	  }

	  Assertion.addMethod('eql', assertEql);
	  Assertion.addMethod('eqls', assertEql);

	  /**
	   * ### .above(value)
	   *
	   * Asserts that the target is greater than `value`.
	   *
	   *     expect(10).to.be.above(5);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a minimum length. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.above(2);
	   *     expect([ 1, 2, 3 ]).to.have.length.above(2);
	   *
	   * @name above
	   * @alias gt
	   * @alias greaterThan
	   * @param {Number} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertAbove (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len > n
	        , 'expected #{this} to have a length above #{exp} but got #{act}'
	        , 'expected #{this} to not have a length above #{exp}'
	        , n
	        , len
	      );
	    } else {
	      this.assert(
	          obj > n
	        , 'expected #{this} to be above ' + n
	        , 'expected #{this} to be at most ' + n
	      );
	    }
	  }

	  Assertion.addMethod('above', assertAbove);
	  Assertion.addMethod('gt', assertAbove);
	  Assertion.addMethod('greaterThan', assertAbove);

	  /**
	   * ### .least(value)
	   *
	   * Asserts that the target is greater than or equal to `value`.
	   *
	   *     expect(10).to.be.at.least(10);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a minimum length. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.of.at.least(2);
	   *     expect([ 1, 2, 3 ]).to.have.length.of.at.least(3);
	   *
	   * @name least
	   * @alias gte
	   * @param {Number} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertLeast (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len >= n
	        , 'expected #{this} to have a length at least #{exp} but got #{act}'
	        , 'expected #{this} to have a length below #{exp}'
	        , n
	        , len
	      );
	    } else {
	      this.assert(
	          obj >= n
	        , 'expected #{this} to be at least ' + n
	        , 'expected #{this} to be below ' + n
	      );
	    }
	  }

	  Assertion.addMethod('least', assertLeast);
	  Assertion.addMethod('gte', assertLeast);

	  /**
	   * ### .below(value)
	   *
	   * Asserts that the target is less than `value`.
	   *
	   *     expect(5).to.be.below(10);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a maximum length. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.below(4);
	   *     expect([ 1, 2, 3 ]).to.have.length.below(4);
	   *
	   * @name below
	   * @alias lt
	   * @alias lessThan
	   * @param {Number} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertBelow (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len < n
	        , 'expected #{this} to have a length below #{exp} but got #{act}'
	        , 'expected #{this} to not have a length below #{exp}'
	        , n
	        , len
	      );
	    } else {
	      this.assert(
	          obj < n
	        , 'expected #{this} to be below ' + n
	        , 'expected #{this} to be at least ' + n
	      );
	    }
	  }

	  Assertion.addMethod('below', assertBelow);
	  Assertion.addMethod('lt', assertBelow);
	  Assertion.addMethod('lessThan', assertBelow);

	  /**
	   * ### .most(value)
	   *
	   * Asserts that the target is less than or equal to `value`.
	   *
	   *     expect(5).to.be.at.most(5);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a maximum length. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.of.at.most(4);
	   *     expect([ 1, 2, 3 ]).to.have.length.of.at.most(3);
	   *
	   * @name most
	   * @alias lte
	   * @param {Number} value
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertMost (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len <= n
	        , 'expected #{this} to have a length at most #{exp} but got #{act}'
	        , 'expected #{this} to have a length above #{exp}'
	        , n
	        , len
	      );
	    } else {
	      this.assert(
	          obj <= n
	        , 'expected #{this} to be at most ' + n
	        , 'expected #{this} to be above ' + n
	      );
	    }
	  }

	  Assertion.addMethod('most', assertMost);
	  Assertion.addMethod('lte', assertMost);

	  /**
	   * ### .within(start, finish)
	   *
	   * Asserts that the target is within a range.
	   *
	   *     expect(7).to.be.within(5,10);
	   *
	   * Can also be used in conjunction with `length` to
	   * assert a length range. The benefit being a
	   * more informative error message than if the length
	   * was supplied directly.
	   *
	   *     expect('foo').to.have.length.within(2,4);
	   *     expect([ 1, 2, 3 ]).to.have.length.within(2,4);
	   *
	   * @name within
	   * @param {Number} start lowerbound inclusive
	   * @param {Number} finish upperbound inclusive
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addMethod('within', function (start, finish, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object')
	      , range = start + '..' + finish;
	    if (flag(this, 'doLength')) {
	      new Assertion(obj, msg).to.have.property('length');
	      var len = obj.length;
	      this.assert(
	          len >= start && len <= finish
	        , 'expected #{this} to have a length within ' + range
	        , 'expected #{this} to not have a length within ' + range
	      );
	    } else {
	      this.assert(
	          obj >= start && obj <= finish
	        , 'expected #{this} to be within ' + range
	        , 'expected #{this} to not be within ' + range
	      );
	    }
	  });

	  /**
	   * ### .instanceof(constructor)
	   *
	   * Asserts that the target is an instance of `constructor`.
	   *
	   *     var Tea = function (name) { this.name = name; }
	   *       , Chai = new Tea('chai');
	   *
	   *     expect(Chai).to.be.an.instanceof(Tea);
	   *     expect([ 1, 2, 3 ]).to.be.instanceof(Array);
	   *
	   * @name instanceof
	   * @param {Constructor} constructor
	   * @param {String} message _optional_
	   * @alias instanceOf
	   * @namespace BDD
	   * @api public
	   */

	  function assertInstanceOf (constructor, msg) {
	    if (msg) flag(this, 'message', msg);
	    var name = _.getName(constructor);
	    this.assert(
	        flag(this, 'object') instanceof constructor
	      , 'expected #{this} to be an instance of ' + name
	      , 'expected #{this} to not be an instance of ' + name
	    );
	  };

	  Assertion.addMethod('instanceof', assertInstanceOf);
	  Assertion.addMethod('instanceOf', assertInstanceOf);

	  /**
	   * ### .property(name, [value])
	   *
	   * Asserts that the target has a property `name`, optionally asserting that
	   * the value of that property is strictly equal to  `value`.
	   * If the `deep` flag is set, you can use dot- and bracket-notation for deep
	   * references into objects and arrays.
	   *
	   *     // simple referencing
	   *     var obj = { foo: 'bar' };
	   *     expect(obj).to.have.property('foo');
	   *     expect(obj).to.have.property('foo', 'bar');
	   *
	   *     // deep referencing
	   *     var deepObj = {
	   *         green: { tea: 'matcha' }
	   *       , teas: [ 'chai', 'matcha', { tea: 'konacha' } ]
	   *     };
	   *
	   *     expect(deepObj).to.have.deep.property('green.tea', 'matcha');
	   *     expect(deepObj).to.have.deep.property('teas[1]', 'matcha');
	   *     expect(deepObj).to.have.deep.property('teas[2].tea', 'konacha');
	   *
	   * You can also use an array as the starting point of a `deep.property`
	   * assertion, or traverse nested arrays.
	   *
	   *     var arr = [
	   *         [ 'chai', 'matcha', 'konacha' ]
	   *       , [ { tea: 'chai' }
	   *         , { tea: 'matcha' }
	   *         , { tea: 'konacha' } ]
	   *     ];
	   *
	   *     expect(arr).to.have.deep.property('[0][1]', 'matcha');
	   *     expect(arr).to.have.deep.property('[1][2].tea', 'konacha');
	   *
	   * Furthermore, `property` changes the subject of the assertion
	   * to be the value of that property from the original object. This
	   * permits for further chainable assertions on that property.
	   *
	   *     expect(obj).to.have.property('foo')
	   *       .that.is.a('string');
	   *     expect(deepObj).to.have.property('green')
	   *       .that.is.an('object')
	   *       .that.deep.equals({ tea: 'matcha' });
	   *     expect(deepObj).to.have.property('teas')
	   *       .that.is.an('array')
	   *       .with.deep.property('[2]')
	   *         .that.deep.equals({ tea: 'konacha' });
	   *
	   * Note that dots and bracket in `name` must be backslash-escaped when
	   * the `deep` flag is set, while they must NOT be escaped when the `deep`
	   * flag is not set.
	   *
	   *     // simple referencing
	   *     var css = { '.link[target]': 42 };
	   *     expect(css).to.have.property('.link[target]', 42);
	   *
	   *     // deep referencing
	   *     var deepCss = { '.link': { '[target]': 42 }};
	   *     expect(deepCss).to.have.deep.property('\\.link.\\[target\\]', 42);
	   *
	   * @name property
	   * @alias deep.property
	   * @param {String} name
	   * @param {Mixed} value (optional)
	   * @param {String} message _optional_
	   * @returns value of property for chaining
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addMethod('property', function (name, val, msg) {
	    if (msg) flag(this, 'message', msg);

	    var isDeep = !!flag(this, 'deep')
	      , descriptor = isDeep ? 'deep property ' : 'property '
	      , negate = flag(this, 'negate')
	      , obj = flag(this, 'object')
	      , pathInfo = isDeep ? _.getPathInfo(name, obj) : null
	      , hasProperty = isDeep
	        ? pathInfo.exists
	        : _.hasProperty(name, obj)
	      , value = isDeep
	        ? pathInfo.value
	        : obj[name];

	    if (negate && arguments.length > 1) {
	      if (undefined === value) {
	        msg = (msg != null) ? msg + ': ' : '';
	        throw new Error(msg + _.inspect(obj) + ' has no ' + descriptor + _.inspect(name));
	      }
	    } else {
	      this.assert(
	          hasProperty
	        , 'expected #{this} to have a ' + descriptor + _.inspect(name)
	        , 'expected #{this} to not have ' + descriptor + _.inspect(name));
	    }

	    if (arguments.length > 1) {
	      this.assert(
	          val === value
	        , 'expected #{this} to have a ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}'
	        , 'expected #{this} to not have a ' + descriptor + _.inspect(name) + ' of #{act}'
	        , val
	        , value
	      );
	    }

	    flag(this, 'object', value);
	  });


	  /**
	   * ### .ownProperty(name)
	   *
	   * Asserts that the target has an own property `name`.
	   *
	   *     expect('test').to.have.ownProperty('length');
	   *
	   * @name ownProperty
	   * @alias haveOwnProperty
	   * @param {String} name
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertOwnProperty (name, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    this.assert(
	        obj.hasOwnProperty(name)
	      , 'expected #{this} to have own property ' + _.inspect(name)
	      , 'expected #{this} to not have own property ' + _.inspect(name)
	    );
	  }

	  Assertion.addMethod('ownProperty', assertOwnProperty);
	  Assertion.addMethod('haveOwnProperty', assertOwnProperty);

	  /**
	   * ### .ownPropertyDescriptor(name[, descriptor[, message]])
	   *
	   * Asserts that the target has an own property descriptor `name`, that optionally matches `descriptor`.
	   *
	   *     expect('test').to.have.ownPropertyDescriptor('length');
	   *     expect('test').to.have.ownPropertyDescriptor('length', { enumerable: false, configurable: false, writable: false, value: 4 });
	   *     expect('test').not.to.have.ownPropertyDescriptor('length', { enumerable: false, configurable: false, writable: false, value: 3 });
	   *     expect('test').ownPropertyDescriptor('length').to.have.property('enumerable', false);
	   *     expect('test').ownPropertyDescriptor('length').to.have.keys('value');
	   *
	   * @name ownPropertyDescriptor
	   * @alias haveOwnPropertyDescriptor
	   * @param {String} name
	   * @param {Object} descriptor _optional_
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertOwnPropertyDescriptor (name, descriptor, msg) {
	    if (typeof descriptor === 'string') {
	      msg = descriptor;
	      descriptor = null;
	    }
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
	    if (actualDescriptor && descriptor) {
	      this.assert(
	          _.eql(descriptor, actualDescriptor)
	        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to match ' + _.inspect(descriptor) + ', got ' + _.inspect(actualDescriptor)
	        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to not match ' + _.inspect(descriptor)
	        , descriptor
	        , actualDescriptor
	        , true
	      );
	    } else {
	      this.assert(
	          actualDescriptor
	        , 'expected #{this} to have an own property descriptor for ' + _.inspect(name)
	        , 'expected #{this} to not have an own property descriptor for ' + _.inspect(name)
	      );
	    }
	    flag(this, 'object', actualDescriptor);
	  }

	  Assertion.addMethod('ownPropertyDescriptor', assertOwnPropertyDescriptor);
	  Assertion.addMethod('haveOwnPropertyDescriptor', assertOwnPropertyDescriptor);

	  /**
	   * ### .length
	   *
	   * Sets the `doLength` flag later used as a chain precursor to a value
	   * comparison for the `length` property.
	   *
	   *     expect('foo').to.have.length.above(2);
	   *     expect([ 1, 2, 3 ]).to.have.length.above(2);
	   *     expect('foo').to.have.length.below(4);
	   *     expect([ 1, 2, 3 ]).to.have.length.below(4);
	   *     expect('foo').to.have.length.within(2,4);
	   *     expect([ 1, 2, 3 ]).to.have.length.within(2,4);
	   *
	   * *Deprecation notice:* Using `length` as an assertion will be deprecated
	   * in version 2.4.0 and removed in 3.0.0. Code using the old style of
	   * asserting for `length` property value using `length(value)` should be
	   * switched to use `lengthOf(value)` instead.
	   *
	   * @name length
	   * @namespace BDD
	   * @api public
	   */

	  /**
	   * ### .lengthOf(value[, message])
	   *
	   * Asserts that the target's `length` property has
	   * the expected value.
	   *
	   *     expect([ 1, 2, 3]).to.have.lengthOf(3);
	   *     expect('foobar').to.have.lengthOf(6);
	   *
	   * @name lengthOf
	   * @param {Number} length
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertLengthChain () {
	    flag(this, 'doLength', true);
	  }

	  function assertLength (n, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    new Assertion(obj, msg).to.have.property('length');
	    var len = obj.length;

	    this.assert(
	        len == n
	      , 'expected #{this} to have a length of #{exp} but got #{act}'
	      , 'expected #{this} to not have a length of #{act}'
	      , n
	      , len
	    );
	  }

	  Assertion.addChainableMethod('length', assertLength, assertLengthChain);
	  Assertion.addMethod('lengthOf', assertLength);

	  /**
	   * ### .match(regexp)
	   *
	   * Asserts that the target matches a regular expression.
	   *
	   *     expect('foobar').to.match(/^foo/);
	   *
	   * @name match
	   * @alias matches
	   * @param {RegExp} RegularExpression
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */
	  function assertMatch(re, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    this.assert(
	        re.exec(obj)
	      , 'expected #{this} to match ' + re
	      , 'expected #{this} not to match ' + re
	    );
	  }

	  Assertion.addMethod('match', assertMatch);
	  Assertion.addMethod('matches', assertMatch);

	  /**
	   * ### .string(string)
	   *
	   * Asserts that the string target contains another string.
	   *
	   *     expect('foobar').to.have.string('bar');
	   *
	   * @name string
	   * @param {String} string
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addMethod('string', function (str, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    new Assertion(obj, msg).is.a('string');

	    this.assert(
	        ~obj.indexOf(str)
	      , 'expected #{this} to contain ' + _.inspect(str)
	      , 'expected #{this} to not contain ' + _.inspect(str)
	    );
	  });


	  /**
	   * ### .keys(key1, [key2], [...])
	   *
	   * Asserts that the target contains any or all of the passed-in keys.
	   * Use in combination with `any`, `all`, `contains`, or `have` will affect
	   * what will pass.
	   *
	   * When used in conjunction with `any`, at least one key that is passed
	   * in must exist in the target object. This is regardless whether or not
	   * the `have` or `contain` qualifiers are used. Note, either `any` or `all`
	   * should be used in the assertion. If neither are used, the assertion is
	   * defaulted to `all`.
	   *
	   * When both `all` and `contain` are used, the target object must have at
	   * least all of the passed-in keys but may have more keys not listed.
	   *
	   * When both `all` and `have` are used, the target object must both contain
	   * all of the passed-in keys AND the number of keys in the target object must
	   * match the number of keys passed in (in other words, a target object must
	   * have all and only all of the passed-in keys).
	   *
	   *     expect({ foo: 1, bar: 2 }).to.have.any.keys('foo', 'baz');
	   *     expect({ foo: 1, bar: 2 }).to.have.any.keys('foo');
	   *     expect({ foo: 1, bar: 2 }).to.contain.any.keys('bar', 'baz');
	   *     expect({ foo: 1, bar: 2 }).to.contain.any.keys(['foo']);
	   *     expect({ foo: 1, bar: 2 }).to.contain.any.keys({'foo': 6});
	   *     expect({ foo: 1, bar: 2 }).to.have.all.keys(['bar', 'foo']);
	   *     expect({ foo: 1, bar: 2 }).to.have.all.keys({'bar': 6, 'foo': 7});
	   *     expect({ foo: 1, bar: 2, baz: 3 }).to.contain.all.keys(['bar', 'foo']);
	   *     expect({ foo: 1, bar: 2, baz: 3 }).to.contain.all.keys({'bar': 6});
	   *
	   *
	   * @name keys
	   * @alias key
	   * @param {...String|Array|Object} keys
	   * @namespace BDD
	   * @api public
	   */

	  function assertKeys (keys) {
	    var obj = flag(this, 'object')
	      , str
	      , ok = true
	      , mixedArgsMsg = 'keys must be given single argument of Array|Object|String, or multiple String arguments';

	    switch (_.type(keys)) {
	      case "array":
	        if (arguments.length > 1) throw (new Error(mixedArgsMsg));
	        break;
	      case "object":
	        if (arguments.length > 1) throw (new Error(mixedArgsMsg));
	        keys = Object.keys(keys);
	        break;
	      default:
	        keys = Array.prototype.slice.call(arguments);
	    }

	    if (!keys.length) throw new Error('keys required');

	    var actual = Object.keys(obj)
	      , expected = keys
	      , len = keys.length
	      , any = flag(this, 'any')
	      , all = flag(this, 'all');

	    if (!any && !all) {
	      all = true;
	    }

	    // Has any
	    if (any) {
	      var intersection = expected.filter(function(key) {
	        return ~actual.indexOf(key);
	      });
	      ok = intersection.length > 0;
	    }

	    // Has all
	    if (all) {
	      ok = keys.every(function(key){
	        return ~actual.indexOf(key);
	      });
	      if (!flag(this, 'negate') && !flag(this, 'contains')) {
	        ok = ok && keys.length == actual.length;
	      }
	    }

	    // Key string
	    if (len > 1) {
	      keys = keys.map(function(key){
	        return _.inspect(key);
	      });
	      var last = keys.pop();
	      if (all) {
	        str = keys.join(', ') + ', and ' + last;
	      }
	      if (any) {
	        str = keys.join(', ') + ', or ' + last;
	      }
	    } else {
	      str = _.inspect(keys[0]);
	    }

	    // Form
	    str = (len > 1 ? 'keys ' : 'key ') + str;

	    // Have / include
	    str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;

	    // Assertion
	    this.assert(
	        ok
	      , 'expected #{this} to ' + str
	      , 'expected #{this} to not ' + str
	      , expected.slice(0).sort()
	      , actual.sort()
	      , true
	    );
	  }

	  Assertion.addMethod('keys', assertKeys);
	  Assertion.addMethod('key', assertKeys);

	  /**
	   * ### .throw(constructor)
	   *
	   * Asserts that the function target will throw a specific error, or specific type of error
	   * (as determined using `instanceof`), optionally with a RegExp or string inclusion test
	   * for the error's message.
	   *
	   *     var err = new ReferenceError('This is a bad function.');
	   *     var fn = function () { throw err; }
	   *     expect(fn).to.throw(ReferenceError);
	   *     expect(fn).to.throw(Error);
	   *     expect(fn).to.throw(/bad function/);
	   *     expect(fn).to.not.throw('good function');
	   *     expect(fn).to.throw(ReferenceError, /bad function/);
	   *     expect(fn).to.throw(err);
	   *
	   * Please note that when a throw expectation is negated, it will check each
	   * parameter independently, starting with error constructor type. The appropriate way
	   * to check for the existence of a type of error but for a message that does not match
	   * is to use `and`.
	   *
	   *     expect(fn).to.throw(ReferenceError)
	   *        .and.not.throw(/good function/);
	   *
	   * @name throw
	   * @alias throws
	   * @alias Throw
	   * @param {ErrorConstructor} constructor
	   * @param {String|RegExp} expected error message
	   * @param {String} message _optional_
	   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	   * @returns error for chaining (null if no error)
	   * @namespace BDD
	   * @api public
	   */

	  function assertThrows (constructor, errMsg, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    new Assertion(obj, msg).is.a('function');

	    var thrown = false
	      , desiredError = null
	      , name = null
	      , thrownError = null;

	    if (arguments.length === 0) {
	      errMsg = null;
	      constructor = null;
	    } else if (constructor && (constructor instanceof RegExp || 'string' === typeof constructor)) {
	      errMsg = constructor;
	      constructor = null;
	    } else if (constructor && constructor instanceof Error) {
	      desiredError = constructor;
	      constructor = null;
	      errMsg = null;
	    } else if (typeof constructor === 'function') {
	      name = constructor.prototype.name;
	      if (!name || (name === 'Error' && constructor !== Error)) {
	        name = constructor.name || (new constructor()).name;
	      }
	    } else {
	      constructor = null;
	    }

	    try {
	      obj();
	    } catch (err) {
	      // first, check desired error
	      if (desiredError) {
	        this.assert(
	            err === desiredError
	          , 'expected #{this} to throw #{exp} but #{act} was thrown'
	          , 'expected #{this} to not throw #{exp}'
	          , (desiredError instanceof Error ? desiredError.toString() : desiredError)
	          , (err instanceof Error ? err.toString() : err)
	        );

	        flag(this, 'object', err);
	        return this;
	      }

	      // next, check constructor
	      if (constructor) {
	        this.assert(
	            err instanceof constructor
	          , 'expected #{this} to throw #{exp} but #{act} was thrown'
	          , 'expected #{this} to not throw #{exp} but #{act} was thrown'
	          , name
	          , (err instanceof Error ? err.toString() : err)
	        );

	        if (!errMsg) {
	          flag(this, 'object', err);
	          return this;
	        }
	      }

	      // next, check message
	      var message = 'error' === _.type(err) && "message" in err
	        ? err.message
	        : '' + err;

	      if ((message != null) && errMsg && errMsg instanceof RegExp) {
	        this.assert(
	            errMsg.exec(message)
	          , 'expected #{this} to throw error matching #{exp} but got #{act}'
	          , 'expected #{this} to throw error not matching #{exp}'
	          , errMsg
	          , message
	        );

	        flag(this, 'object', err);
	        return this;
	      } else if ((message != null) && errMsg && 'string' === typeof errMsg) {
	        this.assert(
	            ~message.indexOf(errMsg)
	          , 'expected #{this} to throw error including #{exp} but got #{act}'
	          , 'expected #{this} to throw error not including #{act}'
	          , errMsg
	          , message
	        );

	        flag(this, 'object', err);
	        return this;
	      } else {
	        thrown = true;
	        thrownError = err;
	      }
	    }

	    var actuallyGot = ''
	      , expectedThrown = name !== null
	        ? name
	        : desiredError
	          ? '#{exp}' //_.inspect(desiredError)
	          : 'an error';

	    if (thrown) {
	      actuallyGot = ' but #{act} was thrown'
	    }

	    this.assert(
	        thrown === true
	      , 'expected #{this} to throw ' + expectedThrown + actuallyGot
	      , 'expected #{this} to not throw ' + expectedThrown + actuallyGot
	      , (desiredError instanceof Error ? desiredError.toString() : desiredError)
	      , (thrownError instanceof Error ? thrownError.toString() : thrownError)
	    );

	    flag(this, 'object', thrownError);
	  };

	  Assertion.addMethod('throw', assertThrows);
	  Assertion.addMethod('throws', assertThrows);
	  Assertion.addMethod('Throw', assertThrows);

	  /**
	   * ### .respondTo(method)
	   *
	   * Asserts that the object or class target will respond to a method.
	   *
	   *     Klass.prototype.bar = function(){};
	   *     expect(Klass).to.respondTo('bar');
	   *     expect(obj).to.respondTo('bar');
	   *
	   * To check if a constructor will respond to a static function,
	   * set the `itself` flag.
	   *
	   *     Klass.baz = function(){};
	   *     expect(Klass).itself.to.respondTo('baz');
	   *
	   * @name respondTo
	   * @alias respondsTo
	   * @param {String} method
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function respondTo (method, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object')
	      , itself = flag(this, 'itself')
	      , context = ('function' === _.type(obj) && !itself)
	        ? obj.prototype[method]
	        : obj[method];

	    this.assert(
	        'function' === typeof context
	      , 'expected #{this} to respond to ' + _.inspect(method)
	      , 'expected #{this} to not respond to ' + _.inspect(method)
	    );
	  }

	  Assertion.addMethod('respondTo', respondTo);
	  Assertion.addMethod('respondsTo', respondTo);

	  /**
	   * ### .itself
	   *
	   * Sets the `itself` flag, later used by the `respondTo` assertion.
	   *
	   *     function Foo() {}
	   *     Foo.bar = function() {}
	   *     Foo.prototype.baz = function() {}
	   *
	   *     expect(Foo).itself.to.respondTo('bar');
	   *     expect(Foo).itself.not.to.respondTo('baz');
	   *
	   * @name itself
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('itself', function () {
	    flag(this, 'itself', true);
	  });

	  /**
	   * ### .satisfy(method)
	   *
	   * Asserts that the target passes a given truth test.
	   *
	   *     expect(1).to.satisfy(function(num) { return num > 0; });
	   *
	   * @name satisfy
	   * @alias satisfies
	   * @param {Function} matcher
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function satisfy (matcher, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');
	    var result = matcher(obj);
	    this.assert(
	        result
	      , 'expected #{this} to satisfy ' + _.objDisplay(matcher)
	      , 'expected #{this} to not satisfy' + _.objDisplay(matcher)
	      , this.negate ? false : true
	      , result
	    );
	  }

	  Assertion.addMethod('satisfy', satisfy);
	  Assertion.addMethod('satisfies', satisfy);

	  /**
	   * ### .closeTo(expected, delta)
	   *
	   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
	   *
	   *     expect(1.5).to.be.closeTo(1, 0.5);
	   *
	   * @name closeTo
	   * @alias approximately
	   * @param {Number} expected
	   * @param {Number} delta
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function closeTo(expected, delta, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');

	    new Assertion(obj, msg).is.a('number');
	    if (_.type(expected) !== 'number' || _.type(delta) !== 'number') {
	      throw new Error('the arguments to closeTo or approximately must be numbers');
	    }

	    this.assert(
	        Math.abs(obj - expected) <= delta
	      , 'expected #{this} to be close to ' + expected + ' +/- ' + delta
	      , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta
	    );
	  }

	  Assertion.addMethod('closeTo', closeTo);
	  Assertion.addMethod('approximately', closeTo);

	  function isSubsetOf(subset, superset, cmp) {
	    return subset.every(function(elem) {
	      if (!cmp) return superset.indexOf(elem) !== -1;

	      return superset.some(function(elem2) {
	        return cmp(elem, elem2);
	      });
	    })
	  }

	  /**
	   * ### .members(set)
	   *
	   * Asserts that the target is a superset of `set`,
	   * or that the target and `set` have the same strictly-equal (===) members.
	   * Alternately, if the `deep` flag is set, set members are compared for deep
	   * equality.
	   *
	   *     expect([1, 2, 3]).to.include.members([3, 2]);
	   *     expect([1, 2, 3]).to.not.include.members([3, 2, 8]);
	   *
	   *     expect([4, 2]).to.have.members([2, 4]);
	   *     expect([5, 2]).to.not.have.members([5, 2, 1]);
	   *
	   *     expect([{ id: 1 }]).to.deep.include.members([{ id: 1 }]);
	   *
	   * @name members
	   * @param {Array} set
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addMethod('members', function (subset, msg) {
	    if (msg) flag(this, 'message', msg);
	    var obj = flag(this, 'object');

	    new Assertion(obj).to.be.an('array');
	    new Assertion(subset).to.be.an('array');

	    var cmp = flag(this, 'deep') ? _.eql : undefined;

	    if (flag(this, 'contains')) {
	      return this.assert(
	          isSubsetOf(subset, obj, cmp)
	        , 'expected #{this} to be a superset of #{act}'
	        , 'expected #{this} to not be a superset of #{act}'
	        , obj
	        , subset
	      );
	    }

	    this.assert(
	        isSubsetOf(obj, subset, cmp) && isSubsetOf(subset, obj, cmp)
	        , 'expected #{this} to have the same members as #{act}'
	        , 'expected #{this} to not have the same members as #{act}'
	        , obj
	        , subset
	    );
	  });

	  /**
	   * ### .oneOf(list)
	   *
	   * Assert that a value appears somewhere in the top level of array `list`.
	   *
	   *     expect('a').to.be.oneOf(['a', 'b', 'c']);
	   *     expect(9).to.not.be.oneOf(['z']);
	   *     expect([3]).to.not.be.oneOf([1, 2, [3]]);
	   *
	   *     var three = [3];
	   *     // for object-types, contents are not compared
	   *     expect(three).to.not.be.oneOf([1, 2, [3]]);
	   *     // comparing references works
	   *     expect(three).to.be.oneOf([1, 2, three]);
	   *
	   * @name oneOf
	   * @param {Array<*>} list
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function oneOf (list, msg) {
	    if (msg) flag(this, 'message', msg);
	    var expected = flag(this, 'object');
	    new Assertion(list).to.be.an('array');

	    this.assert(
	        list.indexOf(expected) > -1
	      , 'expected #{this} to be one of #{exp}'
	      , 'expected #{this} to not be one of #{exp}'
	      , list
	      , expected
	    );
	  }

	  Assertion.addMethod('oneOf', oneOf);


	  /**
	   * ### .change(function)
	   *
	   * Asserts that a function changes an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val += 3 };
	   *     var noChangeFn = function() { return 'foo' + 'bar'; }
	   *     expect(fn).to.change(obj, 'val');
	   *     expect(noChangeFn).to.not.change(obj, 'val')
	   *
	   * @name change
	   * @alias changes
	   * @alias Change
	   * @param {String} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertChanges (object, prop, msg) {
	    if (msg) flag(this, 'message', msg);
	    var fn = flag(this, 'object');
	    new Assertion(object, msg).to.have.property(prop);
	    new Assertion(fn).is.a('function');

	    var initial = object[prop];
	    fn();

	    this.assert(
	      initial !== object[prop]
	      , 'expected .' + prop + ' to change'
	      , 'expected .' + prop + ' to not change'
	    );
	  }

	  Assertion.addChainableMethod('change', assertChanges);
	  Assertion.addChainableMethod('changes', assertChanges);

	  /**
	   * ### .increase(function)
	   *
	   * Asserts that a function increases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 15 };
	   *     expect(fn).to.increase(obj, 'val');
	   *
	   * @name increase
	   * @alias increases
	   * @alias Increase
	   * @param {String} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertIncreases (object, prop, msg) {
	    if (msg) flag(this, 'message', msg);
	    var fn = flag(this, 'object');
	    new Assertion(object, msg).to.have.property(prop);
	    new Assertion(fn).is.a('function');

	    var initial = object[prop];
	    fn();

	    this.assert(
	      object[prop] - initial > 0
	      , 'expected .' + prop + ' to increase'
	      , 'expected .' + prop + ' to not increase'
	    );
	  }

	  Assertion.addChainableMethod('increase', assertIncreases);
	  Assertion.addChainableMethod('increases', assertIncreases);

	  /**
	   * ### .decrease(function)
	   *
	   * Asserts that a function decreases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 5 };
	   *     expect(fn).to.decrease(obj, 'val');
	   *
	   * @name decrease
	   * @alias decreases
	   * @alias Decrease
	   * @param {String} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace BDD
	   * @api public
	   */

	  function assertDecreases (object, prop, msg) {
	    if (msg) flag(this, 'message', msg);
	    var fn = flag(this, 'object');
	    new Assertion(object, msg).to.have.property(prop);
	    new Assertion(fn).is.a('function');

	    var initial = object[prop];
	    fn();

	    this.assert(
	      object[prop] - initial < 0
	      , 'expected .' + prop + ' to decrease'
	      , 'expected .' + prop + ' to not decrease'
	    );
	  }

	  Assertion.addChainableMethod('decrease', assertDecreases);
	  Assertion.addChainableMethod('decreases', assertDecreases);

	  /**
	   * ### .extensible
	   *
	   * Asserts that the target is extensible (can have new properties added to
	   * it).
	   *
	   *     var nonExtensibleObject = Object.preventExtensions({});
	   *     var sealedObject = Object.seal({});
	   *     var frozenObject = Object.freeze({});
	   *
	   *     expect({}).to.be.extensible;
	   *     expect(nonExtensibleObject).to.not.be.extensible;
	   *     expect(sealedObject).to.not.be.extensible;
	   *     expect(frozenObject).to.not.be.extensible;
	   *
	   * @name extensible
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('extensible', function() {
	    var obj = flag(this, 'object');

	    // In ES5, if the argument to this method is not an object (a primitive), then it will cause a TypeError.
	    // In ES6, a non-object argument will be treated as if it was a non-extensible ordinary object, simply return false.
	    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible
	    // The following provides ES6 behavior when a TypeError is thrown under ES5.

	    var isExtensible;

	    try {
	      isExtensible = Object.isExtensible(obj);
	    } catch (err) {
	      if (err instanceof TypeError) isExtensible = false;
	      else throw err;
	    }

	    this.assert(
	      isExtensible
	      , 'expected #{this} to be extensible'
	      , 'expected #{this} to not be extensible'
	    );
	  });

	  /**
	   * ### .sealed
	   *
	   * Asserts that the target is sealed (cannot have new properties added to it
	   * and its existing properties cannot be removed).
	   *
	   *     var sealedObject = Object.seal({});
	   *     var frozenObject = Object.freeze({});
	   *
	   *     expect(sealedObject).to.be.sealed;
	   *     expect(frozenObject).to.be.sealed;
	   *     expect({}).to.not.be.sealed;
	   *
	   * @name sealed
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('sealed', function() {
	    var obj = flag(this, 'object');

	    // In ES5, if the argument to this method is not an object (a primitive), then it will cause a TypeError.
	    // In ES6, a non-object argument will be treated as if it was a sealed ordinary object, simply return true.
	    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed
	    // The following provides ES6 behavior when a TypeError is thrown under ES5.

	    var isSealed;

	    try {
	      isSealed = Object.isSealed(obj);
	    } catch (err) {
	      if (err instanceof TypeError) isSealed = true;
	      else throw err;
	    }

	    this.assert(
	      isSealed
	      , 'expected #{this} to be sealed'
	      , 'expected #{this} to not be sealed'
	    );
	  });

	  /**
	   * ### .frozen
	   *
	   * Asserts that the target is frozen (cannot have new properties added to it
	   * and its existing properties cannot be modified).
	   *
	   *     var frozenObject = Object.freeze({});
	   *
	   *     expect(frozenObject).to.be.frozen;
	   *     expect({}).to.not.be.frozen;
	   *
	   * @name frozen
	   * @namespace BDD
	   * @api public
	   */

	  Assertion.addProperty('frozen', function() {
	    var obj = flag(this, 'object');

	    // In ES5, if the argument to this method is not an object (a primitive), then it will cause a TypeError.
	    // In ES6, a non-object argument will be treated as if it was a frozen ordinary object, simply return true.
	    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
	    // The following provides ES6 behavior when a TypeError is thrown under ES5.

	    var isFrozen;

	    try {
	      isFrozen = Object.isFrozen(obj);
	    } catch (err) {
	      if (err instanceof TypeError) isFrozen = true;
	      else throw err;
	    }

	    this.assert(
	      isFrozen
	      , 'expected #{this} to be frozen'
	      , 'expected #{this} to not be frozen'
	    );
	  });
	};


/***/ },
/* 37 */
/***/ function(module, exports) {

	/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	module.exports = function (chai, util) {
	  chai.expect = function (val, message) {
	    return new chai.Assertion(val, message);
	  };

	  /**
	   * ### .fail(actual, expected, [message], [operator])
	   *
	   * Throw a failure.
	   *
	   * @name fail
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @param {String} operator
	   * @namespace Expect
	   * @api public
	   */

	  chai.expect.fail = function (actual, expected, message, operator) {
	    message = message || 'expect.fail()';
	    throw new chai.AssertionError(message, {
	        actual: actual
	      , expected: expected
	      , operator: operator
	    }, chai.expect.fail);
	  };
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */

	module.exports = function (chai, util) {
	  var Assertion = chai.Assertion;

	  function loadShould () {
	    // explicitly define this method as function as to have it's name to include as `ssfi`
	    function shouldGetter() {
	      if (this instanceof String || this instanceof Number || this instanceof Boolean ) {
	        return new Assertion(this.valueOf(), null, shouldGetter);
	      }
	      return new Assertion(this, null, shouldGetter);
	    }
	    function shouldSetter(value) {
	      // See https://github.com/chaijs/chai/issues/86: this makes
	      // `whatever.should = someValue` actually set `someValue`, which is
	      // especially useful for `global.should = require('chai').should()`.
	      //
	      // Note that we have to use [[DefineProperty]] instead of [[Put]]
	      // since otherwise we would trigger this very setter!
	      Object.defineProperty(this, 'should', {
	        value: value,
	        enumerable: true,
	        configurable: true,
	        writable: true
	      });
	    }
	    // modify Object.prototype to have `should`
	    Object.defineProperty(Object.prototype, 'should', {
	      set: shouldSetter
	      , get: shouldGetter
	      , configurable: true
	    });

	    var should = {};

	    /**
	     * ### .fail(actual, expected, [message], [operator])
	     *
	     * Throw a failure.
	     *
	     * @name fail
	     * @param {Mixed} actual
	     * @param {Mixed} expected
	     * @param {String} message
	     * @param {String} operator
	     * @namespace Should
	     * @api public
	     */

	    should.fail = function (actual, expected, message, operator) {
	      message = message || 'should.fail()';
	      throw new chai.AssertionError(message, {
	          actual: actual
	        , expected: expected
	        , operator: operator
	      }, should.fail);
	    };

	    /**
	     * ### .equal(actual, expected, [message])
	     *
	     * Asserts non-strict equality (`==`) of `actual` and `expected`.
	     *
	     *     should.equal(3, '3', '== coerces values to strings');
	     *
	     * @name equal
	     * @param {Mixed} actual
	     * @param {Mixed} expected
	     * @param {String} message
	     * @namespace Should
	     * @api public
	     */

	    should.equal = function (val1, val2, msg) {
	      new Assertion(val1, msg).to.equal(val2);
	    };

	    /**
	     * ### .throw(function, [constructor/string/regexp], [string/regexp], [message])
	     *
	     * Asserts that `function` will throw an error that is an instance of
	     * `constructor`, or alternately that it will throw an error with message
	     * matching `regexp`.
	     *
	     *     should.throw(fn, 'function throws a reference error');
	     *     should.throw(fn, /function throws a reference error/);
	     *     should.throw(fn, ReferenceError);
	     *     should.throw(fn, ReferenceError, 'function throws a reference error');
	     *     should.throw(fn, ReferenceError, /function throws a reference error/);
	     *
	     * @name throw
	     * @alias Throw
	     * @param {Function} function
	     * @param {ErrorConstructor} constructor
	     * @param {RegExp} regexp
	     * @param {String} message
	     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	     * @namespace Should
	     * @api public
	     */

	    should.Throw = function (fn, errt, errs, msg) {
	      new Assertion(fn, msg).to.Throw(errt, errs);
	    };

	    /**
	     * ### .exist
	     *
	     * Asserts that the target is neither `null` nor `undefined`.
	     *
	     *     var foo = 'hi';
	     *
	     *     should.exist(foo, 'foo exists');
	     *
	     * @name exist
	     * @namespace Should
	     * @api public
	     */

	    should.exist = function (val, msg) {
	      new Assertion(val, msg).to.exist;
	    }

	    // negation
	    should.not = {}

	    /**
	     * ### .not.equal(actual, expected, [message])
	     *
	     * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
	     *
	     *     should.not.equal(3, 4, 'these numbers are not equal');
	     *
	     * @name not.equal
	     * @param {Mixed} actual
	     * @param {Mixed} expected
	     * @param {String} message
	     * @namespace Should
	     * @api public
	     */

	    should.not.equal = function (val1, val2, msg) {
	      new Assertion(val1, msg).to.not.equal(val2);
	    };

	    /**
	     * ### .throw(function, [constructor/regexp], [message])
	     *
	     * Asserts that `function` will _not_ throw an error that is an instance of
	     * `constructor`, or alternately that it will not throw an error with message
	     * matching `regexp`.
	     *
	     *     should.not.throw(fn, Error, 'function does not throw');
	     *
	     * @name not.throw
	     * @alias not.Throw
	     * @param {Function} function
	     * @param {ErrorConstructor} constructor
	     * @param {RegExp} regexp
	     * @param {String} message
	     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	     * @namespace Should
	     * @api public
	     */

	    should.not.Throw = function (fn, errt, errs, msg) {
	      new Assertion(fn, msg).to.not.Throw(errt, errs);
	    };

	    /**
	     * ### .not.exist
	     *
	     * Asserts that the target is neither `null` nor `undefined`.
	     *
	     *     var bar = null;
	     *
	     *     should.not.exist(bar, 'bar does not exist');
	     *
	     * @name not.exist
	     * @namespace Should
	     * @api public
	     */

	    should.not.exist = function (val, msg) {
	      new Assertion(val, msg).to.not.exist;
	    }

	    should['throw'] = should['Throw'];
	    should.not['throw'] = should.not['Throw'];

	    return should;
	  };

	  chai.should = loadShould;
	  chai.Should = loadShould;
	};


/***/ },
/* 39 */
/***/ function(module, exports) {

	/*!
	 * chai
	 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
	 * MIT Licensed
	 */


	module.exports = function (chai, util) {

	  /*!
	   * Chai dependencies.
	   */

	  var Assertion = chai.Assertion
	    , flag = util.flag;

	  /*!
	   * Module export.
	   */

	  /**
	   * ### assert(expression, message)
	   *
	   * Write your own test expressions.
	   *
	   *     assert('foo' !== 'bar', 'foo is not bar');
	   *     assert(Array.isArray([]), 'empty arrays are arrays');
	   *
	   * @param {Mixed} expression to test for truthiness
	   * @param {String} message to display on error
	   * @name assert
	   * @namespace Assert
	   * @api public
	   */

	  var assert = chai.assert = function (express, errmsg) {
	    var test = new Assertion(null, null, chai.assert);
	    test.assert(
	        express
	      , errmsg
	      , '[ negation message unavailable ]'
	    );
	  };

	  /**
	   * ### .fail(actual, expected, [message], [operator])
	   *
	   * Throw a failure. Node.js `assert` module-compatible.
	   *
	   * @name fail
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @param {String} operator
	   * @namespace Assert
	   * @api public
	   */

	  assert.fail = function (actual, expected, message, operator) {
	    message = message || 'assert.fail()';
	    throw new chai.AssertionError(message, {
	        actual: actual
	      , expected: expected
	      , operator: operator
	    }, assert.fail);
	  };

	  /**
	   * ### .isOk(object, [message])
	   *
	   * Asserts that `object` is truthy.
	   *
	   *     assert.isOk('everything', 'everything is ok');
	   *     assert.isOk(false, 'this will fail');
	   *
	   * @name isOk
	   * @alias ok
	   * @param {Mixed} object to test
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isOk = function (val, msg) {
	    new Assertion(val, msg).is.ok;
	  };

	  /**
	   * ### .isNotOk(object, [message])
	   *
	   * Asserts that `object` is falsy.
	   *
	   *     assert.isNotOk('everything', 'this will fail');
	   *     assert.isNotOk(false, 'this will pass');
	   *
	   * @name isNotOk
	   * @alias notOk
	   * @param {Mixed} object to test
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotOk = function (val, msg) {
	    new Assertion(val, msg).is.not.ok;
	  };

	  /**
	   * ### .equal(actual, expected, [message])
	   *
	   * Asserts non-strict equality (`==`) of `actual` and `expected`.
	   *
	   *     assert.equal(3, '3', '== coerces values to strings');
	   *
	   * @name equal
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.equal = function (act, exp, msg) {
	    var test = new Assertion(act, msg, assert.equal);

	    test.assert(
	        exp == flag(test, 'object')
	      , 'expected #{this} to equal #{exp}'
	      , 'expected #{this} to not equal #{act}'
	      , exp
	      , act
	    );
	  };

	  /**
	   * ### .notEqual(actual, expected, [message])
	   *
	   * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
	   *
	   *     assert.notEqual(3, 4, 'these numbers are not equal');
	   *
	   * @name notEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notEqual = function (act, exp, msg) {
	    var test = new Assertion(act, msg, assert.notEqual);

	    test.assert(
	        exp != flag(test, 'object')
	      , 'expected #{this} to not equal #{exp}'
	      , 'expected #{this} to equal #{act}'
	      , exp
	      , act
	    );
	  };

	  /**
	   * ### .strictEqual(actual, expected, [message])
	   *
	   * Asserts strict equality (`===`) of `actual` and `expected`.
	   *
	   *     assert.strictEqual(true, true, 'these booleans are strictly equal');
	   *
	   * @name strictEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.strictEqual = function (act, exp, msg) {
	    new Assertion(act, msg).to.equal(exp);
	  };

	  /**
	   * ### .notStrictEqual(actual, expected, [message])
	   *
	   * Asserts strict inequality (`!==`) of `actual` and `expected`.
	   *
	   *     assert.notStrictEqual(3, '3', 'no coercion for strict equality');
	   *
	   * @name notStrictEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notStrictEqual = function (act, exp, msg) {
	    new Assertion(act, msg).to.not.equal(exp);
	  };

	  /**
	   * ### .deepEqual(actual, expected, [message])
	   *
	   * Asserts that `actual` is deeply equal to `expected`.
	   *
	   *     assert.deepEqual({ tea: 'green' }, { tea: 'green' });
	   *
	   * @name deepEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.deepEqual = function (act, exp, msg) {
	    new Assertion(act, msg).to.eql(exp);
	  };

	  /**
	   * ### .notDeepEqual(actual, expected, [message])
	   *
	   * Assert that `actual` is not deeply equal to `expected`.
	   *
	   *     assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
	   *
	   * @name notDeepEqual
	   * @param {Mixed} actual
	   * @param {Mixed} expected
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notDeepEqual = function (act, exp, msg) {
	    new Assertion(act, msg).to.not.eql(exp);
	  };

	   /**
	   * ### .isAbove(valueToCheck, valueToBeAbove, [message])
	   *
	   * Asserts `valueToCheck` is strictly greater than (>) `valueToBeAbove`
	   *
	   *     assert.isAbove(5, 2, '5 is strictly greater than 2');
	   *
	   * @name isAbove
	   * @param {Mixed} valueToCheck
	   * @param {Mixed} valueToBeAbove
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isAbove = function (val, abv, msg) {
	    new Assertion(val, msg).to.be.above(abv);
	  };

	   /**
	   * ### .isAtLeast(valueToCheck, valueToBeAtLeast, [message])
	   *
	   * Asserts `valueToCheck` is greater than or equal to (>=) `valueToBeAtLeast`
	   *
	   *     assert.isAtLeast(5, 2, '5 is greater or equal to 2');
	   *     assert.isAtLeast(3, 3, '3 is greater or equal to 3');
	   *
	   * @name isAtLeast
	   * @param {Mixed} valueToCheck
	   * @param {Mixed} valueToBeAtLeast
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isAtLeast = function (val, atlst, msg) {
	    new Assertion(val, msg).to.be.least(atlst);
	  };

	   /**
	   * ### .isBelow(valueToCheck, valueToBeBelow, [message])
	   *
	   * Asserts `valueToCheck` is strictly less than (<) `valueToBeBelow`
	   *
	   *     assert.isBelow(3, 6, '3 is strictly less than 6');
	   *
	   * @name isBelow
	   * @param {Mixed} valueToCheck
	   * @param {Mixed} valueToBeBelow
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isBelow = function (val, blw, msg) {
	    new Assertion(val, msg).to.be.below(blw);
	  };

	   /**
	   * ### .isAtMost(valueToCheck, valueToBeAtMost, [message])
	   *
	   * Asserts `valueToCheck` is less than or equal to (<=) `valueToBeAtMost`
	   *
	   *     assert.isAtMost(3, 6, '3 is less than or equal to 6');
	   *     assert.isAtMost(4, 4, '4 is less than or equal to 4');
	   *
	   * @name isAtMost
	   * @param {Mixed} valueToCheck
	   * @param {Mixed} valueToBeAtMost
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isAtMost = function (val, atmst, msg) {
	    new Assertion(val, msg).to.be.most(atmst);
	  };

	  /**
	   * ### .isTrue(value, [message])
	   *
	   * Asserts that `value` is true.
	   *
	   *     var teaServed = true;
	   *     assert.isTrue(teaServed, 'the tea has been served');
	   *
	   * @name isTrue
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isTrue = function (val, msg) {
	    new Assertion(val, msg).is['true'];
	  };

	  /**
	   * ### .isNotTrue(value, [message])
	   *
	   * Asserts that `value` is not true.
	   *
	   *     var tea = 'tasty chai';
	   *     assert.isNotTrue(tea, 'great, time for tea!');
	   *
	   * @name isNotTrue
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotTrue = function (val, msg) {
	    new Assertion(val, msg).to.not.equal(true);
	  };

	  /**
	   * ### .isFalse(value, [message])
	   *
	   * Asserts that `value` is false.
	   *
	   *     var teaServed = false;
	   *     assert.isFalse(teaServed, 'no tea yet? hmm...');
	   *
	   * @name isFalse
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isFalse = function (val, msg) {
	    new Assertion(val, msg).is['false'];
	  };

	  /**
	   * ### .isNotFalse(value, [message])
	   *
	   * Asserts that `value` is not false.
	   *
	   *     var tea = 'tasty chai';
	   *     assert.isNotFalse(tea, 'great, time for tea!');
	   *
	   * @name isNotFalse
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotFalse = function (val, msg) {
	    new Assertion(val, msg).to.not.equal(false);
	  };

	  /**
	   * ### .isNull(value, [message])
	   *
	   * Asserts that `value` is null.
	   *
	   *     assert.isNull(err, 'there was no error');
	   *
	   * @name isNull
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNull = function (val, msg) {
	    new Assertion(val, msg).to.equal(null);
	  };

	  /**
	   * ### .isNotNull(value, [message])
	   *
	   * Asserts that `value` is not null.
	   *
	   *     var tea = 'tasty chai';
	   *     assert.isNotNull(tea, 'great, time for tea!');
	   *
	   * @name isNotNull
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotNull = function (val, msg) {
	    new Assertion(val, msg).to.not.equal(null);
	  };

	  /**
	   * ### .isNaN
	   * Asserts that value is NaN
	   *
	   *    assert.isNaN('foo', 'foo is NaN');
	   *
	   * @name isNaN
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNaN = function (val, msg) {
	    new Assertion(val, msg).to.be.NaN;
	  };

	  /**
	   * ### .isNotNaN
	   * Asserts that value is not NaN
	   *
	   *    assert.isNotNaN(4, '4 is not NaN');
	   *
	   * @name isNotNaN
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */
	  assert.isNotNaN = function (val, msg) {
	    new Assertion(val, msg).not.to.be.NaN;
	  };

	  /**
	   * ### .isUndefined(value, [message])
	   *
	   * Asserts that `value` is `undefined`.
	   *
	   *     var tea;
	   *     assert.isUndefined(tea, 'no tea defined');
	   *
	   * @name isUndefined
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isUndefined = function (val, msg) {
	    new Assertion(val, msg).to.equal(undefined);
	  };

	  /**
	   * ### .isDefined(value, [message])
	   *
	   * Asserts that `value` is not `undefined`.
	   *
	   *     var tea = 'cup of chai';
	   *     assert.isDefined(tea, 'tea has been defined');
	   *
	   * @name isDefined
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isDefined = function (val, msg) {
	    new Assertion(val, msg).to.not.equal(undefined);
	  };

	  /**
	   * ### .isFunction(value, [message])
	   *
	   * Asserts that `value` is a function.
	   *
	   *     function serveTea() { return 'cup of tea'; };
	   *     assert.isFunction(serveTea, 'great, we can have tea now');
	   *
	   * @name isFunction
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isFunction = function (val, msg) {
	    new Assertion(val, msg).to.be.a('function');
	  };

	  /**
	   * ### .isNotFunction(value, [message])
	   *
	   * Asserts that `value` is _not_ a function.
	   *
	   *     var serveTea = [ 'heat', 'pour', 'sip' ];
	   *     assert.isNotFunction(serveTea, 'great, we have listed the steps');
	   *
	   * @name isNotFunction
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotFunction = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('function');
	  };

	  /**
	   * ### .isObject(value, [message])
	   *
	   * Asserts that `value` is an object of type 'Object' (as revealed by `Object.prototype.toString`).
	   * _The assertion does not match subclassed objects._
	   *
	   *     var selection = { name: 'Chai', serve: 'with spices' };
	   *     assert.isObject(selection, 'tea selection is an object');
	   *
	   * @name isObject
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isObject = function (val, msg) {
	    new Assertion(val, msg).to.be.a('object');
	  };

	  /**
	   * ### .isNotObject(value, [message])
	   *
	   * Asserts that `value` is _not_ an object of type 'Object' (as revealed by `Object.prototype.toString`).
	   *
	   *     var selection = 'chai'
	   *     assert.isNotObject(selection, 'tea selection is not an object');
	   *     assert.isNotObject(null, 'null is not an object');
	   *
	   * @name isNotObject
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotObject = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('object');
	  };

	  /**
	   * ### .isArray(value, [message])
	   *
	   * Asserts that `value` is an array.
	   *
	   *     var menu = [ 'green', 'chai', 'oolong' ];
	   *     assert.isArray(menu, 'what kind of tea do we want?');
	   *
	   * @name isArray
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isArray = function (val, msg) {
	    new Assertion(val, msg).to.be.an('array');
	  };

	  /**
	   * ### .isNotArray(value, [message])
	   *
	   * Asserts that `value` is _not_ an array.
	   *
	   *     var menu = 'green|chai|oolong';
	   *     assert.isNotArray(menu, 'what kind of tea do we want?');
	   *
	   * @name isNotArray
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotArray = function (val, msg) {
	    new Assertion(val, msg).to.not.be.an('array');
	  };

	  /**
	   * ### .isString(value, [message])
	   *
	   * Asserts that `value` is a string.
	   *
	   *     var teaOrder = 'chai';
	   *     assert.isString(teaOrder, 'order placed');
	   *
	   * @name isString
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isString = function (val, msg) {
	    new Assertion(val, msg).to.be.a('string');
	  };

	  /**
	   * ### .isNotString(value, [message])
	   *
	   * Asserts that `value` is _not_ a string.
	   *
	   *     var teaOrder = 4;
	   *     assert.isNotString(teaOrder, 'order placed');
	   *
	   * @name isNotString
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotString = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('string');
	  };

	  /**
	   * ### .isNumber(value, [message])
	   *
	   * Asserts that `value` is a number.
	   *
	   *     var cups = 2;
	   *     assert.isNumber(cups, 'how many cups');
	   *
	   * @name isNumber
	   * @param {Number} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNumber = function (val, msg) {
	    new Assertion(val, msg).to.be.a('number');
	  };

	  /**
	   * ### .isNotNumber(value, [message])
	   *
	   * Asserts that `value` is _not_ a number.
	   *
	   *     var cups = '2 cups please';
	   *     assert.isNotNumber(cups, 'how many cups');
	   *
	   * @name isNotNumber
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotNumber = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('number');
	  };

	  /**
	   * ### .isBoolean(value, [message])
	   *
	   * Asserts that `value` is a boolean.
	   *
	   *     var teaReady = true
	   *       , teaServed = false;
	   *
	   *     assert.isBoolean(teaReady, 'is the tea ready');
	   *     assert.isBoolean(teaServed, 'has tea been served');
	   *
	   * @name isBoolean
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isBoolean = function (val, msg) {
	    new Assertion(val, msg).to.be.a('boolean');
	  };

	  /**
	   * ### .isNotBoolean(value, [message])
	   *
	   * Asserts that `value` is _not_ a boolean.
	   *
	   *     var teaReady = 'yep'
	   *       , teaServed = 'nope';
	   *
	   *     assert.isNotBoolean(teaReady, 'is the tea ready');
	   *     assert.isNotBoolean(teaServed, 'has tea been served');
	   *
	   * @name isNotBoolean
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotBoolean = function (val, msg) {
	    new Assertion(val, msg).to.not.be.a('boolean');
	  };

	  /**
	   * ### .typeOf(value, name, [message])
	   *
	   * Asserts that `value`'s type is `name`, as determined by
	   * `Object.prototype.toString`.
	   *
	   *     assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');
	   *     assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');
	   *     assert.typeOf('tea', 'string', 'we have a string');
	   *     assert.typeOf(/tea/, 'regexp', 'we have a regular expression');
	   *     assert.typeOf(null, 'null', 'we have a null');
	   *     assert.typeOf(undefined, 'undefined', 'we have an undefined');
	   *
	   * @name typeOf
	   * @param {Mixed} value
	   * @param {String} name
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.typeOf = function (val, type, msg) {
	    new Assertion(val, msg).to.be.a(type);
	  };

	  /**
	   * ### .notTypeOf(value, name, [message])
	   *
	   * Asserts that `value`'s type is _not_ `name`, as determined by
	   * `Object.prototype.toString`.
	   *
	   *     assert.notTypeOf('tea', 'number', 'strings are not numbers');
	   *
	   * @name notTypeOf
	   * @param {Mixed} value
	   * @param {String} typeof name
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notTypeOf = function (val, type, msg) {
	    new Assertion(val, msg).to.not.be.a(type);
	  };

	  /**
	   * ### .instanceOf(object, constructor, [message])
	   *
	   * Asserts that `value` is an instance of `constructor`.
	   *
	   *     var Tea = function (name) { this.name = name; }
	   *       , chai = new Tea('chai');
	   *
	   *     assert.instanceOf(chai, Tea, 'chai is an instance of tea');
	   *
	   * @name instanceOf
	   * @param {Object} object
	   * @param {Constructor} constructor
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.instanceOf = function (val, type, msg) {
	    new Assertion(val, msg).to.be.instanceOf(type);
	  };

	  /**
	   * ### .notInstanceOf(object, constructor, [message])
	   *
	   * Asserts `value` is not an instance of `constructor`.
	   *
	   *     var Tea = function (name) { this.name = name; }
	   *       , chai = new String('chai');
	   *
	   *     assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');
	   *
	   * @name notInstanceOf
	   * @param {Object} object
	   * @param {Constructor} constructor
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notInstanceOf = function (val, type, msg) {
	    new Assertion(val, msg).to.not.be.instanceOf(type);
	  };

	  /**
	   * ### .include(haystack, needle, [message])
	   *
	   * Asserts that `haystack` includes `needle`. Works
	   * for strings and arrays.
	   *
	   *     assert.include('foobar', 'bar', 'foobar contains string "bar"');
	   *     assert.include([ 1, 2, 3 ], 3, 'array contains value');
	   *
	   * @name include
	   * @param {Array|String} haystack
	   * @param {Mixed} needle
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.include = function (exp, inc, msg) {
	    new Assertion(exp, msg, assert.include).include(inc);
	  };

	  /**
	   * ### .notInclude(haystack, needle, [message])
	   *
	   * Asserts that `haystack` does not include `needle`. Works
	   * for strings and arrays.
	   *
	   *     assert.notInclude('foobar', 'baz', 'string not include substring');
	   *     assert.notInclude([ 1, 2, 3 ], 4, 'array not include contain value');
	   *
	   * @name notInclude
	   * @param {Array|String} haystack
	   * @param {Mixed} needle
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notInclude = function (exp, inc, msg) {
	    new Assertion(exp, msg, assert.notInclude).not.include(inc);
	  };

	  /**
	   * ### .match(value, regexp, [message])
	   *
	   * Asserts that `value` matches the regular expression `regexp`.
	   *
	   *     assert.match('foobar', /^foo/, 'regexp matches');
	   *
	   * @name match
	   * @param {Mixed} value
	   * @param {RegExp} regexp
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.match = function (exp, re, msg) {
	    new Assertion(exp, msg).to.match(re);
	  };

	  /**
	   * ### .notMatch(value, regexp, [message])
	   *
	   * Asserts that `value` does not match the regular expression `regexp`.
	   *
	   *     assert.notMatch('foobar', /^foo/, 'regexp does not match');
	   *
	   * @name notMatch
	   * @param {Mixed} value
	   * @param {RegExp} regexp
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notMatch = function (exp, re, msg) {
	    new Assertion(exp, msg).to.not.match(re);
	  };

	  /**
	   * ### .property(object, property, [message])
	   *
	   * Asserts that `object` has a property named by `property`.
	   *
	   *     assert.property({ tea: { green: 'matcha' }}, 'tea');
	   *
	   * @name property
	   * @param {Object} object
	   * @param {String} property
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.property = function (obj, prop, msg) {
	    new Assertion(obj, msg).to.have.property(prop);
	  };

	  /**
	   * ### .notProperty(object, property, [message])
	   *
	   * Asserts that `object` does _not_ have a property named by `property`.
	   *
	   *     assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
	   *
	   * @name notProperty
	   * @param {Object} object
	   * @param {String} property
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notProperty = function (obj, prop, msg) {
	    new Assertion(obj, msg).to.not.have.property(prop);
	  };

	  /**
	   * ### .deepProperty(object, property, [message])
	   *
	   * Asserts that `object` has a property named by `property`, which can be a
	   * string using dot- and bracket-notation for deep reference.
	   *
	   *     assert.deepProperty({ tea: { green: 'matcha' }}, 'tea.green');
	   *
	   * @name deepProperty
	   * @param {Object} object
	   * @param {String} property
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.deepProperty = function (obj, prop, msg) {
	    new Assertion(obj, msg).to.have.deep.property(prop);
	  };

	  /**
	   * ### .notDeepProperty(object, property, [message])
	   *
	   * Asserts that `object` does _not_ have a property named by `property`, which
	   * can be a string using dot- and bracket-notation for deep reference.
	   *
	   *     assert.notDeepProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
	   *
	   * @name notDeepProperty
	   * @param {Object} object
	   * @param {String} property
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.notDeepProperty = function (obj, prop, msg) {
	    new Assertion(obj, msg).to.not.have.deep.property(prop);
	  };

	  /**
	   * ### .propertyVal(object, property, value, [message])
	   *
	   * Asserts that `object` has a property named by `property` with value given
	   * by `value`.
	   *
	   *     assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');
	   *
	   * @name propertyVal
	   * @param {Object} object
	   * @param {String} property
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.propertyVal = function (obj, prop, val, msg) {
	    new Assertion(obj, msg).to.have.property(prop, val);
	  };

	  /**
	   * ### .propertyNotVal(object, property, value, [message])
	   *
	   * Asserts that `object` has a property named by `property`, but with a value
	   * different from that given by `value`.
	   *
	   *     assert.propertyNotVal({ tea: 'is good' }, 'tea', 'is bad');
	   *
	   * @name propertyNotVal
	   * @param {Object} object
	   * @param {String} property
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.propertyNotVal = function (obj, prop, val, msg) {
	    new Assertion(obj, msg).to.not.have.property(prop, val);
	  };

	  /**
	   * ### .deepPropertyVal(object, property, value, [message])
	   *
	   * Asserts that `object` has a property named by `property` with value given
	   * by `value`. `property` can use dot- and bracket-notation for deep
	   * reference.
	   *
	   *     assert.deepPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
	   *
	   * @name deepPropertyVal
	   * @param {Object} object
	   * @param {String} property
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.deepPropertyVal = function (obj, prop, val, msg) {
	    new Assertion(obj, msg).to.have.deep.property(prop, val);
	  };

	  /**
	   * ### .deepPropertyNotVal(object, property, value, [message])
	   *
	   * Asserts that `object` has a property named by `property`, but with a value
	   * different from that given by `value`. `property` can use dot- and
	   * bracket-notation for deep reference.
	   *
	   *     assert.deepPropertyNotVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
	   *
	   * @name deepPropertyNotVal
	   * @param {Object} object
	   * @param {String} property
	   * @param {Mixed} value
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.deepPropertyNotVal = function (obj, prop, val, msg) {
	    new Assertion(obj, msg).to.not.have.deep.property(prop, val);
	  };

	  /**
	   * ### .lengthOf(object, length, [message])
	   *
	   * Asserts that `object` has a `length` property with the expected value.
	   *
	   *     assert.lengthOf([1,2,3], 3, 'array has length of 3');
	   *     assert.lengthOf('foobar', 6, 'string has length of 6');
	   *
	   * @name lengthOf
	   * @param {Mixed} object
	   * @param {Number} length
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.lengthOf = function (exp, len, msg) {
	    new Assertion(exp, msg).to.have.length(len);
	  };

	  /**
	   * ### .throws(function, [constructor/string/regexp], [string/regexp], [message])
	   *
	   * Asserts that `function` will throw an error that is an instance of
	   * `constructor`, or alternately that it will throw an error with message
	   * matching `regexp`.
	   *
	   *     assert.throws(fn, 'function throws a reference error');
	   *     assert.throws(fn, /function throws a reference error/);
	   *     assert.throws(fn, ReferenceError);
	   *     assert.throws(fn, ReferenceError, 'function throws a reference error');
	   *     assert.throws(fn, ReferenceError, /function throws a reference error/);
	   *
	   * @name throws
	   * @alias throw
	   * @alias Throw
	   * @param {Function} function
	   * @param {ErrorConstructor} constructor
	   * @param {RegExp} regexp
	   * @param {String} message
	   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	   * @namespace Assert
	   * @api public
	   */

	  assert.throws = function (fn, errt, errs, msg) {
	    if ('string' === typeof errt || errt instanceof RegExp) {
	      errs = errt;
	      errt = null;
	    }

	    var assertErr = new Assertion(fn, msg).to.throw(errt, errs);
	    return flag(assertErr, 'object');
	  };

	  /**
	   * ### .doesNotThrow(function, [constructor/regexp], [message])
	   *
	   * Asserts that `function` will _not_ throw an error that is an instance of
	   * `constructor`, or alternately that it will not throw an error with message
	   * matching `regexp`.
	   *
	   *     assert.doesNotThrow(fn, Error, 'function does not throw');
	   *
	   * @name doesNotThrow
	   * @param {Function} function
	   * @param {ErrorConstructor} constructor
	   * @param {RegExp} regexp
	   * @param {String} message
	   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
	   * @namespace Assert
	   * @api public
	   */

	  assert.doesNotThrow = function (fn, type, msg) {
	    if ('string' === typeof type) {
	      msg = type;
	      type = null;
	    }

	    new Assertion(fn, msg).to.not.Throw(type);
	  };

	  /**
	   * ### .operator(val1, operator, val2, [message])
	   *
	   * Compares two values using `operator`.
	   *
	   *     assert.operator(1, '<', 2, 'everything is ok');
	   *     assert.operator(1, '>', 2, 'this will fail');
	   *
	   * @name operator
	   * @param {Mixed} val1
	   * @param {String} operator
	   * @param {Mixed} val2
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.operator = function (val, operator, val2, msg) {
	    var ok;
	    switch(operator) {
	      case '==':
	        ok = val == val2;
	        break;
	      case '===':
	        ok = val === val2;
	        break;
	      case '>':
	        ok = val > val2;
	        break;
	      case '>=':
	        ok = val >= val2;
	        break;
	      case '<':
	        ok = val < val2;
	        break;
	      case '<=':
	        ok = val <= val2;
	        break;
	      case '!=':
	        ok = val != val2;
	        break;
	      case '!==':
	        ok = val !== val2;
	        break;
	      default:
	        throw new Error('Invalid operator "' + operator + '"');
	    }
	    var test = new Assertion(ok, msg);
	    test.assert(
	        true === flag(test, 'object')
	      , 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2)
	      , 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2) );
	  };

	  /**
	   * ### .closeTo(actual, expected, delta, [message])
	   *
	   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
	   *
	   *     assert.closeTo(1.5, 1, 0.5, 'numbers are close');
	   *
	   * @name closeTo
	   * @param {Number} actual
	   * @param {Number} expected
	   * @param {Number} delta
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.closeTo = function (act, exp, delta, msg) {
	    new Assertion(act, msg).to.be.closeTo(exp, delta);
	  };

	  /**
	   * ### .approximately(actual, expected, delta, [message])
	   *
	   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
	   *
	   *     assert.approximately(1.5, 1, 0.5, 'numbers are close');
	   *
	   * @name approximately
	   * @param {Number} actual
	   * @param {Number} expected
	   * @param {Number} delta
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.approximately = function (act, exp, delta, msg) {
	    new Assertion(act, msg).to.be.approximately(exp, delta);
	  };

	  /**
	   * ### .sameMembers(set1, set2, [message])
	   *
	   * Asserts that `set1` and `set2` have the same members.
	   * Order is not taken into account.
	   *
	   *     assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
	   *
	   * @name sameMembers
	   * @param {Array} set1
	   * @param {Array} set2
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.sameMembers = function (set1, set2, msg) {
	    new Assertion(set1, msg).to.have.same.members(set2);
	  }

	  /**
	   * ### .sameDeepMembers(set1, set2, [message])
	   *
	   * Asserts that `set1` and `set2` have the same members - using a deep equality checking.
	   * Order is not taken into account.
	   *
	   *     assert.sameDeepMembers([ {b: 3}, {a: 2}, {c: 5} ], [ {c: 5}, {b: 3}, {a: 2} ], 'same deep members');
	   *
	   * @name sameDeepMembers
	   * @param {Array} set1
	   * @param {Array} set2
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.sameDeepMembers = function (set1, set2, msg) {
	    new Assertion(set1, msg).to.have.same.deep.members(set2);
	  }

	  /**
	   * ### .includeMembers(superset, subset, [message])
	   *
	   * Asserts that `subset` is included in `superset`.
	   * Order is not taken into account.
	   *
	   *     assert.includeMembers([ 1, 2, 3 ], [ 2, 1 ], 'include members');
	   *
	   * @name includeMembers
	   * @param {Array} superset
	   * @param {Array} subset
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.includeMembers = function (superset, subset, msg) {
	    new Assertion(superset, msg).to.include.members(subset);
	  }

	  /**
	   * ### .includeDeepMembers(superset, subset, [message])
	   *
	   * Asserts that `subset` is included in `superset` - using deep equality checking.
	   * Order is not taken into account.
	   * Duplicates are ignored.
	   *
	   *     assert.includeDeepMembers([ {a: 1}, {b: 2}, {c: 3} ], [ {b: 2}, {a: 1}, {b: 2} ], 'include deep members');
	   *
	   * @name includeDeepMembers
	   * @param {Array} superset
	   * @param {Array} subset
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.includeDeepMembers = function (superset, subset, msg) {
	    new Assertion(superset, msg).to.include.deep.members(subset);
	  }

	  /**
	   * ### .oneOf(inList, list, [message])
	   *
	   * Asserts that non-object, non-array value `inList` appears in the flat array `list`.
	   *
	   *     assert.oneOf(1, [ 2, 1 ], 'Not found in list');
	   *
	   * @name oneOf
	   * @param {*} inList
	   * @param {Array<*>} list
	   * @param {String} message
	   * @namespace Assert
	   * @api public
	   */

	  assert.oneOf = function (inList, list, msg) {
	    new Assertion(inList, msg).to.be.oneOf(list);
	  }

	   /**
	   * ### .changes(function, object, property)
	   *
	   * Asserts that a function changes the value of a property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 22 };
	   *     assert.changes(fn, obj, 'val');
	   *
	   * @name changes
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.changes = function (fn, obj, prop) {
	    new Assertion(fn).to.change(obj, prop);
	  }

	   /**
	   * ### .doesNotChange(function, object, property)
	   *
	   * Asserts that a function does not changes the value of a property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { console.log('foo'); };
	   *     assert.doesNotChange(fn, obj, 'val');
	   *
	   * @name doesNotChange
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.doesNotChange = function (fn, obj, prop) {
	    new Assertion(fn).to.not.change(obj, prop);
	  }

	   /**
	   * ### .increases(function, object, property)
	   *
	   * Asserts that a function increases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 13 };
	   *     assert.increases(fn, obj, 'val');
	   *
	   * @name increases
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.increases = function (fn, obj, prop) {
	    new Assertion(fn).to.increase(obj, prop);
	  }

	   /**
	   * ### .doesNotIncrease(function, object, property)
	   *
	   * Asserts that a function does not increase object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 8 };
	   *     assert.doesNotIncrease(fn, obj, 'val');
	   *
	   * @name doesNotIncrease
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.doesNotIncrease = function (fn, obj, prop) {
	    new Assertion(fn).to.not.increase(obj, prop);
	  }

	   /**
	   * ### .decreases(function, object, property)
	   *
	   * Asserts that a function decreases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 5 };
	   *     assert.decreases(fn, obj, 'val');
	   *
	   * @name decreases
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.decreases = function (fn, obj, prop) {
	    new Assertion(fn).to.decrease(obj, prop);
	  }

	   /**
	   * ### .doesNotDecrease(function, object, property)
	   *
	   * Asserts that a function does not decreases an object property
	   *
	   *     var obj = { val: 10 };
	   *     var fn = function() { obj.val = 15 };
	   *     assert.doesNotDecrease(fn, obj, 'val');
	   *
	   * @name doesNotDecrease
	   * @param {Function} modifier function
	   * @param {Object} object
	   * @param {String} property name
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.doesNotDecrease = function (fn, obj, prop) {
	    new Assertion(fn).to.not.decrease(obj, prop);
	  }

	  /*!
	   * ### .ifError(object)
	   *
	   * Asserts if value is not a false value, and throws if it is a true value.
	   * This is added to allow for chai to be a drop-in replacement for Node's
	   * assert class.
	   *
	   *     var err = new Error('I am a custom error');
	   *     assert.ifError(err); // Rethrows err!
	   *
	   * @name ifError
	   * @param {Object} object
	   * @namespace Assert
	   * @api public
	   */

	  assert.ifError = function (val) {
	    if (val) {
	      throw(val);
	    }
	  };

	  /**
	   * ### .isExtensible(object)
	   *
	   * Asserts that `object` is extensible (can have new properties added to it).
	   *
	   *     assert.isExtensible({});
	   *
	   * @name isExtensible
	   * @alias extensible
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.isExtensible = function (obj, msg) {
	    new Assertion(obj, msg).to.be.extensible;
	  };

	  /**
	   * ### .isNotExtensible(object)
	   *
	   * Asserts that `object` is _not_ extensible.
	   *
	   *     var nonExtensibleObject = Object.preventExtensions({});
	   *     var sealedObject = Object.seal({});
	   *     var frozenObject = Object.freese({});
	   *
	   *     assert.isNotExtensible(nonExtensibleObject);
	   *     assert.isNotExtensible(sealedObject);
	   *     assert.isNotExtensible(frozenObject);
	   *
	   * @name isNotExtensible
	   * @alias notExtensible
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotExtensible = function (obj, msg) {
	    new Assertion(obj, msg).to.not.be.extensible;
	  };

	  /**
	   * ### .isSealed(object)
	   *
	   * Asserts that `object` is sealed (cannot have new properties added to it
	   * and its existing properties cannot be removed).
	   *
	   *     var sealedObject = Object.seal({});
	   *     var frozenObject = Object.seal({});
	   *
	   *     assert.isSealed(sealedObject);
	   *     assert.isSealed(frozenObject);
	   *
	   * @name isSealed
	   * @alias sealed
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.isSealed = function (obj, msg) {
	    new Assertion(obj, msg).to.be.sealed;
	  };

	  /**
	   * ### .isNotSealed(object)
	   *
	   * Asserts that `object` is _not_ sealed.
	   *
	   *     assert.isNotSealed({});
	   *
	   * @name isNotSealed
	   * @alias notSealed
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotSealed = function (obj, msg) {
	    new Assertion(obj, msg).to.not.be.sealed;
	  };

	  /**
	   * ### .isFrozen(object)
	   *
	   * Asserts that `object` is frozen (cannot have new properties added to it
	   * and its existing properties cannot be modified).
	   *
	   *     var frozenObject = Object.freeze({});
	   *     assert.frozen(frozenObject);
	   *
	   * @name isFrozen
	   * @alias frozen
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.isFrozen = function (obj, msg) {
	    new Assertion(obj, msg).to.be.frozen;
	  };

	  /**
	   * ### .isNotFrozen(object)
	   *
	   * Asserts that `object` is _not_ frozen.
	   *
	   *     assert.isNotFrozen({});
	   *
	   * @name isNotFrozen
	   * @alias notFrozen
	   * @param {Object} object
	   * @param {String} message _optional_
	   * @namespace Assert
	   * @api public
	   */

	  assert.isNotFrozen = function (obj, msg) {
	    new Assertion(obj, msg).to.not.be.frozen;
	  };

	  /*!
	   * Aliases.
	   */

	  (function alias(name, as){
	    assert[as] = assert[name];
	    return alias;
	  })
	  ('isOk', 'ok')
	  ('isNotOk', 'notOk')
	  ('throws', 'throw')
	  ('throws', 'Throw')
	  ('isExtensible', 'extensible')
	  ('isNotExtensible', 'notExtensible')
	  ('isSealed', 'sealed')
	  ('isNotSealed', 'notSealed')
	  ('isFrozen', 'frozen')
	  ('isNotFrozen', 'notFrozen');
	};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = parsePathstring;
	exports.getSegments = getSegments;

	var _bernsteinPoint = __webpack_require__(41);

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
	  var cleanArray = function cleanArray(str) {
	    return str.trim().length > 0;
	  };
	  var clean = function clean(str) {
	    str = str.trim();
	    return isNaN(str) ? str : parseFloat(str);
	  };

	  return d
	  // remove invalid characters
	  .replace(/[^mlhvqtcsaz\d\s,-]/gi, "")
	  // split in segments e.g. ["M0 0", "l50 50", ...]
	  .split(/([mlhvqtcsaz][\d\s,-]*)/i)
	  // remove empty segments
	  .filter(cleanArray).map(function (segment) {
	    return segment
	    // remove extra whitespaces
	    .replace(/[\s,]+/g, " ")
	    // split command and parameters
	    .split(/([mlhvqtcsaz]|-*\d+)/i)
	    // remove empty values
	    .filter(cleanArray)
	    // trim and parse integers
	    .map(clean);
	  });
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

	    var pointList = void 0;
	    var prev = acc.length > 0 ? acc[acc.length - 1] : undefined;

	    if (prev && prev.isM()) {
	      firstPoint = prev;
	    }

	    if (p.length > 0) {
	      pointList = chunks(parameters, p.length).map(function (chunk) {
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
/* 41 */
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

	var _pointTypes = __webpack_require__(42);

	var pointTypes = _interopRequireWildcard(_pointTypes);

	var _bernsteinPointIs = __webpack_require__(43);

	var assertTypes = _interopRequireWildcard(_bernsteinPointIs);

	var _bernsteinPointIsRelative = __webpack_require__(44);

	var _bernsteinPointIsRelative2 = _interopRequireDefault(_bernsteinPointIsRelative);

	var _bernsteinPointIsInside = __webpack_require__(45);

	var _bernsteinPointIsInside2 = _interopRequireDefault(_bernsteinPointIsInside);

	var _bernsteinPointDistance = __webpack_require__(46);

	var _bernsteinPointDistance2 = _interopRequireDefault(_bernsteinPointDistance);

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
	    value: function isInside() {
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
/* 42 */
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
/* 43 */
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
/* 44 */
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
/* 45 */
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = distance;
	exports.distanceSegment = distanceSegment;

	var _bernsteinPoint = __webpack_require__(41);

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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = buildPathstring;

	var _bernsteinPoint = __webpack_require__(41);

	var _bernsteinPoint2 = _interopRequireDefault(_bernsteinPoint);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	function r(n) {
	  var precision = arguments.length <= 1 || arguments[1] === undefined ? 3 : arguments[1];

	  var coef = Math.pow(10, precision);
	  return Math.round(n * coef) / coef;
	}

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

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isEqual;

	var _deepEqual = __webpack_require__(49);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _bernsteinParsePathstring = __webpack_require__(40);

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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(50);
	var isArguments = __webpack_require__(51);

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
/* 50 */
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
/* 51 */
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isValid;

	var _bernsteinPoint = __webpack_require__(41);

	var points = _interopRequireWildcard(_bernsteinPoint);

	var _bernsteinParsePathstring = __webpack_require__(40);

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

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinParsePathstring = __webpack_require__(40);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	var _bernsteinPathIsEqual = __webpack_require__(48);

	var _bernsteinPathIsEqual2 = _interopRequireDefault(_bernsteinPathIsEqual);

	var _bernsteinCleanPath = __webpack_require__(54);

	var _bernsteinCleanPath2 = _interopRequireDefault(_bernsteinCleanPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("clean-path", function () {
	  it("should simplify the closures of the path", function () {
	    var path = (0, _bernsteinParsePathstring2.default)("M0 0L100 0L100 100l-100 -100 M50 50h50v50l-50-50");
	    var test = (0, _bernsteinCleanPath.simplifyClosures)(path);
	    var expected = "M0 0L100 0L100 100z M50 50h50v50z";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });

	  it("should make the path start with a M point", function () {
	    var path = (0, _bernsteinParsePathstring2.default)("L0 0zL0 0");
	    var test = (0, _bernsteinCleanPath.makeSureFirstPointsAreM)(path);
	    var expected = "M0 0zM0 0";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });

	  it("should delete the two consecutive same points", function () {
	    var path = (0, _bernsteinParsePathstring2.default)("M0 0L50 50L50 50L50 50");
	    var test = (0, _bernsteinCleanPath.removeConsecutiveSamePoints)(path);
	    var expected = "M0 0L50 50";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });

	  it("should clean the invalid path", function () {
	    var path = (0, _bernsteinParsePathstring2.default)("L0 0l50 50l0 0h50v50 L0 0");
	    var test = (0, _bernsteinCleanPath2.default)(path);
	    var expected = "M0 0l50 50h50v50z";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });
	});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = clean;
	exports.simplifyClosures = simplifyClosures;
	exports.makeSureFirstPointsAreM = makeSureFirstPointsAreM;
	exports.removeConsecutiveSamePoints = removeConsecutiveSamePoints;

	var _bernsteinPoint = __webpack_require__(41);

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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinPoint = __webpack_require__(41);

	var points = _interopRequireWildcard(_bernsteinPoint);

	var _bernsteinClipPaths = __webpack_require__(56);

	var _bernsteinClipPaths2 = _interopRequireDefault(_bernsteinClipPaths);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	describe("clip-paths", function () {
	  it("should get the intersection point between two lines", function () {
	    var p = (0, _bernsteinClipPaths.getIntersectionPoint)(points.M(0, 0), points.L(100, 100), points.M(100, 0), points.L(0, 100));

	    _chai.assert.equal(p.x, 50);
	    _chai.assert.equal(p.y, 50);
	  });

	  it("shouldn't get the point between two finite lines", function () {
	    var p = (0, _bernsteinClipPaths.getIntersectionPoint)(points.M(0, 0), points.L(40, 40), points.M(100, 0), points.L(60, 40));

	    _chai.assert.isFalse(p);
	  });

	  it.skip("should get paths with intersection points", function () {
	    var s = [points.M(0, 0), points.L(100, 0), points.L(100, 100), points.L(0, 100)];

	    var c = [points.M(50, 50), points.L(150, 50), points.L(150, 150), points.L(50, 150)];

	    var sInter1 = points.L(100, 50);
	    var cInter1 = points.L(100, 50);
	    var sInter2 = points.L(50, 100);
	    var cInter2 = points.L(50, 100);

	    sInter1.corresponding = 1;
	    sInter1.isEntry = true;
	    sInter1.isVisited = false;

	    cInter1.corresponding = 2;
	    cInter1.isEntry = false;
	    cInter1.isVisited = false;

	    sInter2.corresponding = 5;
	    sInter2.isEntry = false;
	    sInter2.isVisited = false;

	    cInter2.corresponding = 4;
	    cInter2.isEntry = true;
	    cInter2.isVisited = false;

	    _chai.assert.deepEqual((0, _bernsteinClipPaths.getIntersectedPaths)(s, c, true, true), [[points.M(0, 0), points.L(100, 0), sInter1, points.L(100, 100), sInter2, points.L(0, 100)], [points.M(50, 50), cInter1, points.L(150, 50), points.L(150, 150), points.L(50, 150), cInter2]]);
	  });

	  it("should clip the paths", function () {
	    var s = [points.M(50, 0), points.L(150, 0), points.L(150, 100), points.L(50, 100)];

	    var c = [points.M(0, 25), points.L(200, 25), points.L(200, 75), points.L(0, 75)];

	    // getIntersectedPaths(s, c)
	    // console.log("\n\nintersections ---------", getIntersectedPaths(s, c))
	    // console.log("clip ---------", clip(s, c))
	    _chai.assert.isTrue(true);
	  });
	});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.default = clip;
	exports.getIntersectedPaths = getIntersectedPaths;
	exports.getIntersectionPoint = getIntersectionPoint;

	var _bernsteinPoint = __webpack_require__(41);

	var _bernsteinPoint2 = _interopRequireDefault(_bernsteinPoint);

	var _bernsteinPointIs = __webpack_require__(43);

	var _bernsteinPointIsInside = __webpack_require__(45);

	var _bernsteinPointIsInside2 = _interopRequireDefault(_bernsteinPointIsInside);

	var _bernsteinCleanPath = __webpack_require__(54);

	var _bernsteinCleanPath2 = _interopRequireDefault(_bernsteinCleanPath);

	var _bernsteinCombinePath = __webpack_require__(57);

	var _bernsteinCombinePath2 = _interopRequireDefault(_bernsteinCombinePath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var isIntersection = function isIntersection(p) {
	  return typeof p.corresponding !== "undefined";
	};
	var isNonVisitedIntersection = function isNonVisitedIntersection(p) {
	  return isIntersection(p) && !p.isVisited;
	};

	function clip(_s, _c) {
	  var sForwards = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	  var cForwards = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

	  var _getIntersectedPaths = getIntersectedPaths(_s, _c, sForwards, cForwards);

	  var _getIntersectedPaths2 = _slicedToArray(_getIntersectedPaths, 2);

	  var s = _getIntersectedPaths2[0];
	  var c = _getIntersectedPaths2[1];

	  var clipped = [];

	  var index = void 0;

	  // step 3
	  // generate the resulting path
	  while ((index = s.findIndex(isNonVisitedIntersection)) > -1) {
	    // begins with an intersection
	    var current = s[index];
	    var sourcePath = s;
	    var clipPath = c;


	    var clippedShape = [(0, _bernsteinPoint2.default)(current.code, current.x, current.y, current.parameters)];

	    while (!current.isVisited) {
	      sourcePath[index].isVisited = true;
	      clipPath[sourcePath[index].corresponding].isVisited = true;

	      // find the next intersection
	      if (current.isEntry) {
	        do {
	          index = index < sourcePath.length - 1 ? index + 1 : 0;
	          current = sourcePath[index];
	          clippedShape.push((0, _bernsteinPoint2.default)(current.code, current.x, current.y, current.parameters));
	        } while (!isIntersection(current));
	      } else {
	        do {
	          index = index > 0 ? index - 1 : sourcePath.length - 1;
	          current = sourcePath[index];
	          clippedShape.push((0, _bernsteinPoint2.default)(current.code, current.x, current.y, current.parameters));
	        } while (!isIntersection(current));
	      }

	      // switch path
	      var _ref = [clipPath, sourcePath];
	      sourcePath = _ref[0];
	      clipPath = _ref[1];

	      index = current.corresponding;
	      current = sourcePath[index];
	    }

	    clipped.push(clippedShape);
	  }

	  if (clipped.length === 0) {
	    if ((0, _bernsteinPointIsInside2.default)(_s[0], _c)) {
	      clipped.push.apply(clipped, _toConsumableArray(_s));
	    }

	    if ((0, _bernsteinPointIsInside2.default)(_c[0], _s)) {
	      clipped.push.apply(clipped, _toConsumableArray(_c));
	    }
	  }

	  return clipped;
	}

	function getIntersectedPaths(s, c, sForwards, cForwards) {
	  sForwards ^= (0, _bernsteinPointIsInside2.default)(s[0], c);
	  cForwards ^= (0, _bernsteinPointIsInside2.default)(c[0], s);

	  for (var i = 0; i < s.length; i++) {
	    var sPoint = s[i];
	    var sNext = i < s.length - 1 ? s[i + 1] : s[0];

	    console.log("Segment source ", i);

	    if ( /*!isIntersection(sPoint)*/true) {
	      for (var j = 0; j < c.length; j++) {
	        var cPoint = c[j];
	        var cNext = j < c.length - 1 ? c[j + 1] : c[0];

	        console.log("Segment clip", j);

	        console.log(sPoint, sNext, cPoint, cNext);

	        if ( /*!isIntersection(cPoint)*/true) {
	          var inter = getIntersectionPoint(sPoint, sNext, cPoint, cNext);

	          if (inter !== false) {
	            var sIndex = ++i;
	            var sInter = (0, _bernsteinPoint.L)(inter.x, inter.y);

	            console.log(sIndex, sInter);

	            var cIndex = ++j;
	            var cInter = (0, _bernsteinPoint.L)(inter.x, inter.y);

	            // step 1
	            // add intersections in each path
	            sInter.corresponding = cIndex;
	            cInter.corresponding = sIndex;

	            sInter.isVisited = false;
	            cInter.isVisited = false;

	            // step 2
	            // mark each intersection as entry or exit
	            sInter.isEntry = !!sForwards;
	            sForwards = !sForwards;

	            cInter.isEntry = !!cForwards;
	            cForwards = !cForwards;

	            s.splice(sIndex, 0, sInter);
	            c.splice(cIndex, 0, cInter);
	          }
	        }
	      }
	    }
	  }

	  return [s, c];
	}

	function getIntersectionPoint(p1, p2, p3, p4) {
	  var d = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);

	  if (d === 0) {
	    return false;
	  }

	  var a = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / d;
	  var b = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / d;

	  if (a > 0 && a < 1 && b > 0 && b < 1) {
	    return {
	      x: p1.x + a * (p2.x - p1.x),
	      y: p1.y + a * (p2.y - p1.y)
	    };
	  }

	  return false;
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = combine;

	var _bernsteinPoint = __webpack_require__(41);

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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinParsePathstring = __webpack_require__(40);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	var _bernsteinPathIsEqual = __webpack_require__(48);

	var _bernsteinPathIsEqual2 = _interopRequireDefault(_bernsteinPathIsEqual);

	var _bernsteinCombinePath = __webpack_require__(57);

	var _bernsteinCombinePath2 = _interopRequireDefault(_bernsteinCombinePath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("combine-path", function () {
	  it("should combine compound path", function () {
	    var path = (0, _bernsteinParsePathstring2.default)("M0 0h50v50z m100 100h100v100z");
	    var test = (0, _bernsteinCombinePath2.default)(path);
	    var expected = "M0 0h50v50 l50 50h100v100z";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });
	});

/***/ },
/* 59 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinPoint = __webpack_require__(41);

	var _bernsteinIntersections = __webpack_require__(61);

	describe("intersections", function () {
	  it("should give the intersection point between two segments", function () {
	    _chai.assert.deepEqual((0, _bernsteinIntersections.segmentSegment)((0, _bernsteinPoint.M)(0, 0), (0, _bernsteinPoint.L)(100, 100), (0, _bernsteinPoint.M)(100, 0), (0, _bernsteinPoint.L)(0, 100)), { x: 50, y: 50 });
	  });

	  it("should give the intersection point between a segment and a quad Bezier curve", function () {});

	  it("should give the intersection point between two quad Bezier curves", function () {});

	  it("should give the intersection point between a segment and a cub Bezier curve", function () {});

	  it("should give the intersection point between two cub Bezier curves", function () {});

	  it("should give the intersection point between a quad Bezier curve and a cub Bezier curve", function () {});
	});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.segmentSegment = undefined;

	var _segmentSegment2 = __webpack_require__(62);

	var _segmentSegment3 = _interopRequireDefault(_segmentSegment2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.segmentSegment = _segmentSegment3.default;

/***/ },
/* 62 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = segmentSegment;
	function segmentSegment(l1a, l1b, l2a, l2b) {
	  var d = (l2b.y - l2a.y) * (l1b.x - l1a.x) - (l2b.x - l2a.x) * (l1b.y - l1a.y);

	  if (d === 0) {
	    return null;
	  }

	  var t = ((l2b.x - l2a.x) * (l1a.y - l2a.y) - (l2b.y - l2a.y) * (l1a.x - l2a.x)) / d;
	  var u = ((l1b.x - l1a.x) * (l1a.y - l2a.y) - (l1b.y - l1a.y) * (l1a.x - l2a.x)) / d;

	  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
	    return {
	      x: l1a.x + t * (l1b.x - l1a.x),
	      y: l1a.y + t * (l1b.y - l1a.y)
	    };
	  }

	  return null;
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinParsePathstring = __webpack_require__(40);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	var _bernsteinPathIsEqual = __webpack_require__(48);

	var _bernsteinPathIsEqual2 = _interopRequireDefault(_bernsteinPathIsEqual);

	var _bernsteinJoinPaths = __webpack_require__(64);

	var _bernsteinJoinPaths2 = _interopRequireDefault(_bernsteinJoinPaths);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("join-paths", function () {
	  var p1 = (0, _bernsteinParsePathstring2.default)("M0 0L100 0");
	  var p2 = (0, _bernsteinParsePathstring2.default)("L100 100L100 200");
	  var p3 = (0, _bernsteinParsePathstring2.default)("M200 200h50v50");

	  it("should join two paths without close them", function () {
	    var test = (0, _bernsteinJoinPaths2.default)([p1, p2, p3]);
	    var expected = "M0 0L100 0 L100 100L100 200 M200 200h50v50";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });

	  it("should join two paths and close them", function () {
	    var test = (0, _bernsteinJoinPaths2.default)([p1, p2, p3], true);
	    var expected = "M0 0L100 0z M100 100L100 200z M200 200h50v50z";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });
	});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = join;

	var _bernsteinPoint = __webpack_require__(41);

	var _bernsteinCleanPath = __webpack_require__(54);

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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinParsePathstring = __webpack_require__(40);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	var _bernsteinPathIsEqual = __webpack_require__(48);

	var _bernsteinPathIsEqual2 = _interopRequireDefault(_bernsteinPathIsEqual);

	var _bernsteinMatrixPath = __webpack_require__(66);

	var _bernsteinMatrixPath2 = _interopRequireDefault(_bernsteinMatrixPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("matrix-path", function () {
	  it("should multiply two matrix", function () {
	    _chai.assert.deepEqual((0, _bernsteinMatrixPath.multiply3x1)([1, 2, 3, 2, 1, 3, 3, 2, 1], [2, 2, 2]), [12, 12, 12]);
	  });

	  it("should apply the matrix to each coordinate", function () {
	    var m = [1, 0, 100, 0, 1, 100, 0, 0, 1];
	    var path = (0, _bernsteinParsePathstring2.default)("M0 0L100 100Q150 150 200 200");
	    var test = (0, _bernsteinMatrixPath2.default)(path, m);
	    var expected = "M100 100L200 200Q250 250 300 300";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.default = matrix;
	exports.multiply3x1 = multiply3x1;

	var _bernsteinPoint = __webpack_require__(41);

	var _bernsteinPoint2 = _interopRequireDefault(_bernsteinPoint);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function matrix(path, a) {
	  var lastComputedPoint = void 0;

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
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinPoint = __webpack_require__(41);

	var points = _interopRequireWildcard(_bernsteinPoint);

	var _bernsteinParsePathstring = __webpack_require__(40);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	describe("parse-pathstring", function () {
	  it("should parse the code and return an array of segments", function () {
	    var test = (0, _bernsteinParsePathstring.getSegments)("M0 0l50 50 20 -20Q 30, 30, 60, 60t20 20C80 80 60,60 5 5s -5 6 2,2 zm 50 50z");
	    var expected = [["M", 0, 0], ["l", 50, 50, 20, -20], ["Q", 30, 30, 60, 60], ["t", 20, 20], ["C", 80, 80, 60, 60, 5, 5], ["s", -5, 6, 2, 2], ["z"], ["m", 50, 50], ["z"]];

	    _chai.assert.deepEqual(test, expected);
	  });

	  it("should parse the code and return an array of points", function () {
	    var test = (0, _bernsteinParsePathstring2.default)("M0 0l50 50 20 -20Q 30, 30, 60, 60t20 20C80 80 60,60 5 5s -5 6 2,2 zm 50 50z");
	    var expected = [points.M(0, 0), points.l(50, 50, points.M(0, 0)), points.l(20, -20, points.l(50, 50, points.M(0, 0))), points.Q(30, 30, 60, 60), points.t(20, 20, points.Q(30, 30, 60, 60)), points.C(80, 80, 60, 60, 5, 5), points.s(-5, 6, 2, 2, points.C(80, 80, 60, 60, 5, 5)), points.z(points.M(0, 0)), points.m(50, 50, points.z(points.M(0, 0))), points.z(points.m(50, 50, points.z(points.M(0, 0))))];

	    _chai.assert.deepEqual(test, expected);
	  });

	  it("should parse the invalid code and return an empty array", function () {
	    var test = (0, _bernsteinParsePathstring2.default)("___:(___");
	    var expected = [];

	    _chai.assert.deepEqual(test, expected);
	  });
	});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinParsePathstring = __webpack_require__(40);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	var _bernsteinPathIsEqual = __webpack_require__(48);

	var _bernsteinPathIsEqual2 = _interopRequireDefault(_bernsteinPathIsEqual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("path-is-equal", function () {
	  describe("check equal paths", function () {
	    it("should check that the paths are equal", function () {
	      var test = (0, _bernsteinParsePathstring2.default)("M0 0l10 10");

	      _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, "M0 0l10 10"));
	    });

	    it("should check that the pathstrings are equal", function () {
	      _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)("M0,000l10 10", "M 0 0 l 10 , 10"));
	    });
	  });

	  describe("check non-equal paths", function () {
	    it("should check that the paths are not equal", function () {
	      var test = (0, _bernsteinParsePathstring2.default)("M0 0l10 10");

	      _chai.assert.isFalse((0, _bernsteinPathIsEqual2.default)(test, "M0 0l10 10l20 20"));
	    });

	    it("should check that the pathstrings are not equal", function () {
	      _chai.assert.isFalse((0, _bernsteinPathIsEqual2.default)("M0,0l10 10", "M 0 0 l 10 , 10l20 20"));
	    });
	  });
	});

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinPathstringIsValid = __webpack_require__(52);

	var _bernsteinPathstringIsValid2 = _interopRequireDefault(_bernsteinPathstringIsValid);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("pathstring-is-valid", function () {
	  describe("check valid pathstrings", function () {
	    it("should check that pathstrings are valid", function () {
	      _chai.assert.isTrue((0, _bernsteinPathstringIsValid2.default)("M0,0"));
	      _chai.assert.isTrue((0, _bernsteinPathstringIsValid2.default)("M0,0l0 0"));
	      _chai.assert.isTrue((0, _bernsteinPathstringIsValid2.default)("M0,0l0 0a50 50, 0,1,0 -10 10"));
	    });
	  });

	  describe("check invalid pathstrings", function () {
	    it("should check that there is a missing M point", function () {
	      _chai.assert.isFalse((0, _bernsteinPathstringIsValid2.default)("l10,10"));
	    });

	    it("should check that there is not the correct number of parameters", function () {
	      _chai.assert.isFalse((0, _bernsteinPathstringIsValid2.default)("M0"));
	      _chai.assert.isFalse((0, _bernsteinPathstringIsValid2.default)("q10 20,30"));
	    });

	    it("should check that there are invalid characters", function () {
	      _chai.assert.isFalse((0, _bernsteinPathstringIsValid2.default)("M/10__10"));
	    });
	  });
	});

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinPoint = __webpack_require__(41);

	var _bernsteinPointDistance = __webpack_require__(46);

	var _bernsteinPointDistance2 = _interopRequireDefault(_bernsteinPointDistance);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("point-distance", function () {
	  it("should give the distance between two points", function () {
	    var test = (0, _bernsteinPointDistance2.default)((0, _bernsteinPoint.M)(0, 0), (0, _bernsteinPoint.M)(0, 100));
	    var expected = 100;

	    _chai.assert.strictEqual(test, expected);
	  });

	  it("should give the distance between a point and a segment", function () {
	    var test = (0, _bernsteinPointDistance.distanceSegment)((0, _bernsteinPoint.M)(100, 50), (0, _bernsteinPoint.M)(0, 0), (0, _bernsteinPoint.M)(0, 100));
	    var expected = 100;

	    _chai.assert.strictEqual(test, expected);
	  });

	  it("should give the distance between a point and a segment", function () {
	    var test = (0, _bernsteinPointDistance.distanceSegment)((0, _bernsteinPoint.M)(0, 200), (0, _bernsteinPoint.M)(0, 0), (0, _bernsteinPoint.M)(0, 100));
	    var expected = 100;

	    _chai.assert.strictEqual(test, expected);
	  });
	});

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinParsePathstring = __webpack_require__(40);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	var _bernsteinPoint = __webpack_require__(41);

	var _bernsteinPointIsInside = __webpack_require__(45);

	var _bernsteinPointIsInside2 = _interopRequireDefault(_bernsteinPointIsInside);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("point-is-inside", function () {
	  var path = (0, _bernsteinParsePathstring2.default)("M0 0L100 0L100 100L0 100");

	  it("should check that the point is inside the given path", function () {
	    _chai.assert.isTrue((0, _bernsteinPointIsInside2.default)((0, _bernsteinPoint.M)(50, 50), path));
	  });

	  it("should check that the point is not inside the given path", function () {
	    _chai.assert.isFalse((0, _bernsteinPointIsInside2.default)((0, _bernsteinPoint.M)(400, 50), path));
	  });
	});

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinPoint = __webpack_require__(41);

	var _bernsteinPointIsRelative = __webpack_require__(44);

	var _bernsteinPointIsRelative2 = _interopRequireDefault(_bernsteinPointIsRelative);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("point-is-relative", function () {
	  it("should check that the command `m` is relative", function () {
	    _chai.assert.isTrue((0, _bernsteinPointIsRelative2.default)((0, _bernsteinPoint.m)(0, 0)));
	  });

	  it("should check that the command `M` is absolute", function () {
	    _chai.assert.isFalse((0, _bernsteinPointIsRelative2.default)((0, _bernsteinPoint.M)(0, 0)));
	  });
	});

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinPoint = __webpack_require__(41);

	var _bernsteinPointIs = __webpack_require__(43);

	describe("point-is", function () {
	  it("should check that the point is M", function () {
	    _chai.assert.isTrue((0, _bernsteinPointIs.isM)((0, _bernsteinPoint.m)(0, 0)));
	  });

	  it("should check that the point is Q", function () {
	    _chai.assert.isTrue((0, _bernsteinPointIs.isQ)((0, _bernsteinPoint.Q)(20, 20, 0, 0)));
	  });

	  it("should check that the point is not Z", function () {
	    _chai.assert.isFalse((0, _bernsteinPointIs.isZ)((0, _bernsteinPoint.L)(0, 0)));
	  });
	});

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinPoint = __webpack_require__(41);

	var _bernsteinPoint2 = _interopRequireDefault(_bernsteinPoint);

	var _bernsteinPointMinmax = __webpack_require__(75);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("point-minmax", function () {
	  it("should give the min point", function () {
	    _chai.assert.deepEqual((0, _bernsteinPointMinmax.min)((0, _bernsteinPoint.M)(0, 100), (0, _bernsteinPoint.M)(100, 0)), new _bernsteinPoint2.default(null, 0, 0));
	  });

	  it("should give the max point", function () {
	    _chai.assert.deepEqual((0, _bernsteinPointMinmax.max)((0, _bernsteinPoint.M)(0, 100), (0, _bernsteinPoint.M)(100, 0)), new _bernsteinPoint2.default(null, 100, 100));
	  });
	});

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.min = min;
	exports.max = max;

	var _bernsteinPoint = __webpack_require__(41);

	var _bernsteinPoint2 = _interopRequireDefault(_bernsteinPoint);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function min(p1, p2) {
	  return new _bernsteinPoint2.default(null, Math.min(p1.x, p2.x), Math.min(p1.y, p2.y));
	}

	function max(p1, p2) {
	  return new _bernsteinPoint2.default(null, Math.max(p1.x, p2.x), Math.max(p1.y, p2.y));
	}

/***/ },
/* 76 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinParsePathstring = __webpack_require__(40);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	var _bernsteinPathIsEqual = __webpack_require__(48);

	var _bernsteinPathIsEqual2 = _interopRequireDefault(_bernsteinPathIsEqual);

	var _bernsteinReversePath = __webpack_require__(78);

	var _bernsteinReversePath2 = _interopRequireDefault(_bernsteinReversePath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("reverse-path", function () {
	  it("should reverse the path", function () {
	    var path = (0, _bernsteinParsePathstring2.default)("M 0 0 H 100 Q 150 0 150 100 T 200 150 T 250 200 V 200 A 50 50 0 0 1 250 250 V 350 H 350 C 400 350 400 450 400 550 S 400 700 300 700 z M 500 350 L 450 250 V 100 H 600 L 650 250 T 655 250 S 20 20 20 20 z");
	    var test = (0, _bernsteinReversePath2.default)(path);
	    var expected = "M20 20C20 20 655 250 655 250Q650 250 650 250L600 100H450V250L500 350zM300 700C400 700 400 650 400 550C400 450 400 350 350 350H250V250A50 50 0 0 0 250 200V200Q250 100 200 150Q150 200 150 100Q150 0 100 0H0z";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });
	});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = reverse;

	var _bernsteinPoint = __webpack_require__(41);

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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinParsePathstring = __webpack_require__(40);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	var _bernsteinBuildPathstring = __webpack_require__(47);

	var _bernsteinBuildPathstring2 = _interopRequireDefault(_bernsteinBuildPathstring);

	var _bernsteinPathIsEqual = __webpack_require__(48);

	var _bernsteinPathIsEqual2 = _interopRequireDefault(_bernsteinPathIsEqual);

	var _bernsteinRotatePath = __webpack_require__(80);

	var _bernsteinRotatePath2 = _interopRequireDefault(_bernsteinRotatePath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("rotate-path", function () {
	  it("should rotate the path of PI/2", function () {
	    var path = (0, _bernsteinParsePathstring2.default)("M0 0L100 0");
	    var test = (0, _bernsteinBuildPathstring2.default)((0, _bernsteinRotatePath2.default)(path, Math.PI / 2));
	    var expected = "M0 0L0 100";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });
	});

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = rotate;

	var _bernsteinMatrixPath = __webpack_require__(66);

	var _bernsteinMatrixPath2 = _interopRequireDefault(_bernsteinMatrixPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function rotate(path, theta) {
	  return (0, _bernsteinMatrixPath2.default)(path, [Math.cos(theta), -Math.sin(theta), 0, Math.sin(theta), Math.cos(theta), 0, 0, 0, 1]);
	}

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinParsePathstring = __webpack_require__(40);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	var _bernsteinPathIsEqual = __webpack_require__(48);

	var _bernsteinPathIsEqual2 = _interopRequireDefault(_bernsteinPathIsEqual);

	var _bernsteinScalePath = __webpack_require__(82);

	var _bernsteinScalePath2 = _interopRequireDefault(_bernsteinScalePath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("scale-path", function () {
	  var path = (0, _bernsteinParsePathstring2.default)("M0 0L100 0Q150 150 200 200");

	  it("should scale x2 the path on x and y", function () {
	    var test = (0, _bernsteinScalePath2.default)(path, 2, 2);
	    var expected = "M0 0L200 0Q300 300 400 400";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });

	  it("should scale x0.5 the path on x", function () {
	    var test = (0, _bernsteinScalePath2.default)(path, .5, 1);
	    var expected = "M0 0L50 0Q75 150 100 200";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });

	  it("should scale x0.5 the path on y", function () {
	    var test = (0, _bernsteinScalePath2.default)(path, 1, .5);
	    var expected = "M0 0L100 0Q150 75 200 100";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });
	});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = scale;

	var _bernsteinMatrixPath = __webpack_require__(66);

	var _bernsteinMatrixPath2 = _interopRequireDefault(_bernsteinMatrixPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function scale(path, sx, sy) {
	  return (0, _bernsteinMatrixPath2.default)(path, [sx, 0, 0, 0, sy, 0, 0, 0, 1]);
	}

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinParsePathstring = __webpack_require__(40);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	var _bernsteinPathIsEqual = __webpack_require__(48);

	var _bernsteinPathIsEqual2 = _interopRequireDefault(_bernsteinPathIsEqual);

	var _bernsteinSimplifyPath = __webpack_require__(84);

	var _bernsteinSimplifyPath2 = _interopRequireDefault(_bernsteinSimplifyPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("simplify-path", function () {
	  it("should simplify the path and delete points with a distance greater than the given tolerance", function () {
	    var path = (0, _bernsteinParsePathstring2.default)("M0 0 L50 0 L100 5");
	    var test = (0, _bernsteinSimplifyPath2.default)(path, 5);
	    var expected = "M0 0 L100 5";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });

	  it("shouldn't simplify the path because the tolerance is too short", function () {
	    var path = (0, _bernsteinParsePathstring2.default)("M0 0 L50 0 L100 5");
	    var test = (0, _bernsteinSimplifyPath2.default)(path, 1);
	    var expected = "M0 0 L50 0 L100 5";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });
	});

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = simplify;

	var _bernsteinPointDistance = __webpack_require__(46);

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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinParsePathstring = __webpack_require__(40);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	var _bernsteinBuildPathstring = __webpack_require__(47);

	var _bernsteinBuildPathstring2 = _interopRequireDefault(_bernsteinBuildPathstring);

	var _bernsteinPathIsEqual = __webpack_require__(48);

	var _bernsteinPathIsEqual2 = _interopRequireDefault(_bernsteinPathIsEqual);

	var _bernsteinSkewPath = __webpack_require__(86);

	var _bernsteinSkewPath2 = _interopRequireDefault(_bernsteinSkewPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("skew-path", function () {
	  var path = (0, _bernsteinParsePathstring2.default)("M0 0L100 0L100 100");

	  it("should skew the path of PI/6 on x and y", function () {
	    var test = (0, _bernsteinBuildPathstring2.default)((0, _bernsteinSkewPath2.default)(path, Math.PI / 6, Math.PI / 6));
	    var expected = "M0 0L100 57.735L157.735 157.735";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });

	  it("should skew the path of PI/6 on x", function () {
	    var test = (0, _bernsteinBuildPathstring2.default)((0, _bernsteinSkewPath2.default)(path, Math.PI / 6, 0));
	    var expected = "M0 0L100 0L157.735 100";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });

	  it("should skew the path of PI/6 on y", function () {
	    var test = (0, _bernsteinBuildPathstring2.default)((0, _bernsteinSkewPath2.default)(path, 0, Math.PI / 6));
	    var expected = "M0 0L100 57.735L100 157.735";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });
	});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = skew;

	var _bernsteinMatrixPath = __webpack_require__(66);

	var _bernsteinMatrixPath2 = _interopRequireDefault(_bernsteinMatrixPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function skew(path, thetaX, thetaY) {
	  return (0, _bernsteinMatrixPath2.default)(path, [1, Math.tan(thetaX), 0, Math.tan(thetaY), 1, 0, 0, 0, 1]);
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinParsePathstring = __webpack_require__(40);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	var _bernsteinPathIsEqual = __webpack_require__(48);

	var _bernsteinPathIsEqual2 = _interopRequireDefault(_bernsteinPathIsEqual);

	var _bernsteinSplitPath = __webpack_require__(88);

	var _bernsteinSplitPath2 = _interopRequireDefault(_bernsteinSplitPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("split-path", function () {
	  it("should split the path in three subpaths", function () {
	    var path = (0, _bernsteinParsePathstring2.default)("M0 0L100 0L100 100zM100 100L200 100L200 200zM200 200L300 200L300 300");
	    var test = (0, _bernsteinSplitPath2.default)(path, "z");

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test[0], "M0 0L100 0L100 100"));
	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test[1], "M100 100L200 100L200 200"));
	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test[2], "M200 200L300 200L300 300"));
	  });
	});

/***/ },
/* 88 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = split;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function split(path, codes) {
	  var shouldKeep = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	  if (!Array.isArray(codes)) {
	    codes = [codes];
	  }

	  return path.reduce(function (acc, point, i) {
	    if (codes.indexOf(point.code) >= 0) {
	      return [].concat(_toConsumableArray(acc), [shouldKeep ? [point] : []]);
	    } else if (i === 0) {
	      return [].concat(_toConsumableArray(acc), [[point]]);
	    }

	    acc[acc.length - 1].push(point);

	    return acc;
	  }, []);
	}

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinParsePathstring = __webpack_require__(40);

	var _bernsteinParsePathstring2 = _interopRequireDefault(_bernsteinParsePathstring);

	var _bernsteinPathIsEqual = __webpack_require__(48);

	var _bernsteinPathIsEqual2 = _interopRequireDefault(_bernsteinPathIsEqual);

	var _bernsteinTranslatePath = __webpack_require__(90);

	var _bernsteinTranslatePath2 = _interopRequireDefault(_bernsteinTranslatePath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe("translate-path", function () {
	  var path = (0, _bernsteinParsePathstring2.default)("M0 0L100 0Q150 150 200 200");

	  it("should translate the path of 100px on x and y", function () {
	    var test = (0, _bernsteinTranslatePath2.default)(path, 100, 100);
	    var expected = "M100 100L200 100Q250 250 300 300";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });

	  it("should translate the path of 100px on x", function () {
	    var test = (0, _bernsteinTranslatePath2.default)(path, 100, 0);
	    var expected = "M100 0L200 0Q250 150 300 200";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });

	  it("should translate the path of 100px on y", function () {
	    var test = (0, _bernsteinTranslatePath2.default)(path, 0, 100);
	    var expected = "M0 100L100 100Q150 250 200 300";

	    _chai.assert.isTrue((0, _bernsteinPathIsEqual2.default)(test, expected));
	  });
	});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = translate;

	var _bernsteinMatrixPath = __webpack_require__(66);

	var _bernsteinMatrixPath2 = _interopRequireDefault(_bernsteinMatrixPath);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function translate(path, dx, dy) {
	  return (0, _bernsteinMatrixPath2.default)(path, [1, 0, dx, 0, 1, dy, 0, 0, 1]);
	}

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _chai = __webpack_require__(3);

	var _bernsteinPoint = __webpack_require__(41);

	var points = _interopRequireWildcard(_bernsteinPoint);

	var _bernsteinUnionPaths = __webpack_require__(92);

	var _bernsteinUnionPaths2 = _interopRequireDefault(_bernsteinUnionPaths);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	describe.skip("union-paths", function () {});

/***/ },
/* 92 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = union;
	function union(s, c) {}

/***/ }
/******/ ]);