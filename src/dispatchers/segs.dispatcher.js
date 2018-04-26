// @flow

import { createSeg } from "../core/_factories";
import { clamp } from "../core/_maths";

import { pathstring2segs } from "../parsers";
import { dispatcher } from "../dispatcher";

function getElementAttr(attr: string, el: Element): string {
  const value = el.getAttribute(attr);

  return typeof value === "string" ? value : "";
}

function getPrimitiveAttr(attr: string, primitive: Primitive): string {
  return attr in primitive ? String(primitive[attr]) : "";
}

function getAttr(attr: string, entity: Primitive | Element): string {
  return entity instanceof Element
    ? getElementAttr(attr, entity)
    : getPrimitiveAttr(attr, entity);
}

function getNumberAttr(
  defaultValue: number,
  attr: string,
  primitive: Primitive | Element,
): number {
  const value = parseFloat(getAttr(attr, primitive));

  return isNaN(value) ? defaultValue : value;
}

// Please read
// https://www.w3.org/TR/SVG/paths.html#PathElement
function path2segs(path: PrimitivePath | Element): SegList {
  const segs = pathstring2segs(getAttr("d", path));

  return segs ? segs : [];
}

// Please read
// https://www.w3.org/TR/SVG/shapes.html#PolylineElement
function polyline2segs(polyline: PrimitivePolyline | Element): SegList {
  const segs = pathstring2segs("M" + getAttr("points", polyline));

  return segs ? segs : [];
}

// Please read
// https://www.w3.org/TR/SVG/shapes.html#PolygonElement
function polygon2segs(polygon: PrimitivePolygon | Element): SegList {
  const segs = pathstring2segs("M" + getAttr("points", polygon) + "z");

  return segs ? segs : [];
}

// Please read
// https://www.w3.org/TR/SVG/shapes.html#CircleElement
function circle2segs(circle: PrimitiveCircle | Element): SegList {
  // Coords default to 0,0
  const cx = getNumberAttr(0, "cx", circle),
    cy = getNumberAttr(0, "cy", circle);

  // Radius should be positive, default to 0
  const r = clamp(0, Infinity, getNumberAttr(0, "r", circle));

  return [
    createSeg("M", cx + r, cy),
    createSeg("A", r, r, 0, 0, 1, cx - r, cy),
    createSeg("A", r, r, 0, 0, 1, cx + r, cy),
    createSeg("z"),
  ];
}

// Please read
// https://www.w3.org/TR/SVG/shapes.html#EllipseElement
function ellipse2segs(ellipse: PrimitiveEllipse | Element): SegList {
  // Coords default to 0,0
  const cx = getNumberAttr(0, "cx", ellipse),
    cy = getNumberAttr(0, "cy", ellipse);

  // Radii should be positive, default to 0
  const rx = clamp(0, Infinity, getNumberAttr(0, "rx", ellipse)),
    ry = clamp(0, Infinity, getNumberAttr(0, "ry", ellipse));

  return [
    createSeg("M", cx + rx, cy),
    createSeg("A", rx, ry, 0, 0, 1, cx - rx, cy),
    createSeg("A", rx, ry, 0, 0, 1, cx + rx, cy),
    createSeg("z"),
  ];
}

// Please read
// https://www.w3.org/TR/SVG/shapes.html#LineElement
function line2segs(line: PrimitiveLine | Element): SegList {
  // Coords default to 0,0
  const x1 = getNumberAttr(0, "x1", line),
    y1 = getNumberAttr(0, "y1", line),
    x2 = getNumberAttr(0, "x2", line),
    y2 = getNumberAttr(0, "y2", line);

  return [createSeg("M", x1, y1), createSeg("L", x2, y2)];
}

