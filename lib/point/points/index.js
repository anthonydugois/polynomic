"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultPoint = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Point;
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

var _types = require("point/points/types");

var types = _interopRequireWildcard(_types);

var _is = require("point/is");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function Point(code, x, y) {
  var parameters = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  return {
    code: code,
    x: x,
    y: y,
    parameters: parameters
  };
}

var defaultPoint = exports.defaultPoint = Point(null, 0, 0);

function m(dx, dy) {
  var prev = arguments.length <= 2 || arguments[2] === undefined ? defaultPoint : arguments[2];

  return Point(types.m, prev.x + dx, prev.y + dy);
}

function M(x, y) {
  return Point(types.M, x, y);
}

function l(dx, dy) {
  var prev = arguments.length <= 2 || arguments[2] === undefined ? defaultPoint : arguments[2];

  return Point(types.l, prev.x + dx, prev.y + dy);
}

function L(x, y) {
  return Point(types.L, x, y);
}

function h(dx) {
  var prev = arguments.length <= 1 || arguments[1] === undefined ? defaultPoint : arguments[1];

  return Point(types.h, prev.x + dx, prev.y);
}

function H(x) {
  var prev = arguments.length <= 1 || arguments[1] === undefined ? defaultPoint : arguments[1];

  return Point(types.H, x, prev.y);
}

function v(dy) {
  var prev = arguments.length <= 1 || arguments[1] === undefined ? defaultPoint : arguments[1];

  return Point(types.v, prev.x, prev.y + dy);
}

function V(y) {
  var prev = arguments.length <= 1 || arguments[1] === undefined ? defaultPoint : arguments[1];

  return Point(types.V, prev.x, y);
}

function q(dx1, dy1, dx, dy) {
  var prev = arguments.length <= 4 || arguments[4] === undefined ? defaultPoint : arguments[4];

  return Point(types.q, prev.x + dx, prev.y + dy, {
    x1: prev.x + dx1,
    y1: prev.y + dy1
  });
}

function Q(x1, y1, x, y) {
  return Point(types.Q, x, y, {
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

  if ((0, _is.isQ)(prev) || (0, _is.isT)(prev)) {
    parameters = {
      x1: 2 * prev.x - prev.parameters.x1,
      y1: 2 * prev.y - prev.parameters.y1
    };
  }

  return Point(types.t, prev.x + dx, prev.y + dy, parameters);
}

function T(x, y) {
  var prev = arguments.length <= 2 || arguments[2] === undefined ? defaultPoint : arguments[2];

  var parameters = {
    x1: prev.x,
    y1: prev.y
  };

  if ((0, _is.isQ)(prev) || (0, _is.isT)(prev)) {
    parameters = {
      x1: 2 * prev.x - prev.parameters.x1,
      y1: 2 * prev.y - prev.parameters.y1
    };
  }

  return Point(types.T, x, y, parameters);
}

function c(dx1, dy1, dx2, dy2, dx, dy) {
  var prev = arguments.length <= 6 || arguments[6] === undefined ? defaultPoint : arguments[6];

  return Point(types.c, prev.x + dx, prev.y + dy, {
    x1: prev.x + dx1,
    y1: prev.y + dy1,
    x2: prev.x + dx2,
    y2: prev.y + dy2
  });
}

function C(x1, y1, x2, y2, x, y) {
  return Point(types.C, x, y, {
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

  if ((0, _is.isC)(prev) || (0, _is.isS)(prev)) {
    parameters = _extends({}, parameters, {
      x1: 2 * prev.x - prev.parameters.x2,
      y1: 2 * prev.y - prev.parameters.y2
    });
  }

  return Point(types.s, prev.x + dx, prev.y + dy, parameters);
}

function S(x2, y2, x, y) {
  var prev = arguments.length <= 4 || arguments[4] === undefined ? defaultPoint : arguments[4];

  var parameters = {
    x1: prev.x,
    y1: prev.y,
    x2: x2,
    y2: y2
  };

  if ((0, _is.isC)(prev) || (0, _is.isS)(prev)) {
    parameters = _extends({}, parameters, {
      x1: 2 * prev.x - prev.parameters.x2,
      y1: 2 * prev.y - prev.parameters.y2
    });
  }

  return Point(types.S, x, y, parameters);
}

function a(rx, ry, rotation, large, sweep, dx, dy) {
  var prev = arguments.length <= 7 || arguments[7] === undefined ? defaultPoint : arguments[7];

  return Point(types.a, prev.x + dx, prev.y + dy, {
    rx: rx,
    ry: ry,
    rotation: rotation,
    large: large,
    sweep: sweep
  });
}

function A(rx, ry, rotation, large, sweep, x, y) {
  return Point(types.A, x, y, {
    rx: rx,
    ry: ry,
    rotation: rotation,
    large: large,
    sweep: sweep
  });
}

function z() {
  var related = arguments.length <= 0 || arguments[0] === undefined ? defaultPoint : arguments[0];

  return Point(types.z, related.x, related.y);
}

function Z() {
  var related = arguments.length <= 0 || arguments[0] === undefined ? defaultPoint : arguments[0];

  return Point(types.Z, related.x, related.y);
}