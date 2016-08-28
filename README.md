# Bernstein

> Bernstein is a set of advanced utilities to manipulate SVG paths.

Visit the website to see [some demos](http://anthonydugois.com/bernstein/)!

### Installation

```
npm install --save bernstein
```

### Getting started

```javascript
import Bernstein from "bernstein"

// Parse a pathstring
let path = Bernstein.pathstring.parse("M0 0 L100 0 L100 100 L0 100 z")

// Perform some transforms on the path
path = Bernstein.rotate(path, Math.PI / 4, "center", "center")
path = Bernstein.translate(path, 25, 50)

// Get the new resulting pathstring
const pathstring = Bernstein.pathstring.build(path)
```

### Documentation

See the [official documentation](http://anthonydugois.com/bernstein/).

### Contributing

Clone the repo:

```
git clone https://github.com/anthonydugois/bernstein.git
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
