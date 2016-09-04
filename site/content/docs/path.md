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
// bernstein/lib/is-equal

d1 = "M0 0L100 100z"
d2 = Bernstein.pathstring.parse("M0 0L100 100z")

Bernstein.isEqual(d1, d2)

// ➜ true

d1 = "M0 0L100 100z"
d2 = "M 0, 0 L 100 100 z"

Bernstein.isEqual(d1, d2)

// ➜ true

d1 = "M0 0L100 100z"
d2 = "M0 0L100 100L200 100L300 300z"

Bernstein.isEqual(d1, d2)

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
// bernstein/lib/bounding-box

path = Bernstein.pathstring.parse("M0 0L100 100z")

Bernstein.boundingBox(path)

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
// bernstein/lib/combine

path = Bernstein.pathstring.parse("M0 0L100 100z M150 150 L200 200"),
path = Bernstein.combine(path)

Bernstein.pathstring.build(path)

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
// bernstein/lib/join

paths = [
  Bernstein.pathstring.parse("M0 0L100 0"),
  Bernstein.pathstring.parse("L100 100L100 200"),
  Bernstein.pathstring.parse("M200 200h50v50"),
]

path = Bernstein.join(paths)

Bernstein.pathstring.build(path)

// ➜ "M0 0L100 0 L100 100L100 200 M200 200h50v50"

path = Bernstein.join(paths, true)

Bernstein.pathstring.build(path)

// ➜ "M0 0L100 0z M100 100L100 200z M200 200h50v50z"
```

---

## `split(path, codes, [shouldKeep = false])`

Splits the given path by the given point codes.

### Arguments

1. `path` *Array* The path you want to split.
2. `codes` *Array | string* The codes by which you want to split the path.
3. `[shouldKeep = false]` *boolean* If `true`, keeps the point codes.

### Returns

*Array* The resulting paths.

### Example

```js
// bernstein/lib/split

path = Bernstein.pathstring.parse("M0 0L100 0L100 100zM100 100L200 100L200 200zM200 200L300 200L300 300")
codes = ["z"]

paths = Bernstein.split(path, codes)

[
  Bernstein.pathstring.build(paths[0]),
  Bernstein.pathstring.build(paths[1]),
  Bernstein.pathstring.build(paths[2]),
]

// ➜ [
  "M0 0L100 0L100 100",
  "M100 100L200 100L200 200",
  "M200 200L300 200L300 300",
]
```
