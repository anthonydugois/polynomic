// @flow

export const {
  PI,
  cos,
  sin,
  tan,
  acos,
  asin,
  atan,
  atan2,
  sqrt,
  abs,
  min,
  max,
} = Math;

const EPS = 10e-6;

/**
 * Create a 4 column-vector
 */
export function createVec(
  v0: number = 0,
  v1: number = v0,
  v2: number = v0,
  v3: number = v0,
): Vec {
  return [v0, v1, v2, v3];
}

/**
 * Create a 4x4 row-major order matrix
 */
export function createMat(
  m00: number = 0,
  m01: number = m00,
  m02: number = m00,
  m03: number = m00,
  m10: number = m00,
  m11: number = m00,
  m12: number = m00,
  m13: number = m00,
  m20: number = m00,
  m21: number = m00,
  m22: number = m00,
  m23: number = m00,
  m30: number = m00,
  m31: number = m00,
  m32: number = m00,
  m33: number = m00,
): Mat {
  // prettier-ignore
  return [
    m00, m01, m02, m03,
    m10, m11, m12, m13,
    m20, m21, m22, m23,
    m30, m31, m32, m33,
  ];
}

/**
 * Create a 4x4 identity matrix
 */
export function createIdMat(): Mat {
  // prettier-ignore
  return createMat(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  );
}

/**
 * Multiply two 4x4 matrices
 */
export function multMat(m: Mat, n: Mat): Mat {
  return createMat(
    m[0] * n[0] + m[1] * n[4] + m[2] * n[8] + m[3] * n[12],
    m[0] * n[1] + m[1] * n[5] + m[2] * n[9] + m[3] * n[13],
    m[0] * n[2] + m[1] * n[6] + m[2] * n[10] + m[3] * n[14],
    m[0] * n[3] + m[1] * n[7] + m[2] * n[11] + m[3] * n[15],

    m[4] * n[0] + m[5] * n[4] + m[6] * n[8] + m[7] * n[12],
    m[4] * n[1] + m[5] * n[5] + m[6] * n[9] + m[7] * n[13],
    m[4] * n[2] + m[5] * n[6] + m[6] * n[10] + m[7] * n[14],
    m[4] * n[3] + m[5] * n[7] + m[6] * n[11] + m[7] * n[15],

    m[8] * n[0] + m[9] * n[4] + m[10] * n[8] + m[11] * n[12],
    m[8] * n[1] + m[9] * n[5] + m[10] * n[9] + m[11] * n[13],
    m[8] * n[2] + m[9] * n[6] + m[10] * n[10] + m[11] * n[14],
    m[8] * n[3] + m[9] * n[7] + m[10] * n[11] + m[11] * n[15],

    m[12] * n[0] + m[13] * n[4] + m[14] * n[8] + m[15] * n[12],
    m[12] * n[1] + m[13] * n[5] + m[14] * n[9] + m[15] * n[13],
    m[12] * n[2] + m[13] * n[6] + m[14] * n[10] + m[15] * n[14],
    m[12] * n[3] + m[13] * n[7] + m[14] * n[11] + m[15] * n[15],
  );
}

/**
 * Multiply a 4x4 matrix and a 4 column-vector
 */
export function multVec(m: Mat, v: Vec): Vec {
  return createVec(
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2] + m[3] * v[3],
    m[4] * v[0] + m[5] * v[1] + m[6] * v[2] + m[7] * v[3],
    m[8] * v[0] + m[9] * v[1] + m[10] * v[2] + m[11] * v[3],
    m[12] * v[0] + m[13] * v[1] + m[14] * v[2] + m[15] * v[3],
  );
}

/**
 * Compute the determinant of a 4x4 matrix
 */
