// @flow

import { M, L, Q, C, A } from "../core/_factories";
import { isRel, is } from "../core/_params";

import {
  PI,
  cos,
  sin,
  sqrt,
  abs,
  round,
  createVec,
  angle,
  isCollinear,
  endpoint2center,
  center2endpoint,
  points2conic,
  conic2center,
  linearCurve,
  quadraticCurve,
  cubicCurve,
  ellipticalCurve,
  lineLineIntersection,
  rad2deg,
} from "../core/_maths";

import { dispatcher } from "../dispatcher";

function approximateQuadraticWithLines(
  seg,
  { x0, y0, x1, y1, x3, y3 },
  list,
  threshold,
) {
  // Special case: the curve is a point or a straight line
  if (isCollinear(x0, y0, x1, y1, x3, y3)) {
    return list.push(L(isRel(seg), x0, y0, x3, y3));
  }

  const [mqx, mqy] = quadraticCurve(x0, y0, x1, y1, x3, y3, 0.5),
    [mlx, mly] = linearCurve(x0, y0, x3, y3, 0.5);

  if (mqx !== mlx || mqy !== mly) {
    const d = sqrt((mqx - mlx) ** 2 + (mqy - mly) ** 2);

    // If the distance is lesser than the given tolerance, the linear curve
    // is precise enough to approximate the quadratic curve
    if (d <= threshold) {
      return list.push(L(isRel(seg), x0, y0, x3, y3));
    }
  }

  const [ax1, ay1] = linearCurve(x0, y0, x1, y1, 0.5),
    [ax3, ay3] = quadraticCurve(x0, y0, x1, y1, x3, y3, 0.5),
    [bx1, by1] = linearCurve(x1, y1, x3, y3, 0.5);

  const p0 = { x0, y0, x1: ax1, y1: ay1, x3: ax3, y3: ay3 };
  const p1 = { x0: ax3, y0: ay3, x1: bx1, y1: by1, x3, y3 };

  approximateQuadraticWithLines(seg, p0, list, threshold);
  approximateQuadraticWithLines(seg, p1, list, threshold);
}

function approximateCubicWithLines(
  seg,
  { x0, y0, x1, y1, x2, y2, x3, y3 },
  list,
  threshold,
) {
  // Special case: the curve is a point or a straight line
  if (
    isCollinear(x0, y0, x1, y1, x2, y2) &&
    isCollinear(x1, y1, x2, y2, x3, y3)
  ) {
    return list.push(L(isRel(seg), x0, y0, x3, y3));
  }

  const [mcx, mcy] = cubicCurve(x0, y0, x1, y1, x2, y2, x3, y3, 0.5),
    [mlx, mly] = linearCurve(x0, y0, x3, y3, 0.5);

  if (mcx !== mlx || mcy !== mly) {
    const d = sqrt((mcx - mlx) ** 2 + (mcy - mly) ** 2);

    // If the distance is lesser than the given tolerance, the linear curve
    // is precise enough to approximate the cubic curve
    if (d <= threshold) {
      return list.push(L(isRel(seg), x0, y0, x3, y3));
    }
  }

  const [ax1, ay1] = linearCurve(x0, y0, x1, y1, 0.5),
    [ax2, ay2] = quadraticCurve(x0, y0, x1, y1, x2, y2, 0.5),
    [ax3, ay3] = cubicCurve(x0, y0, x1, y1, x2, y2, x3, y3, 0.5),
    [bx1, by1] = quadraticCurve(x1, y1, x2, y2, x3, y3, 0.5),
    [bx2, by2] = linearCurve(x2, y2, x3, y3, 0.5);

  const p0 = { x0, y0, x1: ax1, y1: ay1, x2: ax2, y2: ay2, x3: ax3, y3: ay3 };
  const p1 = { x0: ax3, y0: ay3, x1: bx1, y1: by1, x2: bx2, y2: by2, x3, y3 };

  approximateCubicWithLines(seg, p0, list, threshold);
  approximateCubicWithLines(seg, p1, list, threshold);
}

