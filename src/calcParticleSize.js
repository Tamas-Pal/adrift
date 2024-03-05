
export function calcResultParticleSize(p5, point, pointOrigin, shorterAxisLength, GRID_SIZE) {
    let displacementDistance = p5.dist(
      point.x,
      point.y,
      pointOrigin.x,
      pointOrigin.y
    );
    return p5.map(
      displacementDistance,
      0,
      shorterAxisLength / 5,
      GRID_SIZE,
      1,
      true
    );
  }
  export function calcWaveParticleSize(p5, point, canvasWidth, canvasHeight, shorterAxisLength, GRID_SIZE) {
    let centerDistance = p5.dist(
      point.x,
      point.y,
      canvasWidth / 2,
      canvasHeight / 2
    );
    return p5.map(
      centerDistance % (shorterAxisLength / p5.waveAnimator),
      0,
      shorterAxisLength / 4,
      GRID_SIZE * 0.75,
      1,
      true
    );
  }
