---
title: Path
layout: Documentation
---

## `isEqual(d1, d2)`

Checks if the pathstring `d1` is equal to the pathstring `d2`. Paths can be passed instead of pathstrings.

### Arguments

1. `d1` *string | Array* The first path or pathstring.
2. `d2` *string | Array* The second path or pathstring.

### Returns

*boolean* Returns `true` if the paths (or pathstrings) are equal, else `false`.

### Example

```js
// polynomic/lib/path/is-equal

d1 = "M0 0L100 100z"
d2 = Polynomic.pathstring.parse("M0 0L100 100z")

Polynomic.path.isEqual(d1, d2)

// ➜ true

d1 = "M0 0L100 100z"
d2 = "M 0, 0 L 100 100 z"

Polynomic.path.isEqual(d1, d2)

// ➜ true

d1 = "M0 0L100 100z"
d2 = "M0 0L100 100L200 100L300 300z"

Polynomic.path.isEqual(d1, d2)

// ➜ false
```

---

## `boundingBox(path)`

Computes the bounding box of the given path.

### Arguments

1. `path` *Array* The path for which you want the bounding box.

### Returns

*Object* An object representing the bounding box.

### Example

```js
// polynomic/lib/path/bounding-box

path = Polynomic.pathstring.parse("M0 0L100 100z")

Polynomic.path.boundingBox(path)

// ➜ {
//   x: 0,
//   y: 0,
//   width: 100,
//   height: 100,
// }
```

---

## `combine(path)`

Combines subpaths by removing `Z` `M` consecutive points.

### Arguments

1. `path` *Array* The path you want to combine.

### Returns

*Array* The combined path.

### Example

```js
// polynomic/lib/path/combine

path = Polynomic.pathstring.parse("M0 0L100 100z M150 150 L200 200"),
path = Polynomic.path.combine(path)

Polynomic.pathstring.build(path)

// ➜ "M0 0L100 100L150 150L200 200"
```

---

## `join(paths, [makeJoin])`

Joins the given paths.

### Arguments

1. `paths` *Array* The paths you want to join.
2. `[makeJoin]` *Function* A function which returns a single point or an array of points used to join paths. Takes `prevPath` *Array* and `nextPath` *Array* as parameters.

### Returns

*Array* The resulting path.

### Example

```js
// polynomic/lib/path/join

path = Polynomic.path.join([
  Polynomic.pathstring.parse("M0 0L100 0"),
  Polynomic.pathstring.parse("M100 100L100 200"),
  Polynomic.pathstring.parse("M200 200h50v50"),
])

Polynomic.pathstring.build(path)

// ➜ "M0 0L100 0 M100 100L100 200 M200 200h50v50"

path = Polynomic.path.join(
  [
    Polynomic.pathstring.parse("M0 0L100 0"),
    Polynomic.pathstring.parse("M100 100L100 200"),
    Polynomic.pathstring.parse("M200 200h50v50"),
  ],
  (prevPath) => Polynomic.point.z(prevPath[0]),
)

Polynomic.pathstring.build(path)

// ➜ "M0 0L100 0z M100 100L100 200z M200 200h50v50"
```

---

## `split(path, makeSplit, [shouldKeep = ""])`

Splits the given path into an array of subpaths.

### Arguments

1. `path` *Array* The path you want to split.
2. `makeSplit` *Function | string | Array* The point(s) which split the path. If a function is given, it takes `point` *Object* and `index` *number* as parameters and it should return a boolean.
3. `[shouldKeep = ""]` *string: "before" | "after"* If `"before"`, keeps the point(s) on the previous path. If `"after"`, keeps the point(s) on the next path.

### Returns

*Array* The resulting paths.

### Example