export function det(m: Mat): number {
  return (
    m[0] * m[5] * m[10] * m[15] +
    m[0] * m[6] * m[11] * m[13] +
    m[0] * m[7] * m[9] * m[14] +
    m[1] * m[4] * m[11] * m[14] +
    m[1] * m[6] * m[8] * m[15] +
    m[1] * m[7] * m[10] * m[12] +
    m[2] * m[4] * m[9] * m[15] +
    m[2] * m[5] * m[11] * m[12] +
    m[2] * m[7] * m[8] * m[13] +
    m[3] * m[4] * m[10] * m[13] +
    m[3] * m[5] * m[8] * m[14] +
    m[3] * m[6] * m[9] * m[12] -
    m[0] * m[5] * m[11] * m[14] -
    m[0] * m[6] * m[9] * m[15] -
    m[0] * m[7] * m[10] * m[13] -
    m[1] * m[4] * m[10] * m[15] -
    m[1] * m[6] * m[11] * m[12] -
    m[1] * m[7] * m[8] * m[14] -
    m[2] * m[4] * m[11] * m[13] -
    m[2] * m[5] * m[8] * m[15] -
    m[2] * m[7] * m[9] * m[12] -
    m[3] * m[4] * m[9] * m[14] -
    m[3] * m[5] * m[10] * m[12] -
    m[3] * m[6] * m[8] * m[13]
  );
}

/**
 * Inverse a 4x4 matrix
 */
export function inverse(m: Mat): Mat {
  const d = det(m);

  return d === 0
    ? createIdMat()
    : createMat(
        (m[5] * m[10] * m[15] -
          m[5] * m[14] * m[11] -
          m[6] * m[9] * m[15] +
          m[6] * m[13] * m[11] +
          m[7] * m[9] * m[14] -
          m[7] * m[13] * m[10]) /
          d,
        (-m[1] * m[10] * m[15] +
          m[1] * m[14] * m[11] +
          m[2] * m[9] * m[15] -
          m[2] * m[13] * m[11] -
          m[3] * m[9] * m[14] +
          m[3] * m[13] * m[10]) /
          d,
        (m[1] * m[6] * m[15] -
          m[1] * m[14] * m[7] -
          m[2] * m[5] * m[15] +
          m[2] * m[13] * m[7] +
          m[3] * m[5] * m[14] -
          m[3] * m[13] * m[6]) /
          d,
        (-m[1] * m[6] * m[11] +
          m[1] * m[10] * m[7] +
          m[2] * m[5] * m[11] -
          m[2] * m[9] * m[7] -
          m[3] * m[5] * m[10] +
          m[3] * m[9] * m[6]) /
          d,

        (-m[4] * m[10] * m[15] +
          m[4] * m[14] * m[11] +
          m[6] * m[8] * m[15] -
          m[6] * m[12] * m[11] -
          m[7] * m[8] * m[14] +
          m[7] * m[12] * m[10]) /
          d,
        (m[0] * m[10] * m[15] -
          m[0] * m[14] * m[11] -
          m[2] * m[8] * m[15] +
          m[2] * m[12] * m[11] +
          m[3] * m[8] * m[14] -
          m[3] * m[12] * m[10]) /
          d,
        (-m[0] * m[6] * m[15] +
          m[0] * m[14] * m[7] +
          m[2] * m[4] * m[15] -
          m[2] * m[12] * m[7] -
          m[3] * m[4] * m[14] +
          m[3] * m[12] * m[6]) /
          d,
        (m[0] * m[6] * m[11] -
          m[0] * m[10] * m[7] -
          m[2] * m[4] * m[11] +
          m[2] * m[8] * m[7] +
          m[3] * m[4] * m[10] -
          m[3] * m[8] * m[6]) /
          d,

        (m[4] * m[9] * m[15] -
          m[4] * m[13] * m[11] -
          m[5] * m[8] * m[15] +
          m[5] * m[12] * m[11] +
          m[7] * m[8] * m[13] -
          m[7] * m[12] * m[9]) /
          d,
        (-m[0] * m[9] * m[15] +
          m[0] * m[13] * m[11] +
          m[1] * m[8] * m[15] -
          m[1] * m[12] * m[11] -
          m[3] * m[8] * m[13] +
          m[3] * m[12] * m[9]) /
          d,
        (m[0] * m[5] * m[15] -
          m[0] * m[13] * m[7] -
          m[1] * m[4] * m[15] +
          m[1] * m[12] * m[7] +
          m[3] * m[4] * m[13] -
          m[3] * m[12] * m[5]) /
          d,
        (-m[0] * m[5] * m[11] +
          m[0] * m[9] * m[7] +
          m[1] * m[4] * m[11] -
          m[1] * m[8] * m[7] -
          m[3] * m[4] * m[9] +
          m[3] * m[8] * m[5]) /
          d,

        (-m[4] * m[9] * m[14] +
          m[4] * m[13] * m[10] +
          m[5] * m[8] * m[14] -
          m[5] * m[12] * m[10] -
          m[6] * m[8] * m[13] +
          m[6] * m[12] * m[9]) /
          d,
        (m[0] * m[9] * m[14] -
          m[0] * m[13] * m[10] -
          m[1] * m[8] * m[14] +
          m[1] * m[12] * m[10] +
          m[2] * m[8] * m[13] -
          m[2] * m[12] * m[9]) /
          d,
        (-m[0] * m[5] * m[14] +
          m[0] * m[13] * m[6] +
          m[1] * m[4] * m[14] -
          m[1] * m[12] * m[6] -
          m[2] * m[4] * m[13] +
          m[2] * m[12] * m[5]) /
          d,
        (m[0] * m[5] * m[10] -
          m[0] * m[9] * m[6] -
          m[1] * m[4] * m[10] +
          m[1] * m[8] * m[6] +
          m[2] * m[4] * m[9] -
          m[2] * m[8] * m[5]) /
          d,
      );
}

