# Bernstein

Bernstein is a set of advanced utilities to manipulate SVG paths.

Visit the website to see some [some demos](http://anthonydugois.com/bernstein/)!

## Installation

```
npm install --save bernstein
```

## Getting started

```javascript
import Bernstein from "bernstein"

// Create a new Bernstein instance
const path = new Bernstein("M0 0 L100 0 L100 100 L0 100 z")

// Perform some transforms on the path
path
  .setOrigin("center", "center")
  .rotate(Math.PI / 4)
  .translate(25, 50)

// Get the resulting pathstring
const pathstring = path.getPathstring()
```

## Documentation

See the [official documentation](http://anthonydugois.com/bernstein/).

## Contributing

Clone the repo:

```
git clone https://github.com/anthonydugois/bernstein.git
```

Run tests:

```
npm run test
```

## License

MIT
