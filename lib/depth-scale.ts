export type DepthTick = {
  depthM: number;
  yPx: number;
};

/**
 * Printed major depth labels on lithology-log.png (835×736).
 * Y values are the pixel row of each 25 m grid line, measured from the
 * red 500 / 525 / 550 / 575 / 600 mMD ticks — not from image top/bottom.
 */
export const LOG_IMAGE = {
  src: "/lithology-log.png",
  width: 835,
  height: 736,
} as const;

export const LOG_TICKS: readonly DepthTick[] = [
  { depthM: 500, yPx: 61 },
  { depthM: 525, yPx: 201 },
  { depthM: 550, yPx: 340 },
  { depthM: 575, yPx: 480 },
  { depthM: 600, yPx: 620 },
];

export type DepthScale = {
  pxPerMetre: number;
  intercept: number;
};

/** Least-squares fit of yPx = pxPerMetre * depthM + intercept. */
export function fitDepthScale(
  ticks: readonly DepthTick[] = LOG_TICKS,
): DepthScale {
  const n = ticks.length;
  if (n < 2) {
    throw new Error("Need at least two depth ticks to fit a scale");
  }

  let sumD = 0;
  let sumY = 0;
  let sumDY = 0;
  let sumD2 = 0;
  for (const t of ticks) {
    sumD += t.depthM;
    sumY += t.yPx;
    sumDY += t.depthM * t.yPx;
    sumD2 += t.depthM * t.depthM;
  }

  const denom = n * sumD2 - sumD * sumD;
  const pxPerMetre = (n * sumDY - sumD * sumY) / denom;
  const intercept = (sumY - pxPerMetre * sumD) / n;
  return { pxPerMetre, intercept };
}

const DEFAULT_SCALE = fitDepthScale(LOG_TICKS);

/** Map a depth in metres (mMD / EOT mKB on this demo) to image Y pixels. */
export function depthToY(
  depthM: number,
  scale: DepthScale = DEFAULT_SCALE,
): number {
  return scale.pxPerMetre * depthM + scale.intercept;
}

export function yToDepth(
  yPx: number,
  scale: DepthScale = DEFAULT_SCALE,
): number {
  return (yPx - scale.intercept) / scale.pxPerMetre;
}