/**
 * Transpose a 4x4 matrix
 */
export function transpose(m: Mat): Mat {
  // prettier-ignore
  return createMat(
    m[0], m[4], m[8], m[12],
    m[1], m[5], m[9], m[13],
    m[2], m[6], m[10], m[14],
    m[3], m[7], m[11], m[15],
  );
}

/**
 * Compute the Current Transformation Matrix
 */
export function getCTM(matrices: Mat[]): Mat {
  return matrices.reduce(multMat);
}

/**
 * Get the 4x4 matrix corresponding to the given transform
 */
export function transform2mat(type: string, ...values: number[]): Mat {
  switch (type) {
    case "matrix": {
      const [a, b, c, d, e, f] = values;

      // prettier-ignore
      return createMat(
        a, c, 0, e,
        b, d, 0, f,
        0, 0, 1, 0,
        0, 0, 0, 1,
      );
    }

    case "translate": {
      const [tx, ty = 0] = values;

      // prettier-ignore
      return createMat(
        1, 0, 0, tx,
        0, 1, 0, ty,
        0, 0, 1, 0,
        0, 0, 0, 1,
      );
    }

    case "scale": {
      const [sx, sy = sx] = values;

      // prettier-ignore
      return createMat(
        sx, 0, 0, 0,
        0, sy, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
      );
    }

    case "rotate": {
      const [a, cx = 0, cy = 0] = values,
        rad = deg2rad(a),
        c = cos(rad),
        s = sin(rad);

      return cx !== 0 || cy !== 0
        ? getCTM([
            transform2mat("translate", cx, cy),
            transform2mat("rotate", a),
            transform2mat("translate", -cx, -cy),
          ])
        : // prettier-ignore
          createMat(
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
          );
    }

    case "skewX": {
      const [a] = values,
        rad = deg2rad(a),
        t = tan(rad);

      // prettier-ignore
      return createMat(
        1, t, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
      );
    }

    case "skewY": {
      const [a] = values,
        rad = deg2rad(a),
        t = tan(rad);

      // prettier-ignore
      return createMat(
        1, 0, 0, 0,
        t, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
      );
    }

    default: {
      return createIdMat();
    }
  }
}

/**
 * Compute the length of a 4 column-vector
 */
export function length(v: Vec): number {
  return sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
}

/**
 * Compute the dot-product of two 4 column-vectors
 */
export function dotProduct(u: Vec, v: Vec): number {
  return u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
}

/**
 * Compute the cross-product of two 4 column-vectors
 */
export function crossProduct(u: Vec, v: Vec): Vec {
  return createVec(
    u[1] * v[2] - u[2] * v[1],
    u[2] * v[0] - u[0] * v[2],
    u[0] * v[1] - u[1] * v[0],
    1,
  );
}

