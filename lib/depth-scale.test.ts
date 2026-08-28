import { describe, expect, it } from "vitest";
import { depthToY, fitDepthScale, LOG_TICKS, yToDepth } from "./depth-scale";

describe("depth scale from printed 25 m ticks", () => {
  const scale = fitDepthScale(LOG_TICKS);

  it("fits a near-linear px/m from the 500–600 mMD labels", () => {
    expect(scale.pxPerMetre).toBeGreaterThan(5.5);
    expect(scale.pxPerMetre).toBeLessThan(5.7);
  });

  it("maps each major tick to its measured Y within 0.5 px", () => {
    for (const tick of LOG_TICKS) {
      expect(depthToY(tick.depthM, scale)).toBeCloseTo(tick.yPx, 0);
      expect(Math.abs(depthToY(tick.depthM, scale) - tick.yPx)).toBeLessThan(
        0.5,
      );
    }
  });

  it("does not treat image top/bottom as 500/600 m", () => {
    expect(depthToY(500, scale)).toBeGreaterThan(50);
    expect(depthToY(600, scale)).toBeLessThan(700);
    expect(depthToY(500, scale)).not.toBe(0);
    expect(depthToY(600, scale)).not.toBe(736);
  });

  it("places formation tops on the printed contacts", () => {
    // Taroom Coal Measures 504.78 mMD is the thick line just below 500.
    expect(depthToY(504.78, scale)).toBeCloseTo(88, 0);
    // Eurombah 583.2 mMD is the thick line between 575 and 600.
    expect(depthToY(583.2, scale)).toBeCloseTo(526, 0);
  });

  it("inverts Y back to depth", () => {
    expect(yToDepth(depthToY(547.15, scale), scale)).toBeCloseTo(547.15, 5);
  });

  it("keeps C4/C5/C7 clustered in Y as on the log", () => {
    const y5 = depthToY(547.15, scale);
    const y7 = depthToY(547.28, scale);
    const y4 = depthToY(548.45, scale);
    expect(Math.abs(y7 - y5)).toBeLessThan(2);
    expect(y4 - y5).toBeGreaterThan(5);
    expect(y4 - y5).toBeLessThan(10);
  });
});
