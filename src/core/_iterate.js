// @flow

import { createAbsParams } from "./_factories";
import { getAbsParams } from "./_params";

export function iterate<R>(iter: Iteratee<R>, segs: SegList, ...args: *[]): ?R {
  const params = createAbsParams();

  for (let index = 0, len = segs.length; index < len; ++index) {
    const result = iter(
      segs[index],
      index,
      segs,
      getAbsParams(segs[index], segs[index - 1], params),
      ...args,
    );

    if (typeof result !== "undefined") {
      return result;
    }
  }
}