// Please read
// https://www.w3.org/TR/SVG/shapes.html#RectElement
function rect2segs(rect: PrimitiveRect | Element): SegList {
  // Coords default to 0,0
  const x = getNumberAttr(0, "x", rect),
    y = getNumberAttr(0, "y", rect);

  // Dimensions should be positive, default to 0
  const width = clamp(0, Infinity, getNumberAttr(0, "width", rect)),
    height = clamp(0, Infinity, getNumberAttr(0, "height", rect));

  // Radii default to NaN
  let rx = getNumberAttr(NaN, "rx", rect),
    ry = getNumberAttr(NaN, "ry", rect);

  // Both are NaN, default to 0
  // Only one is NaN, rx = ry
  if (isNaN(rx) && isNaN(ry)) {
    rx = ry = 0;
  } else if (!isNaN(rx) && isNaN(ry)) {
    ry = rx;
  } else if (!isNaN(ry) && isNaN(rx)) {
    rx = ry;
  }

  // Radii should be positive and less than half the rect dimension
  rx = clamp(0, width / 2, rx);
  ry = clamp(0, height / 2, ry);

  // If one of the radii is 0, disable radii
  if (rx === 0 || ry === 0) {
    return [
      createSeg("M", x, y),
      createSeg("H", x + width),
      createSeg("V", y + height),
      createSeg("H", x),
      createSeg("z"),
    ];
  }

  return [
    createSeg("M", x + rx, y),
    createSeg("H", x + width - rx),
    createSeg("A", rx, ry, 0, 0, 1, x + width, y + ry),
    createSeg("V", y + height - ry),
    createSeg("A", rx, ry, 0, 0, 1, x + width - rx, y + height),
    createSeg("H", x + rx),
    createSeg("A", rx, ry, 0, 0, 1, x, y + height - ry),
    createSeg("V", y + ry),
    createSeg("A", rx, ry, 0, 0, 1, x + rx, y),
    createSeg("z"),
  ];
}

export const segsDispatcher = dispatcher(
  {
    fallback: () => [],
  },
  [
    (entity: SegListLike) =>
      Array.isArray(entity) &&
      (entity.length === 0 || Array.isArray(entity[0])),
    (entity: SegList) => entity,
  ],
  [
    (entity: SegListLike) => typeof entity === "string",
    (entity: string) => {
      const segs = pathstring2segs(entity);

      return segs ? segs : [];
    },
  ],
  [
    (entity: SegListLike) =>
      (typeof entity.type === "string" && entity.type === "PRIMITIVE_PATH") ||
      (entity instanceof Element && entity.tagName === "PATH"),
    (entity: PrimitivePath | Element) => path2segs(entity),
  ],
  [
    (entity: SegListLike) =>
      (typeof entity.type === "string" &&
        entity.type === "PRIMITIVE_POLYLINE") ||
      (entity instanceof Element && entity.tagName === "POLYLINE"),
    (entity: PrimitivePolyline | Element) => polyline2segs(entity),
  ],
  [
    (entity: SegListLike) =>
      (typeof entity.type === "string" &&
        entity.type === "PRIMITIVE_POLYGON") ||
      (entity instanceof Element && entity.tagName === "POLYGON"),
    (entity: PrimitivePolygon | Element) => polygon2segs(entity),
  ],
  [
    (entity: SegListLike) =>
      (typeof entity.type === "string" && entity.type === "PRIMITIVE_CIRCLE") ||
      (entity instanceof Element && entity.tagName === "CIRCLE"),
    (entity: PrimitiveCircle | Element) => circle2segs(entity),
  ],
  [
    (entity: SegListLike) =>
      (typeof entity.type === "string" &&
        entity.type === "PRIMITIVE_ELLIPSE") ||
      (entity instanceof Element && entity.tagName === "ELLIPSE"),
    (entity: PrimitiveEllipse | Element) => ellipse2segs(entity),
  ],
  [
    (entity: SegListLike) =>
      (typeof entity.type === "string" && entity.type === "PRIMITIVE_LINE") ||
      (entity instanceof Element && entity.tagName === "LINE"),
    (entity: PrimitiveLine | Element) => line2segs(entity),
  ],
  [
    (entity: SegListLike) =>
      (typeof entity.type === "string" && entity.type === "PRIMITIVE_RECT") ||
      (entity instanceof Element && entity.tagName === "RECT"),
    (entity: PrimitiveRect | Element) => rect2segs(entity),
  ],
);
