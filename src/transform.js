// @flow

import { getCTM, transform2mat } from "./core/_maths";

import {
  transformDispatcher,
  matrixDispatcher,
  translateDispatcher,
  scaleDispatcher,
  rotateDispatcher,
  skewXDispatcher,
  skewYDispatcher,
} from "./dispatchers/transform.dispatcher";

import { map } from "./map";

/**
 * Apply a transform on a path
 *
 * @example
 * transform([
 *   ["translate", 10, 10],
 *   ["rotate", 30],
 * ], "M0 0L100 100")
 */
export function transform(
  transforms: any[][],
  indices: number[],
  entity: SegListLike,
): SegList {
  const matrices = [];

  for (const [type, ...values] of transforms) {
    matrices.push(transform2mat(type, ...values));
  }

  return map(transformDispatcher, [getCTM(matrices), indices], entity);
}

/**
 * Apply a matrix on a path
 */
export function matrix(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
  indices: number[],
  entity: SegListLike,
): SegList {
  return map(matrixDispatcher, [a, b, c, d, e, f, indices], entity);
}

/**
 * Apply a translate on a path
 */
export function translate(
  tx: number,
  ty: number,
  indices: number[],
  entity: SegListLike,
): SegList {
  return map(translateDispatcher, [tx, ty, indices], entity);
}

/**
 * Apply a scale on a path
 */
export function scale(
  sx: number,
  sy: number,
  indices: number[],
  entity: SegListLike,
): SegList {
  return map(scaleDispatcher, [sx, sy, indices], entity);
}

/**
 * Apply a rotate on a path
 */
export function rotate(
  a: number,
  cx: number,
  cy: number,
  indices: number[],
  entity: SegListLike,
): SegList {
  return map(rotateDispatcher, [a, cx, cy, indices], entity);
}

/**
 * Apply a skewX on a path
 */
export function skewX(
  a: number,
  indices: number[],
  entity: SegListLike,
): SegList {
  return map(skewXDispatcher, [a, indices], entity);
}

/**
 * Apply a skewY on a path
 */
export function skewY(
  a: number,
  indices: number[],
  entity: SegListLike,
): SegList {
  return map(skewYDispatcher, [a, indices], entity);
}