function approximateArcWithLines(
  seg,
  { x0, y0, rx, ry, rad, large, sweep, x3, y3 },
  list,
  threshold,
) {
  // Special case: the arc is a point or a straight line
  if ((x0 === x3 && y0 === y3) || rx === 0 || ry === 0) {
    return list.push(L(isRel(seg), x0, y0, x3, y3));
  }

  const c = endpoint2center(x0, y0, rx, ry, rad, large, sweep, x3, y3);

  const [max, may] = ellipticalCurve(
      c.cx,
      c.cy,
      c.rx,
      c.ry,
      c.phi,
      c.theta,
      c.delta,
      0.5,
    ),
    [mlx, mly] = linearCurve(x0, y0, x3, y3, 0.5);

  if (max !== mlx || may !== mly) {
    const d = sqrt((max - mlx) ** 2 + (may - mly) ** 2);

    // If the distance is lesser than the given tolerance, the linear curve
    // is precise enough to approximate the arc
    if (d <= threshold) {
      return list.push(L(isRel(seg), x0, y0, x3, y3));
    }
  }

  // Step 3: if there is no intersection or the distance between the curve and
  // the arc is greater than the given tolerance, split the arc in two and
  // restart from Step 1 for each subarc
  const e0 = center2endpoint(
      c.cx,
      c.cy,
      c.rx,
      c.ry,
      c.phi,
      c.theta,
      c.delta / 2,
    ),
    e1 = center2endpoint(
      c.cx,
      c.cy,
      c.rx,
      c.ry,
      c.phi,
      c.theta + c.delta / 2,
      c.delta / 2,
    );

  const p0 = {
      x0: e0.x0,
      y0: e0.y0,
      x3: e0.x1,
      y3: e0.y1,
      large: e0.large,
      sweep: e0.sweep,
      rx: e0.rx,
      ry: e0.ry,
      rad: e0.phi,
    },
    p1 = {
      x0: e1.x0,
      y0: e1.y0,
      x3: e1.x1,
      y3: e1.y1,
      large: e1.large,
      sweep: e1.sweep,
      rx: e1.rx,
      ry: e1.ry,
      rad: e1.phi,
    };

  approximateArcWithLines(seg, p0, list, threshold);
  approximateArcWithLines(seg, p1, list, threshold);
}

/**
 * Approximate a cubic curve with quadratice curves using the midpoint method
 */
function approximateCubicWithQuadratics(
  seg,
  { x0, y0, x1, y1, x2, y2, x3, y3 },
  list,
  threshold,
) {
  // Special case: the curve is a point or a straight line
  if (
    isCollinear(x0, y0, x1, y1, x2, y2) &&
    isCollinear(x1, y1, x2, y2, x3, y3)
  ) {
    const x1 = x0 + (x3 - x0) / 2,
      y1 = y0 + (y3 - y0) / 2;

    return list.push(Q(isRel(seg), x0, y0, x1, y1, x3, y3));
  }

  // Step 1: look for the intersection of the lines P0-P1 and P2-P3
  const inter = lineLineIntersection(x0, y0, x1, y1, x2, y2, x3, y3);

  // Step 2: build the quadratic curve whose control point stands at the
  // intersection point if it exists, and compute the distance between this
  // curve and the cubic one
  if (inter) {
    const [x, y] = inter;
    const [mcx, mcy] = cubicCurve(x0, y0, x1, y1, x2, y2, x3, y3, 0.5),
      [mqx, mqy] = quadraticCurve(x0, y0, x, y, x3, y3, 0.5);

    // If the distance is lesser than the given tolerance, the quadratic curve
    // is precise enough to approximate the cubic curve
    if (sqrt((mcx - mqx) ** 2 + (mcy - mqy) ** 2) <= threshold) {
      return list.push(Q(isRel(seg), x0, y0, x, y, x3, y3));
    }
  }

  // Step 3: if there is no intersection or the distance between the curves
  // is greater than the given tolerance, split the cubic curve in two and
  // restart from Step 1 for each subcurve
  const [ax1, ay1] = linearCurve(x0, y0, x1, y1, 0.5),
    [ax2, ay2] = quadraticCurve(x0, y0, x1, y1, x2, y2, 0.5),
    [ax3, ay3] = cubicCurve(x0, y0, x1, y1, x2, y2, x3, y3, 0.5),
    [bx1, by1] = quadraticCurve(x1, y1, x2, y2, x3, y3, 0.5),
    [bx2, by2] = linearCurve(x2, y2, x3, y3, 0.5);

  const p0 = { x0, y0, x1: ax1, y1: ay1, x2: ax2, y2: ay2, x3: ax3, y3: ay3 };
  const p1 = { x0: ax3, y0: ay3, x1: bx1, y1: by1, x2: bx2, y2: by2, x3, y3 };

  approximateCubicWithQuadratics(seg, p0, list, threshold);
  approximateCubicWithQuadratics(seg, p1, list, threshold);
}

