import { describe, expect, it } from "vitest";
import { COMPLETIONS } from "./completions";
import { formatEotLabel, formatGasTJ } from "./format";

describe("gas and EOT label formatting", () => {
  it("keeps two decimals and a period separator", () => {
    expect(formatGasTJ(584.97)).toBe("584.97");
    expect(formatGasTJ(60.02)).toBe("60.02");
    expect(formatGasTJ(585)).toBe("585.00");
  });

  it("does not insert thousands separators", () => {
    expect(formatGasTJ(584.97)).not.toContain(",");
    expect(formatGasTJ(1584.97)).toBe("1584.97");
  });

  it("builds the overlay label from completion number, year, days, and gas", () => {
    const c5 = COMPLETIONS.find((c) => c.number === 5)!;
    expect(formatEotLabel(c5)).toBe("C5  2019  796d  584.97 TJ");
  });

  it("formats every demo completion without commas", () => {
    for (const c of COMPLETIONS) {
      const label = formatEotLabel(c);
      expect(label).not.toContain(",");
      expect(label).toMatch(
        new RegExp(
          `^C${c.number}  ${c.year}  ${c.pumpingDays}d  \\d+\\.\\d{2} TJ$`,
        ),
      );
    }
  });
});
