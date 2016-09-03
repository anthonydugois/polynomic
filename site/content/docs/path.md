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

const d1 = "M0 0L100 100z"
const d2 = [
  Bernstein.point.M(0, 0),
  Bernstein.point.L(100, 100),
  Bernstein.point.z(),
]
Bernstein.isEqual(d1, d2)

// ➜ true

const d1 = "M0 0L100 100z"
const d2 = "M0 0L100 100L200 100L300 300z"
Bernstein.isEqual(d1, d2)

// ➜ false
```


## `boundingBox(path)`

Computes the bounding box of the given path.

### Arguments

1. `path` *Array* The path for which you want the bounding box.

### Returns

*Object* An object representing the bounding box.

### Example

```js
// bernstein/lib/bounding-box

const path = Bernstein.pathstring.parse("M0 0L100 100z")
Bernstein.boundingBox(path)

// ➜ {
//   x: 0,
//   y: 0,
//   width: 100,
//   height: 100,
// }
```