/**
 * Compute the angle between two 4 column-vectors
 */
export function angle(u: Vec, v: Vec): number {
  const sign = crossProduct(u, v)[2] < 0 ? -1 : 1,
    lu = length(u),
    lv = length(v);

  return lu === 0 || lv === 0
    ? 0
    : sign * acos(clamp(-1, 1, dotProduct(u, v) / (lu * lv)));
}

/**
 * Check if three points are forming a straight line
 */
export function isCollinear(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): boolean {
  return (y0 - y1) * (x0 - x2) === (y0 - y2) * (x0 - x1);
}

/**
 * Parametric representation of a linear curve
 */
export function linearCurve(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  t: number,
): Vec {
  return createVec((x1 - x0) * t + x0, (y1 - y0) * t + y0, 1, 1);
}

/**
 * Parametric representation of a quadratic curve
 */
export function quadraticCurve(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  t: number,
): Vec {
  return createVec(
    (x0 - 2 * x1 + x2) * t ** 2 + (-2 * x0 + 2 * x1) * t + x0,
    (y0 - 2 * y1 + y2) * t ** 2 + (-2 * y0 + 2 * y1) * t + y0,
    1,
    1,
  );
}

/**
 * Parametric representation of a cubic curve
 */
export function cubicCurve(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  t: number,
): Vec {
  return createVec(
    (-x0 + 3 * x1 - 3 * x2 + x3) * t ** 3 +
      (3 * x0 - 6 * x1 + 3 * x2) * t ** 2 +
      (-3 * x0 + 3 * x1) * t +
      x0,
    (-y0 + 3 * y1 - 3 * y2 + y3) * t ** 3 +
      (3 * y0 - 6 * y1 + 3 * y2) * t ** 2 +
      (-3 * y0 + 3 * y1) * t +
      y0,
    1,
    1,
  );
}

/**
 * Parametric representation of an elliptical curve
 */
export function ellipticalCurve(
  cx0: number,
  cy0: number,
  rx0: number,
  ry0: number,
  phi: number,
  theta0: number,
  delta: number,
  t: number,
): Vec {
  const theta1 = theta0 + t * delta;

  return createVec(
    cx0 + rx0 * cos(phi) * cos(theta1) - ry0 * sin(phi) * sin(theta1),
    cy0 + rx0 * sin(phi) * cos(theta1) + ry0 * cos(phi) * sin(theta1),
    1,
    1,
  );
}

/**
 * Compute radii to have mathematically correct solutions
 *
 * Please read:
 * https://www.w3.org/TR/SVG/implnote.html#ArcCorrectionOutOfRangeRadii
 */
export function correctOutOfRangeRadii(
  x: number,
  y: number,
  rx: number,
  ry: number,
): [number, number] {
  if (rx === 0 || ry === 0) {
    return [rx, ry];
  }

  const rx1 = abs(rx),
    ry1 = abs(ry);

  const K = x ** 2 / rx1 ** 2 + y ** 2 / ry1 ** 2,
    L = sqrt(K);

  return K <= 1 ? [rx1, ry1] : [L * rx1, L * ry1];
}

/**
 * Convert a center parameterization to an endpoint parameterization
 *
 * Please read:
 * https://www.w3.org/TR/SVG/implnote.html#ArcConversionCenterToEndpoint
 */
export function center2endpoint(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  phi: number,
  theta: number,
  delta: number,
): EndpointParameterization {
  const [x0, y0] = ellipticalCurve(cx, cy, rx, ry, phi, theta, delta, 0),
    [x1, y1] = ellipticalCurve(cx, cy, rx, ry, phi, theta, delta, 1);

  const large = abs(delta) > PI ? 1 : 0,
    sweep = delta > 0 ? 1 : 0;

  return { x0, y0, rx, ry, phi, large, sweep, x1, y1 };
}

/**
 * Convert an endpoint parameterization to a center parameterization
 *
 * Please read:
 * https://www.w3.org/TR/SVG/implnote.html#ArcConversionEndpointToCenter
 */
