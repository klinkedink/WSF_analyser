import { describe, expect, it } from "vitest";
import { COMPLETIONS } from "./completions";
import { depthToY } from "./depth-scale";
import { formatEotLabel } from "./format";
import { layoutLabels } from "./label-layout";

describe("EOT label stagger", () => {
  const items = COMPLETIONS.map((c) => ({
    id: c.number,
    y: depthToY(c.eot_mKB),
    text: formatEotLabel(c),
  }));

  it("gives C4, C5 and C7 distinct horizontal slots", () => {
    const laid = layoutLabels(items);
    const byId = Object.fromEntries(laid.map((b) => [b.id, b]));
    const xs = new Set([byId[4].labelX, byId[5].labelX, byId[7].labelX]);
    expect(xs.size).toBe(3);
  });

  it("keeps each label close to its own line", () => {
    for (const box of layoutLabels(items)) {
      expect(Math.abs(box.labelY - box.lineY)).toBeLessThanOrEqual(12);
    }
  });

  it("does not overlap label boxes in the 547–548 m cluster", () => {
    const laid = layoutLabels(items);
    const cluster = laid.filter((b) => b.id === 4 || b.id === 5 || b.id === 7);
    for (let i = 0; i < cluster.length; i++) {
      for (let j = i + 1; j < cluster.length; j++) {
        const a = cluster[i];
        const b = cluster[j];
        const separateX =
          a.labelX + a.width <= b.labelX || b.labelX + b.width <= a.labelX;
        const separateY =
          Math.abs(a.labelY - b.labelY) >= (a.height + b.height) / 2;
        expect(separateX || separateY).toBe(true);
      }
    }
  });

  it("keeps labels inside the log image", () => {
    for (const box of layoutLabels(items, { imageWidth: 835, imageHeight: 736 })) {
      expect(box.labelX).toBeGreaterThanOrEqual(0);
      expect(box.labelX + box.width).toBeLessThanOrEqual(835);
      expect(box.labelY).toBeGreaterThan(0);
      expect(box.labelY).toBeLessThan(736);
    }
  });
});
