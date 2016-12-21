import { boundingBox } from './index'

import { parse } from '../../pathstring/parse'
import { rect } from '../../primitives/rect'

test('should give the bounding box of the path', () => {
  const path = parse('M 100 100 V 0 Q 200 0 200 50 T 300 100 C 450 100 500 100 400 200 S 350 299 250 250 H 100 A 50 100 30 0 1 50 150 z')

  const test = boundingBox(path)
  const expected = rect(20.215454816112242, 0, 431.81046292910116, 282.4165221480674)

  expect(test).toEqual(expected)
})
