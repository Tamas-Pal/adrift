export default function disperserFunction(p5, point, pointOrigin, canvasHeight, DISPLACE_AMT, LINE_HEIGHT) {
  // distance between original and current position
  let displacementDistance = p5.dist(
    point.x,
    point.y,
    pointOrigin.x,
    pointOrigin.y
  );
  // constrain displacementDistance to a smaller, height relative number
  let entropyMultiplier = p5.map(
    displacementDistance,
    0,
    canvasHeight,
    0.5,
    LINE_HEIGHT
  );
  // add randomness
  let displacement = p5.random(-DISPLACE_AMT, DISPLACE_AMT);
  // sum it all up in coords
  let entropyX = point.x + displacement * entropyMultiplier;
  let entropyY = point.y + displacement * entropyMultiplier;

  return {x: entropyX, y: entropyY}
}
