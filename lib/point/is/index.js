"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = is;
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

var _types = require("point/points/types");

var types = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function is(point, code) {
  return point.code.toLowerCase() === code.toLowerCase();
}

function isM(point) {
  return is(point, types.M);
}

function isL(point) {
  return is(point, types.L);
}

function isH(point) {
  return is(point, types.H);
}

function isV(point) {
  return is(point, types.V);
}

function isQ(point) {
  return is(point, types.Q);
}

function isT(point) {
  return is(point, types.T);
}

function isC(point) {
  return is(point, types.C);
}

function isS(point) {
  return is(point, types.S);
}

function isA(point) {
  return is(point, types.A);
}

function isZ(point) {
  return is(point, types.Z);
}