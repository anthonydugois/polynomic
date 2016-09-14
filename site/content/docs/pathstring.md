---
title: Pathstring
layout: Documentation
---

## `parse(d)`

Parses a pathstring and build an array of points with absolute coords.

### Arguments

1. `d` *string* The pathstring to parse.

### Returns

*Array* The corresponding array of points.

### Example

```js
// polynomic/lib/pathstring/parse

Polynomic.pathstring.parse("M0 0L100 100z")

// ➜ [
//   {
//     code: "M",
//     x: 0,
//     y: 0,
//     parameters: {},
//   },
//   {
//     code: "L",
//     x: 100,
//     y: 100,
//     parameters: {},
//   },
//   {
//     code: "z",
//     x: 0,
//     y: 0,
//     parameters: {},
//   },
// ]
```

---

## `build(path)`

Builds an array of points into a pathstring.

### Arguments

1. `path` *Array* The path to build.

### Returns

*string* The built pathstring.

### Example

```js
// polynomic/lib/pathstring/build

path = [
  Polynomic.point.M(0, 0),
  Polynomic.point.L(100, 100),
  Polynomic.point.z(),
]

Polynomic.pathstring.build(path)

// ➜ "M0 0L100 100z"
```

---

## `isValid(d)`

Checks if the given pathstring is a valid SVG path.

1. Checks if the first point is a `M` ;
2. Checks if all points have a correct number of parameters ;
3. Checks if there are no invalid characters (the characters which match the regex `/^[mlhvqtcsaze\d\s,.-]*$/gi` are considered invalid).

### Arguments

1. `d` *string* The pathstring to check.

### Returns

*boolean* Returns `true` if the given pathstring is valid, else `false`.

### Example

```js
// polynomic/lib/pathstring/is-valid

Polynomic.pathstring.isValid("M0,0l0 0a50 50, 0,1,0 -10 10")

// ➜ true

Polynomic.pathstring.isValid("l10,10")

// ➜ false

Polynomic.pathstring.isValid("q10 20,30")

// ➜ false

Polynomic.pathstring.isValid("(╯°□°)╯︵ ┻━┻")

// ➜ false
```
