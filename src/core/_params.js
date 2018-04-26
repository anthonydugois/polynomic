// @flow

import { CONFIG } from "./_config";
import { createAbsParams } from "./_factories";
import { deg2rad } from "./_maths";

export function getSegCmd(entity: mixed): number {
  // string
  if (typeof entity === "string") {
    return CONFIG.SEGS.TYPES[entity];
  }

  // Seg
  if (Array.isArray(entity) && typeof entity[0] === "number") {
    return entity[0];
  }

  // Default
  return 0;
}

export function getSegDef(entity: mixed): * {
  return CONFIG.SEGS.DEFS[getSegCmd(entity)];
}

export function getSegType(entity: mixed): string {
  return getSegDef(entity).type;
}

/**
 * Get the value of the given parameter in the given segment
 *
 * @example
 * getSegParam("x", [4, 10, 10]) // 10
 */
export function getSegParam(param: string, seg: Seg): number {
  return seg[getSegDef(seg).defs[param].index];
}

/**
 * Check if the given segment has the given parameter
 *
 * @example
 * hasParam("x1", [4, 10, 10]) // false
 * hasParam("x1", "q")         // true
 */
export function hasParam(param: string, seg: Seg | string): boolean {
  return getSegDef(seg).params.includes(param);
}

/**
 * Check if the given segment is absolute
 *
 * @example
 * isAbs([4, 10, 10]) // true
 * isAbs("l")         // false
 */
export function isAbs(entity: mixed): boolean {
  return getSegDef(entity).isAbs;
}

/**
 * Check if the given segment is relative
 *
 * @example
 * isRel([4, 10, 10]) // false
 * isRel("l")         // true
 */
export function isRel(entity: mixed): boolean {
  return getSegDef(entity).isRel;
}

/**
 * Check if the given segment has the given type
 *
 * @example
 * is("l", [4, 10, 10])       // false
 * is("l", [4, 10, 10], true) // true
 * is("L", "q")               // false
 * is("L", "l")               // false
 * is("L", "l", true)         // true
 * is("L", "q", true)         // false
 */
export function is(type: string, entity: mixed, ci: boolean = false): boolean {
  return ci
    ? getSegType(entity).toUpperCase() === type.toUpperCase()
    : getSegType(entity) === type;
}

/**
 * Compute absolute parameters of the current seg
 */
export function getAbsParams(
  seg: Seg,
  prev: ?Seg = null,
  params: AbsParams = createAbsParams(),
): AbsParams {
  // Store the last point coords
  params.x0 = params.x3;
  params.y0 = params.y3;

  if (is("Z", seg, true)) {
    // A Closepath Seg is placed at the same coords than the last Moveto Seg
    params.x3 = params.mx;
    params.y3 = params.my;
  } else {
    // Compute first anchor coords
    if (is("T", seg, true)) {
      if (prev && (is("Q", prev, true) || is("T", prev, true))) {
        params.x1 = 2 * params.x3 - params.x1;
        params.y1 = 2 * params.y3 - params.y1;
      } else {
        params.x1 = params.x3;
        params.y1 = params.y3;
      }
    } else if (is("S", seg, true)) {
      if (prev && (is("C", prev, true) || is("S", prev, true))) {
        params.x1 = 2 * params.x3 - params.x2;
        params.y1 = 2 * params.y3 - params.y2;
      } else {
        params.x1 = params.x3;
        params.y1 = params.y3;
      }
    } else {
      // Other Segs
      if (hasParam("x1", seg)) {
        const x1 = getSegParam("x1", seg);

        params.x1 = isAbs(seg) ? x1 : params.x3 + x1;
      } else {
        params.x1 = 0;
      }

      if (hasParam("y1", seg)) {
        const y1 = getSegParam("y1", seg);

        params.y1 = isAbs(seg) ? y1 : params.y3 + y1;
      } else {
        params.y1 = 0;
      }
    }

    // Compute second anchor coords
    if (hasParam("x2", seg)) {
      const x2 = getSegParam("x2", seg);

      params.x2 = isAbs(seg) ? x2 : params.x3 + x2;
    } else {
      params.x2 = 0;
    }

    if (hasParam("y2", seg)) {
      const y2 = getSegParam("y2", seg);

      params.y2 = isAbs(seg) ? y2 : params.y3 + y2;
    } else {
      params.y2 = 0;
    }

    // Store arc params
    if (hasParam("rx", seg)) {
      params.rx = getSegParam("rx", seg);
    } else {
      params.rx = 0;
    }

    if (hasParam("ry", seg)) {
      params.ry = getSegParam("ry", seg);
    } else {
      params.ry = 0;
    }

    if (hasParam("angle", seg)) {
      params.angle = getSegParam("angle", seg);
      params.rad = deg2rad(params.angle);
    } else {
      params.angle = 0;
      params.rad = 0;
    }

    if (hasParam("largeArcFlag", seg)) {
      params.large = getSegParam("largeArcFlag", seg);
    } else {
      params.large = 0;
    }

    if (hasParam("sweepFlag", seg)) {
      params.sweep = getSegParam("sweepFlag", seg);
    } else {
      params.sweep = 0;
    }

    // Compute second point coords
    if (hasParam("x", seg)) {
      const x = getSegParam("x", seg);

      params.x3 = isAbs(seg) ? x : params.x3 + x;
    }

    if (hasParam("y", seg)) {
      const y = getSegParam("y", seg);

      params.y3 = isAbs(seg) ? y : params.y3 + y;
    }

    // Store the last Moveto Seg coords
    if (is("M", seg, true)) {
      params.mx = params.x3;
      params.my = params.y3;
    }
  }

  return params;
}
