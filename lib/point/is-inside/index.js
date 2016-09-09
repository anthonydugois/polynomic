"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInside;
function isInside(point, path) {
  var inside = false;

  for (var i = 0, j = path.length - 1; i < path.length; i++) {
    var current = path[i];
    var previous = path[j];
    var slope = (previous.y - current.y) / (previous.x - current.x);
    var isVerticallyBetween = current.y > point.y !== previous.y > point.y;
    var isHorizontallyBefore = point.x < current.x + (point.y - current.y) / slope;

    if (isVerticallyBetween && isHorizontallyBefore) {
      inside = !inside;
    }

    j = i;
  }

  return inside;
}