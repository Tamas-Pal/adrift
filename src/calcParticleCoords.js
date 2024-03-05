export default function calcParticleCoords (p5, point, pointOrigin, shorterAxisLength, attractor, entropy, noiseDisplacement) {
    // calculate a normalized interpolation weight
      // based on distance between origin and cursor position
      let pointerDistance = p5.dist(
        p5.mouseX,
        p5.mouseY,
        pointOrigin.x,
        pointOrigin.y
      );
      let distanceWeight = p5.map(
        pointerDistance,
        0,
        shorterAxisLength / 5,
        0,
        1,
        true
      );
      // calculate position based on cursor distance lerp:
      // cursor closer to particle origin will attract pixel to origin more,
      // cursor further from particle origin will move,
      // + add some randomness on x axis
      point.x =
        attractor.x * (1 - distanceWeight) +
        entropy.x * distanceWeight +
        noiseDisplacement;
      point.y =
        attractor.y * (1 - distanceWeight) + entropy.y * distanceWeight;
}