export function endpoint2center(
  x0: number,
  y0: number,
  rx: number,
  ry: number,
  phi: number,
  large: number,
  sweep: number,
  x1: number,
  y1: number,
): CenterParameterization {
  // Special case: the arc is a point or a straight line
  if (rx === 0 || ry === 0 || (x0 === x1 && y0 === y1)) {
    const cx = x0 + (x1 - x0) / 2,
      cy = y0 + (y1 - y0) / 2,
      theta =
        PI + angle(createVec(1, 0, 0, 0), createVec(x1 - cx, y1 - cy, 0, 0)),
      delta = PI;

    return { cx, cy, rx, ry, phi, theta, delta };
  }

  // Step 1: place the origin at the midpoint of the line joining the coords
  // and cancel the rotation to simplify next equations
  const mx = (x0 - x1) / 2,
    my = (y0 - y1) / 2;

  const x2 = cos(phi) * mx + sin(phi) * my,
    y2 = -sin(phi) * mx + cos(phi) * my;

  const [rx1, ry1] = correctOutOfRangeRadii(x2, y2, rx, ry);

  // Step 2: compute the center of the ellipse
  const sign = (large !== 0) === (sweep !== 0) ? -1 : 1;

  const K =
      (rx1 ** 2 * ry1 ** 2 - rx1 ** 2 * y2 ** 2 - ry1 ** 2 * x2 ** 2) /
      (rx1 ** 2 * y2 ** 2 + ry1 ** 2 * x2 ** 2),
    L = sqrt(clamp(0, Infinity, K));

  const cx0 = sign * L * (rx1 * y2 / ry1),
    cy0 = sign * L * (-ry1 * x2 / rx1);

  // Step 3: invert the translation and the rotation performed in Step 1
  const cx1 = cos(phi) * cx0 - sin(phi) * cy0 + (x0 + x1) / 2,
    cy1 = sin(phi) * cx0 + cos(phi) * cy0 + (y0 + y1) / 2;

  // Step 4: compute start and delta angles
  const x3 = (x2 - cx0) / rx1,
    y3 = (y2 - cy0) / ry1,
    x4 = (-x2 - cx0) / rx1,
    y4 = (-y2 - cy0) / ry1;

  const theta = angle(createVec(1, 0, 0, 0), createVec(x3, y3, 0, 0));

  const delta =
      angle(createVec(x3, y3, 0, 0), createVec(x4, y4, 0, 0)) % (2 * PI),
    delta1 =
      sweep && delta < 0
        ? delta + 2 * PI
        : !sweep && delta > 0
          ? delta - 2 * PI
          : delta;

  return {
    cx: cx1,
    cy: cy1,
    rx: rx1,
    ry: ry1,
    phi,
    theta,
    delta: delta1,
  };
}

/**
 * Apply a transform on an ellipse
 */
export function transformEllipse(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  phi: number,
  m0: Mat,
): CenterParameterization {
  // Step 1: express the ellipse as a transform matrix of the unit circle
  // prettier-ignore
  const m1 = createMat(
    rx * cos(phi), -ry * sin(phi), 0, cx,
    rx * sin(phi), ry * cos(phi), 0, cy,
    0, 0, 1, 0,
    0, 0, 0, 1,
  );

  // Step 2: apply the transform matrix to the ellipse matrix
  // prettier-ignore
  const [
    a, b, , ,
    c, d, , ,
  ] = multMat(m0, m1);

  // Step 3: compute the eigen values
  const J = a ** 2 + b ** 2,
    K = c ** 2 + d ** 2,
    L = a * c + b * d,
    D = ((a - d) ** 2 + (b + c) ** 2) * ((a + d) ** 2 + (b - c) ** 2);

  // The ellipse is a circle
  if (D <= 0) {
    const rx1 = sqrt((J + K) / 2),
      ry1 = rx1;

    return { cx, cy, rx: rx1, ry: ry1, phi: 0, theta: 0, delta: 0 };
  }

  const r0 = (J + K + sqrt(D)) / 2,
    r1 = (J + K - sqrt(D)) / 2;

  const phi1 =
    abs(L) < 0 && abs(r0 - K) < 0
      ? 90
      : abs(L) > abs(r0 - K)
        ? atan((r0 - J) / L)
        : atan(L / (r0 - K));

  if (phi1 >= 0) {
    const rx1 = sqrt(r0),
      ry1 = sqrt(r1);

    return { cx, cy, rx: rx1, ry: ry1, phi: phi1, theta: 0, delta: 0 };
  }

  const rx1 = sqrt(r1),
    ry1 = sqrt(r0),
    phi2 = phi1 + PI / 2;

  return { cx, cy, rx: rx1, ry: ry1, phi: phi2, theta: 0, delta: 0 };
}

