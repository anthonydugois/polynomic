---
layout: Homepage
---

## Get started

```sh
npm install --save polynomic
```

## Basic usage

```js
import Polynomic from "polynomic"

// Parse a pathstring
let path = Polynomic.pathstring.parse("M0 0 L100 0 L100 100 L0 100 z")

// Perform some transforms on the path
path = Polynomic.path.rotate(path, Math.PI / 4, "center", "center")
path = Polynomic.path.translate(path, 25, 50)

// Get the new resulting pathstring
const pathstring = Polynomic.pathstring.build(path)

// ➜ ""
```