/**
 * Approximate an arc with quadratice curves using the midpoint method
 */
function approximateArcWithQuadratics(
  seg,
  { x0, y0, rx, ry, rad, large, sweep, x3, y3 },
  list,
  threshold,
) {
  // Special case: the arc is a point or a straight line
  if ((x0 === x3 && y0 === y3) || rx === 0 || ry === 0) {
    const x1 = x0 + (x3 - x0) / 2,
      y1 = y0 + (y3 - y0) / 2;

    return list.push(Q(isRel(seg), x0, y0, x1, y1, x3, y3));
  }

  const c = endpoint2center(x0, y0, rx, ry, rad, large, sweep, x3, y3);

  // If the angle between t0 and t1 is greater than PI, then a single quadratic
  // curve can not properly approximate an arc alone, so it's useless to try to
  // compute the intersection point of the tangents
  if (abs(c.delta) < PI) {
    // Step 1: compute the slopes of the two tangents
    const m0 =
      (c.rx * sin(c.phi) * sin(c.theta) - c.ry * cos(c.phi) * cos(c.theta)) /
      round(
        c.rx * cos(c.phi) * sin(c.theta) + c.ry * sin(c.phi) * cos(c.theta),
      );
    const m1 =
      (c.rx * sin(c.phi) * sin(c.theta + c.delta) -
        c.ry * cos(c.phi) * cos(c.theta + c.delta)) /
      round(
        c.rx * cos(c.phi) * sin(c.theta + c.delta) +
          c.ry * sin(c.phi) * cos(c.theta + c.delta),
      );

    // Step 2: build the quadratic curve whose control point stands at the
    // intersection point if it exists, and compute the distance between this
    // curve and the arc; if one of the slopes is infinite, it means that the
    // tangent is vertical, therefore x = x0 or x = x3
    const x =
        abs(m0) === Infinity
          ? x0
          : abs(m1) === Infinity
            ? x3
            : (y0 - y3 + m1 * x3 - m0 * x0) / (m1 - m0),
      y = abs(m0) === Infinity ? y3 + m1 * (x - x3) : y0 + m0 * (x - x0);

    const [max, may] = ellipticalCurve(
        c.cx,
        c.cy,
        c.rx,
        c.ry,
        c.phi,
        c.theta,
        c.delta,
        0.5,
      ),
      [mqx, mqy] = quadraticCurve(x0, y0, x, y, x3, y3, 0.5);

    if (sqrt((max - mqx) ** 2 + (may - mqy) ** 2) <= threshold) {
      return list.push(Q(isRel(seg), x0, y0, x, y, x3, y3));
    }
  }

  // Step 3: if there is no intersection or the distance between the curve and
  // the arc is greater than the given tolerance, split the arc in two and
  // restart from Step 1 for each subarc
  const e0 = center2endpoint(
      c.cx,
      c.cy,
      c.rx,
      c.ry,
      c.phi,
      c.theta,
      c.delta / 2,
    ),
    e1 = center2endpoint(
      c.cx,
      c.cy,
      c.rx,
      c.ry,
      c.phi,
      c.theta + c.delta / 2,
      c.delta / 2,
    );

  const p0 = {
      x0: e0.x0,
      y0: e0.y0,
      x3: e0.x1,
      y3: e0.y1,
      large: e0.large,
      sweep: e0.sweep,
      rx: e0.rx,
      ry: e0.ry,
      rad: e0.phi,
    },
    p1 = {
      x0: e1.x0,
      y0: e1.y0,
      x3: e1.x1,
      y3: e1.y1,
      large: e1.large,
      sweep: e1.sweep,
      rx: e1.rx,
      ry: e1.ry,
      rad: e1.phi,
    };

  approximateArcWithQuadratics(seg, p0, list, threshold);
  approximateArcWithQuadratics(seg, p1, list, threshold);
}