export function points2conic(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number,
): ?ConicParameterization {
  const v0 = createVec(x0, y0, 1, 1),
    v1 = createVec(x1, y1, 1, 1),
    v2 = createVec(x2, y2, 1, 1),
    v3 = createVec(x3, y3, 1, 1),
    v4 = createVec(x4, y4, 1, 1);

  const [a1, b1, c1] = crossProduct(v1, v2),
    [a2, b2, c2] = crossProduct(v2, v3),
    [A, B, C] = crossProduct(crossProduct(v0, v1), crossProduct(v3, v4));

  const a =
    -A * a1 * a2 * y4 +
    A * a1 * a2 * y0 +
    B * a1 * b2 * y0 +
    B * a1 * c2 -
    B * b1 * a2 * y4 -
    B * c1 * a2 +
    C * b1 * a2 * y4 * y0 +
    C * c1 * a2 * y0 -
    C * a1 * b2 * y4 * y0 -
    C * a1 * c2 * y4;

  const b =
    A * c1 * a2 +
    A * a1 * a2 * x4 -
    A * a1 * b2 * y4 -
    A * a1 * c2 -
    A * a1 * a2 * x0 +
    A * b1 * a2 * y0 +
    B * b1 * a2 * x4 -
    B * b1 * b2 * y4 -
    B * c1 * b2 -
    B * a1 * b2 * x0 +
    B * b1 * b2 * y0 +
    B * b1 * c2 -
    C * b1 * c2 * y4 -
    C * b1 * a2 * x4 * y0 -
    C * b1 * a2 * y4 * x0 -
    C * c1 * a2 * x0 +
    C * c1 * b2 * y0 +
    C * a1 * b2 * x4 * y0 +
    C * a1 * b2 * y4 * x0 +
    C * a1 * c2 * x4;

  const c =
    A * c1 * b2 +
    A * a1 * b2 * x4 -
    A * b1 * c2 -
    A * b1 * a2 * x0 +
    B * b1 * b2 * x4 -
    B * b1 * b2 * x0 +
    C * b1 * c2 * x4 +
    C * b1 * a2 * x4 * x0 -
    C * c1 * b2 * x0 -
    C * a1 * b2 * x4 * x0;

  const d =
    -A * c1 * a2 * y4 +
    A * a1 * a2 * y4 * x0 +
    A * a1 * b2 * y4 * y0 +
    A * a1 * c2 * y0 -
    A * a1 * a2 * x4 * y0 -
    A * b1 * a2 * y4 * y0 +
    B * b1 * a2 * y4 * x0 +
    B * c1 * a2 * x0 +
    B * c1 * a2 * x4 +
    B * c1 * b2 * y0 -
    B * a1 * b2 * x4 * y0 -
    B * a1 * c2 * x0 -
    B * a1 * c2 * x4 -
    B * b1 * c2 * y4 +
    C * b1 * c2 * y4 * y0 +
    C * c1 * c2 * y0 -
    C * c1 * a2 * x4 * y0 -
    C * c1 * b2 * y4 * y0 -
    C * c1 * c2 * y4 +
    C * a1 * c2 * y4 * x0;

  const e =
    -A * c1 * a2 * x0 -
    A * c1 * b2 * y4 -
    A * c1 * b2 * y0 -
    A * a1 * b2 * x4 * y0 +
    A * a1 * c2 * x4 +
    A * b1 * c2 * y4 +
    A * b1 * c2 * y0 +
    A * b1 * a2 * y4 * x0 -
    B * b1 * a2 * x4 * x0 -
    B * b1 * b2 * x4 * y0 +
    B * c1 * b2 * x4 +
    B * a1 * b2 * x4 * x0 +
    B * b1 * b2 * y4 * x0 -
    B * b1 * c2 * x0 -
    C * b1 * c2 * x4 * y0 +
    C * c1 * c2 * x4 +
    C * c1 * a2 * x4 * x0 +
    C * c1 * b2 * y4 * x0 -
    C * c1 * c2 * x0 -
    C * a1 * c2 * x4 * x0;

  const f =
    A * c1 * a2 * y4 * x0 +
    A * c1 * b2 * y4 * y0 -
    A * a1 * c2 * x4 * y0 -
    A * b1 * c2 * y4 * y0 -
    B * c1 * a2 * x4 * x0 -
    B * c1 * b2 * x4 * y0 +
    B * a1 * c2 * x4 * x0 +
    B * b1 * c2 * y4 * x0 -
    C * c1 * c2 * x4 * y0 +
    C * c1 * c2 * y4 * x0;

  const coefficients =
    a !== 0
      ? [1, b / a, c / a, d / a, e / a, f / a]
      : b !== 0
        ? [a, 1, c / b, d / b, e / b, f / b]
        : c !== 0
          ? [a, b, 1, d / c, e / c, f / c]
          : d !== 0
            ? [a, b, c, 1, e / d, f / d]
            : e !== 0
              ? [a, b, c, d, 1, f / e]
              : null;

  return coefficients ? { x0, y0, coefficients, x1: x4, y1: y4 } : null;
}

