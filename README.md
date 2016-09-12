# Polynomic

> A set of advanced utilities to manipulate SVG paths.

### Installation

```sh
npm install --save polynomic
```

### Basic usage

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

### Documentation

See the [official documentation](http://anthonydugois.com/polynomic/).

### Contributing

Clone the repo:

```
git clone https://github.com/anthonydugois/polynomic.git
```

Run tests:

```
npm test
```

Run linting:

```
npm run lint
```

### License

MIT
