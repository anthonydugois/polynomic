import { m, M, l, L, h, H, v, V, q, Q, t, T, c, C, s, S, a, A, z, Z } from './index'

test('should return the object representation of a m point', () => {
  const test = m(50, 50, M(50, 50))
  const expected = {
    type: 'point',
    code: 'm',
    x: 100,
    y: 100,
    parameters: {},
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a M point', () => {
  const test = M(50, 50)
  const expected = {
    type: 'point',
    code: 'M',
    x: 50,
    y: 50,
    parameters: {},
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a l point', () => {
  const test = l(50, 50, M(50, 50))
  const expected = {
    type: 'point',
    code: 'l',
    x: 100,
    y: 100,
    parameters: {},
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a L point', () => {
  const test = L(50, 50)
  const expected = {
    type: 'point',
    code: 'L',
    x: 50,
    y: 50,
    parameters: {},
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a h point', () => {
  const test = h(50, M(50, 50))
  const expected = {
    type: 'point',
    code: 'h',
    x: 100,
    y: 50,
    parameters: {},
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a H point', () => {
  const test = H(50, M(0, 100))
  const expected = {
    type: 'point',
    code: 'H',
    x: 50,
    y: 100,
    parameters: {},
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a v point', () => {
  const test = v(50, M(50, 50))
  const expected = {
    type: 'point',
    code: 'v',
    x: 50,
    y: 100,
    parameters: {},
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a V point', () => {
  const test = V(50, M(100, 0))
  const expected = {
    type: 'point',
    code: 'V',
    x: 100,
    y: 50,
    parameters: {},
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a q point', () => {
  const test = q(50, 50, 100, 100, M(50, 50))
  const expected = {
    type: 'point',
    code: 'q',
    x: 150,
    y: 150,
    parameters: {
      x1: 100,
      y1: 100,
    },
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a Q point', () => {
  const test = Q(50, 50, 100, 100)
  const expected = {
    type: 'point',
    code: 'Q',
    x: 100,
    y: 100,
    parameters: {
      x1: 50,
      y1: 50,
    },
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a t point', () => {
  const test = t(100, 100, Q(50, 50, 100, 100))
  const expected = {
    type: 'point',
    code: 't',
    x: 200,
    y: 200,
    parameters: {
      x1: 150,
      y1: 150,
    },
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a T point', () => {
  const test = T(200, 200, Q(50, 50, 100, 100))
  const expected = {
    type: 'point',
    code: 'T',
    x: 200,
    y: 200,
    parameters: {
      x1: 150,
      y1: 150,
    },
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a c point', () => {
  const test = c(50, 50, 100, 100, 150, 150, M(50, 50))
  const expected = {
    type: 'point',
    code: 'c',
    x: 200,
    y: 200,
    parameters: {
      x1: 100,
      y1: 100,
      x2: 150,
      y2: 150,
    },
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a C point', () => {
  const test = C(50, 50, 100, 100, 150, 150)
  const expected = {
    type: 'point',
    code: 'C',
    x: 150,
    y: 150,
    parameters: {
      x1: 50,
      y1: 50,
      x2: 100,
      y2: 100,
    },
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a s point', () => {
  const test = s(100, 100, 150, 150, C(50, 50, 100, 100, 150, 150))
  const expected = {
    type: 'point',
    code: 's',
    x: 300,
    y: 300,
    parameters: {
      x1: 200,
      y1: 200,
      x2: 250,
      y2: 250,
    },
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a S point', () => {
  const test = S(250, 250, 300, 300, C(50, 50, 100, 100, 150, 150))
  const expected = {
    type: 'point',
    code: 'S',
    x: 300,
    y: 300,
    parameters: {
      x1: 200,
      y1: 200,
      x2: 250,
      y2: 250,
    },
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a a point', () => {
  const test = a(50, 100, 45, 1, 0, 100, 100, M(50, 50))
  const expected = {
    type: 'point',
    code: 'a',
    x: 150,
    y: 150,
    parameters: {
      rx: 50,
      ry: 100,
      rotation: 45,
      large: 1,
      sweep: 0,
    },
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a A point', () => {
  const test = A(50, 100, 45, 1, 0, 100, 100)
  const expected = {
    type: 'point',
    code: 'A',
    x: 100,
    y: 100,
    parameters: {
      rx: 50,
      ry: 100,
      rotation: 45,
      large: 1,
      sweep: 0,
    },
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a z point', () => {
  const test = z(M(50, 50))
  const expected = {
    type: 'point',
    code: 'z',
    x: 50,
    y: 50,
    parameters: {},
  }

  expect(test).toEqual(expected)
})

test('should return the object representation of a Z point', () => {
  const test = Z(M(0, 0))
  const expected = {
    type: 'point',
    code: 'Z',
    x: 0,
    y: 0,
    parameters: {},
  }

  expect(test).toEqual(expected)
})