export function conic2center(
  x0: number,
  y0: number,
  A: number,
  B: number,
  C: number,
  D: number,
  E: number,
  F: number,
  x1: number,
  y1: number,
): ?CenterParameterization {
  const a = A,
    b = B / 2,
    c = C,
    d = D / 2,
    e = E / 2,
    f = F;

  const dis = b ** 2 - a * c;

  const num = round(
    a * e ** 2 + c * d ** 2 + f * b ** 2 - 2 * b * d * e - a * c * f,
  );

  const den1 = dis * (sqrt((a - c) ** 2 + 4 * b ** 2) - (a + c)),
    den2 = dis * (-sqrt((a - c) ** 2 + 4 * b ** 2) - (a + c));

  if (abs(dis) <= EPS || abs(den1) <= EPS || abs(den2) <= EPS) {
    return null;
  }

  console.log(dis, num, den1, den2);

  const cx = (c * d - b * e) / dis,
    cy = (a * e - b * d) / dis;

  const rx = sqrt(2 * num / den1),
    ry = sqrt(2 * num / den2);

  const phi =
      b === 0
        ? a < c
          ? 0
          : PI / 2
        : a < c
          ? atan(2 * b / (a - c)) / 2
          : PI / 2 + atan(2 * b / (a - c)) / 2,
    theta = atan2(y0 - cy, x0 - cx) - phi,
    delta = atan2(y1 - cy, x1 - cx) - phi - theta;

  return { cx, cy, rx, ry, phi, theta, delta };
}

/**
 * Find the intersection point of two lines
 */
export function lineLineIntersection(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
): ?Vec {
  const x = (x0 * y1 - x1 * y0) * (x2 - x3) - (x2 * y3 - x3 * y2) * (x0 - x1),
    y = (x0 * y1 - x1 * y0) * (y2 - y3) - (x2 * y3 - x3 * y2) * (y0 - y1);

  const d = (x0 - x1) * (y2 - y3) - (x2 - x3) * (y0 - y1);

  if (d === 0) {
    return null;
  }

  return createVec(x / d, y / d, 1, 1);
}

export function clamp(_min: number, _max: number, value: number): number {
  return min(_max, max(_min, value));
}

export function round(n: number, x: number = 10e8): number {
  return Math.round(n * x) / x;
}

export function deg2rad(deg: number): number {
  return PI / 180 * deg;
}

export function rad2deg(rad: number): number {
  return 180 / PI * rad;
}