/**
 * Approximate an arc with quadratice curves using the midpoint method
 */
function approximateArcWithCubics(
  seg,
  { x0, y0, rx, ry, rad, large, sweep, x3, y3 },
  list,
  threshold,
) {
  // Special case: the arc is a point or a straight line
  if ((x0 === x3 && y0 === y3) || rx === 0 || ry === 0) {
    const x1 = x0 + (x3 - x0) * 1 / 3,
      y1 = y0 + (y3 - y0) * 1 / 3;

    const x2 = x0 + (x3 - x0) * 2 / 3,
      y2 = y0 + (y3 - y0) * 2 / 3;

    return list.push(C(isRel(seg), x0, y0, x1, y1, x2, y2, x3, y3));
  }

  const c = endpoint2center(x0, y0, rx, ry, rad, large, sweep, x3, y3);

  if (abs(c.delta) < PI) {
    const [ax0, ay0] = ellipticalCurve(
        c.cx,
        c.cy,
        c.rx,
        c.ry,
        c.phi,
        c.theta,
        c.delta,
        1 / 3,
      ),
      [ax1, ay1] = ellipticalCurve(
        c.cx,
        c.cy,
        c.rx,
        c.ry,
        c.phi,
        c.theta,
        c.delta,
        2 / 3,
      );

    const m0 =
        (c.rx * sin(c.phi) * sin(c.theta) - c.ry * cos(c.phi) * cos(c.theta)) /
        round(
          c.rx * cos(c.phi) * sin(c.theta) + c.ry * sin(c.phi) * cos(c.theta),
        ),
      n0 = (ay0 - c.cy) / (ax0 - c.cx);

    const m1 =
        (c.rx * sin(c.phi) * sin(c.theta + c.delta) -
          c.ry * cos(c.phi) * cos(c.theta + c.delta)) /
        round(
          c.rx * cos(c.phi) * sin(c.theta + c.delta) +
            c.ry * sin(c.phi) * cos(c.theta + c.delta),
        ),
      n1 = (ay1 - c.cy) / (ax1 - c.cx);

    const x1 =
        abs(m0) === Infinity
          ? x0
          : abs(n0) === Infinity
            ? c.cx
            : (y0 - c.cy + n0 * c.cx - m0 * x0) / (n0 - m0),
      y1 = abs(m0) === Infinity ? c.cy + n0 * (x1 - c.cx) : y0 + m0 * (x1 - x0);

    const x2 =
        abs(m1) === Infinity
          ? x3
          : abs(n1) === Infinity
            ? c.cx
            : (y3 - c.cy + n1 * c.cx - m1 * x3) / (n1 - m1),
      y2 = abs(m1) === Infinity ? c.cy + n1 * (x2 - c.cx) : y3 + m1 * (x2 - x3);

    const [max, may] = ellipticalCurve(
        c.cx,
        c.cy,
        c.rx,
        c.ry,
        c.phi,
        c.theta,
        c.delta,
        0.5,
      ),
      [mcx, mcy] = cubicCurve(x0, y0, x1, y1, x2, y2, x3, y3, 0.5);

    if (sqrt((max - mcx) ** 2 + (may - mcy) ** 2) <= threshold) {
      return list.push(C(isRel(seg), x0, y0, x1, y1, x2, y2, x3, y3));
    }
  }

  // Step 3: if there is no intersection or the distance between the curve and
  // the arc is greater than the given tolerance, split the arc in two and
  // restart from Step 1 for each subarc
  const e0 = center2endpoint(
      c.cx,
      c.cy,
      c.rx,
      c.ry,
      c.phi,
      c.theta,
      c.delta / 2,
    ),
    e1 = center2endpoint(
      c.cx,
      c.cy,
      c.rx,
      c.ry,
      c.phi,
      c.theta + c.delta / 2,
      c.delta / 2,
    );

  const p0 = {
      x0: e0.x0,
      y0: e0.y0,
      x3: e0.x1,
      y3: e0.y1,
      large: e0.large,
      sweep: e0.sweep,
      rx: e0.rx,
      ry: e0.ry,
      rad: e0.phi,
    },
    p1 = {
      x0: e1.x0,
      y0: e1.y0,
      x3: e1.x1,
      y3: e1.y1,
      large: e1.large,
      sweep: e1.sweep,
      rx: e1.rx,
      ry: e1.ry,
      rad: e1.phi,
    };

  approximateArcWithCubics(seg, p0, list, threshold);
  approximateArcWithCubics(seg, p1, list, threshold);
}

