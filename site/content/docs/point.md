---
title: Point
layout: Documentation
---

## `point.M(x, y)`

Creates a new `M` point.

### Arguments

1. `x` *number* The x coordinate of the point.
2. `y` *number* The y coordinate of the point.

### Returns

*Object* The created `M` point.

### Example

```js
// bernstein/lib/point/points

Bernstein.point.M(0, 0)

// ➜ {
//   code: "M",
//   x: 0,
//   y: 0,
//   parameters: {},
// }
```


## `point.L(x, y)`

Creates a new `L` point.

### Arguments

1. `x` *number* The x coordinate of the point.
2. `y` *number* The y coordinate of the point.

### Returns

*Object* The created `L` point.

### Example

```js
// bernstein/lib/point/points

Bernstein.point.L(100, 100)

// ➜ {
//   code: "L",
//   x: 100,
//   y: 100,
//   parameters: {},
// }
```


## `point.H(x, [prev])`

Creates a new `H` point.

### Arguments

1. `x` *number* The x coordinate of the point.
2. `[prev]` *Object* The previous point (to get the y coord).

### Returns

*Object* The created `H` point.

### Example

```js
// bernstein/lib/point/points

const prev = Bernstein.point.M(0, 0)
Bernstein.point.H(100, prev)

// ➜ {
//   code: "H",
//   x: 100,
//   y: 0,
//   parameters: {},
// }
```


## `point.V(y, [prev])`

Creates a new `V` point.

### Arguments

1. `y` *number* The y coordinate of the point.
2. `[prev]` *Object* The previous point (to get the x coord).

### Returns

*Object* The created `V` point.

### Example

```js
// bernstein/lib/point/points

const prev = Bernstein.point.M(0, 0)
Bernstein.point.V(100, prev)

// ➜ {
//   code: "V",
//   x: 0,
//   y: 100,
//   parameters: {},
// }
```


## `point.Q(x1, y1, x, y)`

Creates a new `Q` point.

### Arguments

1. `x1` *number* The x coordinate of the anchor.
2. `y1` *number* The y coordinate of the anchor.
3. `x` *number* The x coordinate of the point.
4. `y` *number* The y coordinate of the point.

### Returns

*Object* The created `Q` point.

### Example

```js
// bernstein/lib/point/points

Bernstein.point.Q(50, 50, 100, 100)

// ➜ {
//   code: "Q",
//   x: 100,
//   y: 100,
//   parameters: {
//     x1: 50,
//     y1: 50,
//   },
// }
```


## `point.T(x, y, [prev])`

Creates a new `T` point.

### Arguments

1. `x` *number* The x coordinate of the point.
2. `y` *number* The y coordinate of the point.
3. `[prev]` *Object* The previous point (to compute the anchor coords).

### Returns

*Object* The created `T` point.

### Example

```js
// bernstein/lib/point/points

const prev = Bernstein.point.Q(50, 50, 100, 100)
Bernstein.point.T(200, 200, prev)

// ➜ {
//   code: "T",
//   x: 200,
//   y: 200,
//   parameters: {
//     x1: 150,
//     y1: 150,
//   },
// }
```


## `point.C(x1, y1, x2, y2, x, y)`

Creates a new `C` point.

### Arguments

1. `x1` *number* The x coordinate of the first anchor.
2. `y1` *number* The y coordinate of the first anchor.
3. `x2` *number* The x coordinate of the second anchor.
4. `y2` *number* The y coordinate of the second anchor.
5. `x` *number* The x coordinate of the point.
6. `y` *number* The y coordinate of the point.

### Returns

*Object* The created `C` point.

### Example

```js
// bernstein/lib/point/points

Bernstein.point.C(25, 25, 75, 75, 100, 100)

// ➜ {
//   code: "C",
//   x: 100,
//   y: 100,
//   parameters: {
//     x1: 25,
//     y1: 25,
//     x2: 75,
//     y2: 75,
//   },
// }
```


## `point.S(x2, y2, x, y, [prev])`

Creates a new `S` point.

### Arguments

1. `x2` *number* The x coordinate of the second anchor.
2. `y2` *number* The y coordinate of the second anchor.
3. `x` *number* The x coordinate of the point.
4. `y` *number* The y coordinate of the point.
5. `[prev]` *Object* The previous point (to compute the first anchor coords).

### Returns

*Object* The created `S` point.

### Example

```js
// bernstein/lib/point/points

const prev = Bernstein.point.C(25, 25, 75, 75, 100, 100)
Bernstein.point.S(175, 175, 200, 200, prev)

// ➜ {
//   code: "S",
//   x: 200,
//   y: 200,
//   parameters: {
//     x1: 125,
//     y1: 125,
//     x2: 175,
//     y2: 175,
//   },
// }
```


