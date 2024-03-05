export default function attractorFunction(isResultState, pointOrigin, point) {
    if (isResultState) {
        return {
          x: (pointOrigin.x + point.x) / 2,
          y: (pointOrigin.y + point.y) / 2,
        };
      } else {
        return {
          x: point.x,
          y: point.y,
        };
      }
}