function approximateQuadraticWithArcs(
  seg,
  { x0, y0, x1, y1, x3, y3 },
  list,
  threshold,
) {
  const [p1x, p1y] = linearCurve(x0, y0, x1, y1, 1 / 10),
    [p2x, p2y] = quadraticCurve(x0, y0, x1, y1, x3, y3, 1 / 2),
    [p3x, p3y] = linearCurve(x1, y1, x3, y3, 1 - 1 / 10);

  const s = points2conic(x0, y0, p1x, p1y, p2x, p2y, p3x, p3y, x3, y3);

  if (s) {
    const c = conic2center(x0, y0, ...s.coefficients, x3, y3);

    if (c) {
      const { rx, ry, phi, large, sweep } = center2endpoint(
        c.cx,
        c.cy,
        c.rx,
        c.ry,
        rad2deg(c.phi),
        c.theta,
        c.delta,
      );

      return list.push(
        A(isRel(seg), x0, y0, rx, ry, phi, large, sweep, x3, y3),
      );
    }
  }
}

function approximateCubicWithArcs(
  seg,
  { x0, y0, x1, y1, x2, y2, x3, y3 },
  list,
  threshold,
) {
  const [p1x, p1y] = linearCurve(x0, y0, x1, y1, 1 / 3),
    [p2x, p2y] = cubicCurve(x0, y0, x1, y1, x2, y2, x3, y3, 1 / 2),
    [p3x, p3y] = linearCurve(x2, y2, x3, y3, 1 - 1 / 3);

  const s = points2conic(x0, y0, p1x, p1y, p2x, p2y, p3x, p3y, x3, y3);

  console.log(s);

  if (s) {
    const c = conic2center(x0, y0, ...s.coefficients, x3, y3);

    console.log(c);

    if (c) {
      const { rx, ry, phi, large, sweep } = center2endpoint(
        c.cx,
        c.cy,
        c.rx,
        c.ry,
        rad2deg(c.phi),
        c.theta,
        c.delta,
      );

      return list.push(
        A(isRel(seg), x0, y0, rx, ry, phi, large, sweep, x3, y3),
      );
    }
  }

  const [ax1, ay1] = linearCurve(x0, y0, x1, y1, 0.5),
    [ax2, ay2] = quadraticCurve(x0, y0, x1, y1, x2, y2, 0.5),
    [ax3, ay3] = cubicCurve(x0, y0, x1, y1, x2, y2, x3, y3, 0.5),
    [bx1, by1] = quadraticCurve(x1, y1, x2, y2, x3, y3, 0.5),
    [bx2, by2] = linearCurve(x2, y2, x3, y3, 0.5);

  const p0 = { x0, y0, x1: ax1, y1: ay1, x2: ax2, y2: ay2, x3: ax3, y3: ay3 };
  const p1 = { x0: ax3, y0: ay3, x1: bx1, y1: by1, x2: bx2, y2: by2, x3, y3 };

  approximateCubicWithArcs(seg, p0, list, threshold);
  approximateCubicWithArcs(seg, p1, list, threshold);
}

export const convertLinetoDispatcher = dispatcher(
  {
    fallback: (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
    ) => (acc.push(seg), acc),
    predicate: (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      threshold: number,
      indices: number[],
    ) => indices.length === 0 || indices.includes(index),
  },
  [
    (seg: Seg) => is("h", seg, true) || is("v", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x3, y3 }: AbsParams,
      acc: SegList,
    ) => (acc.push(L(isRel(seg), x0, y0, x3, y3)), acc),
  ],
  [
    (seg: Seg) => is("q", seg, true) || is("t", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      threshold: number,
    ) => (approximateQuadraticWithLines(seg, params, acc, threshold), acc),
  ],
  [
    (seg: Seg) => is("c", seg, true) || is("s", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      threshold: number,
    ) => (approximateCubicWithLines(seg, params, acc, threshold), acc),
  ],
  [
    (seg: Seg) => is("a", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      threshold: number,
    ) => (approximateArcWithLines(seg, params, acc, threshold), acc),
  ],
);