## `point.A(rx, ry, rotation, large, sweep, x, y)`

Creates a new `A` point.

### Arguments

1. `rx` *number* The horizontal radius of the arc.
2. `ry` *number* The vertical radius of the arc.
3. `rotation` *number* The rotation of the arc.
4. `large` *number (0 | 1)* Use the large arc.
5. `sweep` *number (0 | 1)* Sweep the arc.
6. `x` *number* The x coordinate of the point.
7. `y` *number* The y coordinate of the point.

### Returns

*Object* The created `A` point.

### Example

```js
// bernstein/lib/point/points

Bernstein.point.A(50, 50, 0, 1, 1, 100, 0)

// ➜ {
//   code: "A",
//   x: 100,
//   y: 0,
//   parameters: {
//     rx: 50,
//     ry: 50,
//     rotation: 0,
//     large: 1,
//     sweep: 1,
//   },
// }
```


## `point.Z([related])`

Creates a new `Z` point.

### Arguments

1. `[related]` *Object* The point to be connected to close the path.

### Returns

*Object* The created `Z` point.

### Example

```js
// bernstein/lib/point/points

const related = Bernstein.point.M(0, 0)
Bernstein.point.Z(related)

// ➜ {
//   code: "Z",
//   x: 0,
//   y: 0,
//   parameters: {},
// }
```


## `point.m(dx, dy, [prev])`

Creates a new relative `m` point.

### Arguments

1. `dx` *number* The relative x coordinate of the point.
2. `dy` *number* The relative y coordinate of the point.
3. `[prev]` *Object* The previous point (to compute absolute coords).

### Returns

*Object* The created `m` point.

### Example

```js
// bernstein/lib/point/points

Bernstein.point.m(0, 0)

// ➜ {
//   code: "m",
//   x: 0,
//   y: 0,
//   parameters: {},
// }
```


## `point.l(dx, dy, [prev])`

Creates a new relative `l` point.

### Arguments

1. `dx` *number* The relative x coordinate of the point.
2. `dy` *number* The relative y coordinate of the point.
3. `[prev]` *Object* The previous point (to compute absolute coords).

### Returns

*Object* The created `l` point.

### Example

```js
// bernstein/lib/point/points

const prev = Bernstein.point.M(0, 0)
Bernstein.point.l(100, 100, prev)

// ➜ {
//   code: "l",
//   x: 100,
//   y: 100,
//   parameters: {},
// }
```


## `point.h(dx, [prev])`

Creates a new relative `h` point.

### Arguments

1. `dx` *number* The relative x coordinate of the point.
2. `[prev]` *Object* The previous point (to compute absolute coords).

### Returns

*Object* The created `h` point.

### Example

```js
// bernstein/lib/point/points

const prev = Bernstein.point.M(0, 0)
Bernstein.point.h(100, prev)

// ➜ {
//   code: "h",
//   x: 100,
//   y: 0,
//   parameters: {},
// }
```


## `point.v(dy, [prev])`

Creates a new relative `v` point.

### Arguments

1. `dy` *number* The relative y coordinate of the point.
2. `[prev]` *Object* The previous point (to compute absolute coords).

### Returns

*Object* The created `v` point.

### Example

```js
// bernstein/lib/point/points

const prev = Bernstein.point.M(0, 0)
Bernstein.point.v(100, prev)

// ➜ {
//   code: "v",
//   x: 0,
//   y: 100,
//   parameters: {},
// }
```


## `point.q(dx1, dy1, dx, dy, [prev])`

Creates a new relative `q` point.

### Arguments

1. `dx1` *number* The relative x coordinate of the anchor.
2. `dy1` *number* The relative y coordinate of the anchor.
3. `dx` *number* The relative x coordinate of the point.
4. `dy` *number* The relative y coordinate of the point.
5. `[prev]` *Object* The previous point (to compute absolute coords).

### Returns

*Object* The created `q` point.

### Example

```js
// bernstein/lib/point/points

const prev = Bernstein.point.M(0, 0)
Bernstein.point.q(50, 50, 100, 100, prev)

// ➜ {
//   code: "q",
//   x: 100,
//   y: 100,
//   parameters: {
//     x1: 50,
//     y1: 50,
//   },
// }
```


## `point.t(dx, dy, [prev])`

Creates a new relative `t` point.

### Arguments

1. `dx` *number* The relative x coordinate of the point.
2. `dy` *number* The relative y coordinate of the point.
3. `[prev]` *Object* The previous point (to compute absolute coords).

