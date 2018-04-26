// @flow

import { segsDispatcher } from "./segs.dispatcher";

import { absDispatcher } from "./abs.dispatcher";
import { relDispatcher } from "./rel.dispatcher";
import { divideDispatcher } from "./divide.dispatcher";
import { lengthDispatcher } from "./length.dispatcher";

import {
  convertLinetoDispatcher,
  convertQuadraticCurvetoDispatcher,
  convertCubicCurvetoDispatcher,
  convertArcDispatcher,
} from "./convert.dispatcher";

import {
  transformDispatcher,
  matrixDispatcher,
  translateDispatcher,
  scaleDispatcher,
  rotateDispatcher,
  skewXDispatcher,
  skewYDispatcher,
} from "./transform.dispatcher";

export {
  segsDispatcher,
  absDispatcher,
  relDispatcher,
  divideDispatcher,
  lengthDispatcher,
  convertLinetoDispatcher,
  convertQuadraticCurvetoDispatcher,
  convertCubicCurvetoDispatcher,
  convertArcDispatcher,
  transformDispatcher,
  matrixDispatcher,
  translateDispatcher,
  scaleDispatcher,
  rotateDispatcher,
  skewXDispatcher,
  skewYDispatcher,
};