export const convertQuadraticCurvetoDispatcher = dispatcher(
  {
    fallback: (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
    ) => (acc.push(seg), acc),
    predicate: (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      threshold: number,
      indices: number[],
    ) => indices.length === 0 || indices.includes(index),
  },
  [
    (seg: Seg) =>
      is("l", seg, true) || is("h", seg, true) || is("v", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x3, y3 }: AbsParams,
      acc: SegList,
    ) => (
      acc.push(
        Q(
          isRel(seg),
          x0,
          y0,
          x0 + (x3 - x0) * 1 / 2,
          y0 + (y3 - y0) * 1 / 2,
          x3,
          y3,
        ),
      ),
      acc
    ),
  ],
  [
    (seg: Seg) => is("t", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x1, y1, x3, y3 }: AbsParams,
      acc: SegList,
    ) => (acc.push(Q(isRel(seg), x0, y0, x1, y1, x3, y3)), acc),
  ],
  [
    (seg: Seg) => is("c", seg, true) || is("s", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      threshold: number,
    ) => (approximateCubicWithQuadratics(seg, params, acc, threshold), acc),
  ],
  [
    (seg: Seg) => is("a", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      threshold: number,
    ) => (approximateArcWithQuadratics(seg, params, acc, threshold), acc),
  ],
);

export const convertCubicCurvetoDispatcher = dispatcher(
  {
    fallback: (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
    ) => (acc.push(seg), acc),
    predicate: (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      threshold: number,
      indices: number[],
    ) => indices.length === 0 || indices.includes(index),
  },
  [
    (seg: Seg) =>
      is("l", seg, true) || is("h", seg, true) || is("v", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x3, y3 }: AbsParams,
      acc: SegList,
    ) => (
      acc.push(
        C(
          isRel(seg),
          x0,
          y0,
          x0 + (x3 - x0) * 1 / 3,
          y0 + (y3 - y0) * 1 / 3,
          x0 + (x3 - x0) * 2 / 3,
          y0 + (y3 - y0) * 2 / 3,
          x3,
          y3,
        ),
      ),
      acc
    ),
  ],
  [
    (seg: Seg) => is("q", seg, true) || is("t", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x1, y1, x3, y3 }: AbsParams,
      acc: SegList,
    ) => (
      acc.push(
        C(
          isRel(seg),
          x0,
          y0,
          1 / 3 * x0 + 2 / 3 * x1,
          1 / 3 * y0 + 2 / 3 * y1,
          1 / 3 * x3 + 2 / 3 * x1,
          1 / 3 * y3 + 2 / 3 * y1,
          x3,
          y3,
        ),
      ),
      acc
    ),
  ],
  [
    (seg: Seg) => is("s", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x1, y1, x2, y2, x3, y3 }: AbsParams,
      acc: SegList,
    ) => (acc.push(C(isRel(seg), x0, y0, x1, y1, x2, y2, x3, y3)), acc),
  ],
  [
    (seg: Seg) => is("a", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      threshold: number,
    ) => (approximateArcWithCubics(seg, params, acc, threshold), acc),
  ],
);

export const convertArcDispatcher = dispatcher(
  {
    fallback: (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
    ) => (acc.push(seg), acc),
    predicate: (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      threshold: number,
      indices: number[],
    ) => indices.length === 0 || indices.includes(index),
  },
  [
    (seg: Seg) =>
      is("l", seg, true) || is("h", seg, true) || is("v", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      { x0, y0, x3, y3 }: AbsParams,
      acc: SegList,
    ) => (acc.push(A(isRel(seg), x0, y0, 0, 0, 0, 0, 0, x3, y3)), acc),
  ],
  [
    (seg: Seg) => is("q", seg, true) || is("t", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      threshold: number,
    ) => (approximateQuadraticWithArcs(seg, params, acc, threshold), acc),
  ],
  [
    (seg: Seg) => is("c", seg, true) || is("s", seg, true),
    (
      seg: Seg,
      index: number,
      segs: SegList,
      params: AbsParams,
      acc: SegList,
      threshold: number,
    ) => (approximateCubicWithArcs(seg, params, acc, threshold), acc),
  ],
);
