# Polynomic

> A set of advanced utilities to manipulate SVG paths.

Visit the website to see [some demos](http://anthonydugois.com/polynomic/)!

### Installation

```sh
npm install --save polynomic
```

### Basic usage

```js
import Polynomic from "polynomic"

// Parse a pathstring
let path = Polynomic.pathstring.parse("M0 0 L100 0 L100 100 L0 100 z")

// Perform some transforms on the path
path = Polynomic.rotate(path, Math.PI / 4, "center", "center")
path = Polynomic.translate(path, 25, 50)

// Get the new resulting pathstring
const pathstring = Polynomic.pathstring.build(path)
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
