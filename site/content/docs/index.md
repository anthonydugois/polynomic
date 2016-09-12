---
title: Introduction
layout: Documentation
---

## Installation

The easiest way to install Polynomic is by using NPM:

```sh
npm install --save polynomic
```

## Usage

The most basic way to use Polynomic is by importing the entire library:

```js
import Polynomic from "polynomic"

// ...
```

Or if you prefer to use ES5:

```js
var Polynomic = require("polynomic")

// ...
```

If you want to use only the functions you actually need (in order to reduce the size of your final bundle), it's possible to import them individually:

```js
import parse from "polynomic/lib/pathstring/parse"
import build from "polynomic/lib/pathstring/build"
import rotate from "polynomic/lib/transforms/rotate"

// ...
```
