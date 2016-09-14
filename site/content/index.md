---
layout: Homepage
---

## Introduction

Polynomic is a set of advanced utilities to manipulate SVG paths. SVG path strings are often quite hard to manipulate because of their nature; you have to parse them and analyze the SVG code to be able to perform some modifications.

The main goal of Polynomic is to provide an easy way to parse, normalize and edit SVG paths.

## Get started

Begin by installing the library using NPM:

```sh
npm install --save polynomic
```

## Basic usage

The process is very simple. Polynomic will parse a given pathstring to generate a normalized array of points. Then, you just have to call functions (e.g. 2D transforms) on this array to edit the path, and build a new pathstring that you can inject in the DOM.

```js
import Polynomic from "polynomic"

// Parse a pathstring and build a normalized array of points
let path = Polynomic.pathstring.parse("M0 0 L100 0 L100 100 L0 100 z")

// Perform some transforms on the path
path = Polynomic.transforms.rotate(path, Math.PI / 4, "center", "center")
path = Polynomic.transforms.translate(path, 25, 50)

// Get the new pathstring
const pathstring = Polynomic.pathstring.build(path)

// ➜ "M75 29.289L145.711 100L75 170.711L4.289 100z"
```

Want to go further? To see all the possibilities provided by Polynomic, please [visit the docs](/docs/) or experiment some things in [the playground](/playground/)!
