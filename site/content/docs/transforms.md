---
title: Transforms
layout: Documentation
---

## `translate(path, dx, dy)`

Applies a 2D translation on a given path. You can pass absolute or relative values.

### Arguments

1. `path` *Array* The path to transform.
2. `dx` *number | string* The offset on the x-axis.
3. `dy` *number | string* The offset on the y-axis.

### Returns

*Array* The transformed path.

### Example

```js
// bernstein/lib/translate

path = Bernstein.pathstring.parse("M0 0L100 0Q150 150 200 200")
path = Bernstein.translate(path, 100, 0)

Bernstein.pathstring.build(path)

// ➜ "M100 0L200 0Q250 150 300 200"
```

---

## `skew(path, thetaX, [thetaY, x = 0, y = 0])`

Applies a 2D skew transformation on a given path. You can pass values in radians or degrees.

### Arguments

1. `path` *Array* The path to transform.
2. `thetaX` *number | string* The skewing angle to apply on the x-axis.
3. `[thetaY]` *number | string* The skewing angle to apply on the y-axis.
4. `[x = 0]` *number | string* The x coordinate of the transformation origin.
5. `[y = 0]` *number | string* The y coordinate of the transformation origin.

### Returns

*Array* The transformed path.

### Example

```js
// bernstein/lib/skew

path = Bernstein.pathstring.parse("M0 0L100 0L100 100")
path = Bernstein.skew(path, Math.PI / 6, 0)

Bernstein.pathstring.build(path)

// ➜ "M0 0L100 0L157.735 100"
```

---

## `scale(path, sx, [sy, x = 0, y = 0])`

Applies a 2D scale transformation on a given path.

### Arguments

1. `path` *Array* The path to transform.
2. `sx` *number* The scale value to apply on the x-axis.
3. `[sy]` *number* The scale value to apply on the y-axis.
4. `[x = 0]` *number | string* The x coordinate of the transformation origin.
5. `[y = 0]` *number | string* The y coordinate of the transformation origin.

### Returns

*Array* The transformed path.

### Example

```js
// bernstein/lib/scale

path = Bernstein.pathstring.parse("M0 0L100 0Q150 150 200 200")
path = Bernstein.scale(path, 0.5, 1)

Bernstein.pathstring.build(path)

// ➜ "M0 0L50 0Q75 150 100 200"
```

---

## `rotate(path, theta, [x = 0, y = 0])`

Applies a 2D rotation on a given path. You can pass value in radians or degrees.

### Arguments

1. `path` *Array* The path to transform.
2. `theta` *number | string* The rotation angle to apply.
3. `[x = 0]` *number | string* The x coordinate of the transformation origin.
4. `[y = 0]` *number | string* The y coordinate of the transformation origin.

### Returns

*Array* The transformed path.

### Example

```js
// bernstein/lib/rotate

path = Bernstein.pathstring.parse("M0 0L100 0")
path = Bernstein.rotate(path, "90deg")

Bernstein.pathstring.build(path)

// ➜ "M0 0L0 100"
```

---

## `matrix(path, transform)`

Transforms a path using a 3x3 transformation matrix.

### Arguments

1. `path` *Array* The path to transform.
2. `transform` *Array* The 3x3 transformation matrix.

### Returns

*Array* The transformed path.

### Example

```js
// bernstein/lib/matrix

path = Bernstein.pathstring.parse("M0 0L100 0L100 100")
path = Bernstein.matrix(path, [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1,
])

Bernstein.pathstring.build(path)

// ➜ "M0 0L100 0L100 100"
```

---

## `matrixOrigin(path, transform, [x = 0, y = 0])`

Same as the `matrix` function, but will be based on a custom origin. You can pass absolute or relative coordinates.

### Arguments

1. `path` *Array* The path to transform.
2. `transform` *Array* The 3x3 transformation matrix.
3. `[x = 0]` *number | string* The x coordinate of the transformation origin.
4. `[y = 0]` *number | string* The y coordinate of the transformation origin.

### Returns

*Array* The transformed path.

### Example

```js
// bernstein/lib/matrix-origin

path = Bernstein.pathstring.parse("M0 0L100 0L100 100")
path = Bernstein.matrixOrigin(path, [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1,
], 50, 50)

Bernstein.pathstring.build(path)

// ➜ "M0 0L100 0L100 100"
```