```js
// polynomic/lib/path/split

path = Polynomic.pathstring.parse("M0 0L100 0L100 100z M100 100L200 100L200 200z M200 200L300 200L300 300")
subpaths = Polynomic.path.split(path, "z")

[
  Polynomic.pathstring.build(subpaths[0]),
  Polynomic.pathstring.build(subpaths[1]),
  Polynomic.pathstring.build(subpaths[2]),
]

// ➜ [
//   "M0 0L100 0L100 100",
//   "M100 100L200 100L200 200",
//   "M200 200L300 200L300 300",
// ]

path = Polynomic.pathstring.parse("M0 0L100 0L100 100Z M100 100L200 100L200 200z M200 200L300 200L300 300")
subpaths = Polynomic.path.split(path, ["z", "Z"], "before")

[
  Polynomic.pathstring.build(subpaths[0]),
  Polynomic.pathstring.build(subpaths[1]),
  Polynomic.pathstring.build(subpaths[2]),
]

// ➜ [
//   "M0 0L100 0L100 100Z",
//   "M100 100L200 100L200 200z",
//   "M200 200L300 200L300 300",
// ]

path = Polynomic.pathstring.parse("M0 0L100 0L100 100Z M100 100L200 100L200 200z M200 200L300 200L300 300")
subpaths = Polynomic.path.split(
  path,
  (point) => Polynomic.point.isM(point),
  "after",
)

[
  Polynomic.pathstring.build(subpaths[0]),
  Polynomic.pathstring.build(subpaths[1]),
  Polynomic.pathstring.build(subpaths[2]),
]

// ➜ [
//   "M0 0L100 0L100 100Z",
//   "M100 100L200 100L200 200z",
//   "M200 200L300 200L300 300",
// ]
```

---

## `simplify(path, tolerance)`

Simplifies the given path using the Ramer-Douglas-Peucker algorithm.

### Arguments

1. `path` *Array* The path you want to simplify.
2. `tolerance` *number* The maximum distance between original and simplified curve.

### Returns

*Array* The simplified path.

### Example

```js
// polynomic/lib/path/simplify

path = Polynomic.pathstring.parse("M0 0 L50 0 L100 5")
path = Polynomic.path.simplify(path, 5)

Polynomic.pathstring.build(path)

// ➜ "M0 0 L100 5"

path = Polynomic.pathstring.parse("M0 0 L50 0 L100 5")
path = Polynomic.path.simplify(path, 1)

Polynomic.pathstring.build(path)

// ➜ "M0 0 L50 0 L100 5"
```

---

## `reverse(path)`

Reverses the path code without any visual change.

### Arguments

1. `path` *Array* The path you want to reverse.

### Returns

*Array* The reversed path.

### Example

```js
// polynomic/lib/path/reverse

path = Polynomic.pathstring.parse("M0 0 L100 0 L100 100")
path = Polynomic.path.reverse(path)

Polynomic.pathstring.build(path)

// ➜ "M100 100L100 0L0 0"
```

---

## `toCubic(path)`

Converts points into cubic curves without any visual change.

### Arguments

1. `path` *Array* The path you want to convert.

### Returns

*Array* The converted path.

### Example

```js
// polynomic/lib/path/to-cubic

path = Polynomic.pathstring.parse("M0 0L100 0L100 100")
path = Polynomic.path.toCubic(path)

Polynomic.pathstring.build(path)

// ➜ "M0 0C0 0 100 0 100 0C100 0 100 100 100 100"
```

---

## `clean(path)`

Cleans the path.

1. Simplifies the closures ;
2. Makes sure the first point is a `M` point ;
3. Makes sure there is a `M` point after each `Z` point ;
4. Removes each point that is the same than the previous one.

### Arguments

1. `path` *Array* The path you want to clean.

### Returns

*Array* The cleaned path.

### Example

```js
// polynomic/lib/path/clean

path = Polynomic.pathstring.parse("L0 0l50 50l0 0h50v50 L0 0")
path = Polynomic.path.clean(path)

Polynomic.pathstring.build(path)

// ➜ "M0 0l50 50h50v50z"
```