### Returns

*Object* The created `t` point.

### Example

```js
// bernstein/lib/point/points

const prev = Bernstein.point.Q(50, 50, 100, 100)
Bernstein.point.t(100, 100, prev)

// ➜ {
//   code: "t",
//   x: 200,
//   y: 200,
//   parameters: {
//     x1: 150,
//     y1: 150,
//   },
// }
```


## `point.c(dx1, dy1, dx2, dy2, dx, dy, [prev])`

Creates a new relative `c` point.

### Arguments

1. `dx1` *number* The relative x coordinate of the first anchor.
2. `dy1` *number* The relative y coordinate of the first anchor.
3. `dx2` *number* The relative x coordinate of the second anchor.
4. `dy2` *number* The relative y coordinate of the second anchor.
5. `dx` *number* The relative x coordinate of the point.
6. `dy` *number* The relative y coordinate of the point.
7. `[prev]` *Object* The previous point (to compute absolute coords).

### Returns

*Object* The created `c` point.

### Example

```js
// bernstein/lib/point/points

const prev = Bernstein.point.M(0, 0)
Bernstein.point.c(25, 25, 75, 75, 100, 100, prev)

// ➜ {
//   code: "c",
//   x: 100,
//   y: 100,
//   parameters: {
//     x1: 25,
//     y1: 25,
//     x2: 75,
//     y2: 75,
//   },
// }
```


## `point.s(dx2, dy2, dx, dy, [prev])`

Creates a new relative `s` point.

### Arguments

1. `dx2` *number* The relative x coordinate of the second anchor.
2. `dy2` *number* The relative y coordinate of the second anchor.
3. `dx` *number* The relative x coordinate of the point.
4. `dy` *number* The relative y coordinate of the point.
5. `[prev]` *Object* The previous point (to compute absolute coords).

### Returns

*Object* The created `s` point.

### Example

```js
// bernstein/lib/point/points

const prev = Bernstein.point.C(25, 25, 50, 50, 100, 100)
Bernstein.point.s(75, 75, 100, 100)

// ➜ {
//   code: "s",
//   x: 200,
//   y: 200,
//   parameters: {
//     x1: 150,
//     y1: 150,
//     x2: 175,
//     y2: 175,
//   },
// }
```


## `point.a(rx, ry, rotation, large, sweep, dx, dy, [prev])`

Creates a new relative `a` point.

### Arguments

1. `rx` *number* The horizontal radius of the arc.
2. `ry` *number* The vertical radius of the arc.
3. `rotation` *number* The rotation of the arc.
4. `large` *number (0 | 1)* Use the large arc.
5. `sweep` *number (0 | 1)* Sweep the arc.
6. `dx` *number* The relative x coordinate of the point.
7. `dy` *number* The relative y coordinate of the point.
8. `[prev]` *Object* The previous point (to compute absolute coords).

### Returns

*Object* The created `a` point.

### Example

```js
// bernstein/lib/point/points

const prev = Bernstein.point.M(0, 0)
Bernstein.point.a(50, 50, 0, 1, 1, 100, 0)

// ➜ {
//   code: "a",
//   x: 100,
//   y: 0,
//   parameters: {
//     rx: 50,
//     ry: 50,
//     rotation: 0,
//     large: 1,
//     sweep: 1,
//   },
// }
```


## `point.z([related])`

Creates a new `z` point.

### Arguments

1. `[related]` *Object* The point to be connected to close the path.

### Returns

*Object* The created `z` point.

### Example

```js
// bernstein/lib/point/points

const related = Bernstein.point.M(0, 0)
Bernstein.point.z(related)

// ➜ {
//   code: "z",
//   x: 0,
//   y: 0,
//   parameters: {},
// }
```


## `point.Point(code, x, y, [parameters = {}])`

Creates a new point with the provided parameters.

> Note: This function is a more generic representation of a SVG point. In most cases, you don't need it. Prefer to use the built-in functions described above.

### Arguments

1. `code` *string* The SVG code of the point.
2. `x` *number* The x coordinate of the point.
3. `y` *number* The y coordinate of the point.
4. `[parameters = {}]` *Object* The additional parameters of the point.

### Returns

*Object* The created point.

### Example

```js
// bernstein/lib/point/points

Bernstein.point.Point("C", 100, 100, {
  x1: 25,
  y1: 25,
  x2: 75,
  y2: 75,
})

// ➜ {
//   code: "C",
//   x: 100,
//   y: 100,
//   parameters: {
//     x1: 25,
//     y1: 25,
//     x2: 75,
//     y2: 75,
//   },
// }
```
