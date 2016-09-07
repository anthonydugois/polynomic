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

## `join(paths, [shouldClose = false])`

Joins the given paths.

### Arguments

1. `paths` *Array* The paths you want to join.
2. `[shouldClose = false]` *boolean* If `true`, the paths will be closed.

### Returns

*Array* The resulting path.

### Example

```js
// polynomic/lib/path/join

path = Polynomic.path.join([
  Polynomic.pathstring.parse("M0 0L100 0"),
  Polynomic.pathstring.parse("L100 100L100 200"),
  Polynomic.pathstring.parse("M200 200h50v50"),
])

Polynomic.pathstring.build(path)

// ➜ "M0 0L100 0 L100 100L100 200 M200 200h50v50"

path = Polynomic.path.join([
  Polynomic.pathstring.parse("M0 0L100 0"),
  Polynomic.pathstring.parse("L100 100L100 200"),
  Polynomic.pathstring.parse("M200 200h50v50"),
], true)

Polynomic.pathstring.build(path)

// ➜ "M0 0L100 0z M100 100L100 200z M200 200h50v50z"
```

---

## `split(path, separators, [shouldKeep = false])`

Splits the given path into an array of subpaths.

### Arguments

1. `path` *Array* The path you want to split.
2. `separators` *Array | string* The point codes which splits the path.
3. `[shouldKeep = false]` *boolean* If `true`, keeps the separators in the path.

### Returns

*Array* The resulting paths.

### Example

```js
// polynomic/lib/path/split

path = Polynomic.pathstring.parse("M0 0L100 0L100 100zM100 100L200 100L200 200zM200 200L300 200L300 300")
separators = ["z", "Z"]

subpaths = Polynomic.path.split(path, separators)

[
  Polynomic.pathstring.build(subpaths[0]),
  Polynomic.pathstring.build(subpaths[1]),
  Polynomic.pathstring.build(subpaths[2]),
]

// ➜ [
  "M0 0L100 0L100 100",
  "M100 100L200 100L200 200",
  "M200 200L300 200L300 300",
]
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