---

## `from(node)`

Gets the path from a given SVG node. The following elements are supported: `circle`, `ellipse`, `line`, `path`, `polygon`, `polyline`, `rect`.

### Arguments

1. `node` *SVGElement* The SVG node from which you want the path.

### Returns

*Array* The corresponding path.

### Example

```js
// polynomic/lib/path/from

node = document.querySelector("rect")
path = Polynomic.path.from(node)

Polynomic.pathstring.build(path)

// ➜ "M0 0L100 0L100 100L0 100z"
```

---

## `fromCircle(node)`

Gets the path from a given SVG circle node.

### Arguments

1. `node` *SVGCircleElement* The SVG circle node from which you want the path.

### Returns

*Array* The corresponding path.

### Example

```js
// polynomic/lib/path/from-circle

node = document.querySelector("circle")
path = Polynomic.path.fromCircle(node)

Polynomic.pathstring.build(path)

// ➜ "M0 50A50 50 0 0 0 100 50A50 50 0 0 0 0 50Z"
```

---

## `fromEllipse(node)`

Gets the path from a given SVG ellipse node.

### Arguments

1. `node` *SVGEllipseElement* The SVG ellipse node from which you want the path.

### Returns

*Array* The corresponding path.

### Example

```js
// polynomic/lib/path/from-ellipse

node = document.querySelector("ellipse")
path = Polynomic.path.fromEllipse(node)

Polynomic.pathstring.build(path)

// ➜ "M0 50A100 50 0 0 0 200 50A100 50 0 0 0 0 50Z"
```

---

## `fromLine(node)`

Gets the path from a given SVG line node.

### Arguments

1. `node` *SVGLineElement* The SVG line node from which you want the path.

### Returns

*Array* The corresponding path.

### Example

```js
// polynomic/lib/path/from-line

node = document.querySelector("line")
path = Polynomic.path.fromLine(node)

Polynomic.pathstring.build(path)

// ➜ "M0 0L100 100"
```

---

## `fromPath(node)`

Gets the path from a given SVG path node.

### Arguments

1. `node` *SVGPathElement* The SVG path node from which you want the path.

### Returns

*Array* The corresponding path.

### Example

```js
// polynomic/lib/path/from-path

node = document.querySelector("path")
path = Polynomic.path.fromPath(node)

Polynomic.pathstring.build(path)

// ➜ "M0 0L100 100C150 150 250 250 300 300"
```

---

## `fromPolygon(node)`

Gets the path from a given SVG polygon node.

### Arguments

1. `node` *SVGPolygonElement* The SVG polygon node from which you want the path.

### Returns

*Array* The corresponding path.

### Example

```js
// polynomic/lib/path/from-polygon

node = document.querySelector("polygon")
path = Polynomic.path.fromPolygon(node)

Polynomic.pathstring.build(path)

// ➜ "M0 0L100 100L150 -150L5e-14 -4Z"
```

---

## `fromPolyline(node)`

Gets the path from a given SVG polyline node.

### Arguments

1. `node` *SVGPolylineElement* The SVG polyline node from which you want the path.

### Returns

*Array* The corresponding path.

### Example

```js
// polynomic/lib/path/from-polyline

node = document.querySelector("polyline")
path = Polynomic.path.fromPolyline(node)

Polynomic.pathstring.build(path)

// ➜ "M0 0L100 100L150 -150L5e-14 -4"
```

---

## `fromRect(node)`

Gets the path from a given SVG rect node.

### Arguments

1. `node` *SVGRectElement* The SVG rect node from which you want the path.

### Returns

*Array* The corresponding path.

### Example

```js
// polynomic/lib/path/from-rect

node = document.querySelector("rect")
path = Polynomic.path.fromRect(node)

Polynomic.pathstring.build(path)

// ➜ "M0 0L100 0L100 100L0 100Z"
```
