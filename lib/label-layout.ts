export type LabelItem = {
  id: number;
  y: number;
  text: string;
};

export type LabelBox = {
  id: number;
  lineY: number;
  labelX: number;
  labelY: number;
  width: number;
  height: number;
};

const LABEL_COLUMNS = [12, 228, 444];
const LABEL_HEIGHT = 15;
const MIN_DY = 16;
const PADDING_X = 8;

export function estimateLabelWidth(
  text: string,
  charWidthPx = 6.7,
): number {
  return Math.round(text.length * charWidthPx + PADDING_X);
}

/**
 * Place labels in three horizontal columns so clustered EOT depths
 * (C4 / C5 / C7 around 547–548 m) do not overlap. Lines stay at true Y;
 * only the label box is staggered, remaining close to its line.
 */
export function layoutLabels(
  items: readonly LabelItem[],
  options?: { imageWidth?: number; imageHeight?: number; charWidthPx?: number },
): LabelBox[] {
  const imageWidth = options?.imageWidth ?? 835;
  const imageHeight = options?.imageHeight ?? 736;
  const charWidthPx = options?.charWidthPx ?? 6.7;

  const sorted = [...items].sort((a, b) => a.y - b.y || a.id - b.id);
  const colLastY = [-Infinity, -Infinity, -Infinity];
  const placed: LabelBox[] = [];

  for (const item of sorted) {
    const width = Math.min(estimateLabelWidth(item.text, charWidthPx), 250);
    let bestCol = 0;
    let bestGap = -Infinity;
    for (let c = 0; c < LABEL_COLUMNS.length; c++) {
      const gap = item.y - colLastY[c];
      if (gap > bestGap) {
        bestGap = gap;
        bestCol = c;
      }
    }

    let labelY = item.y;
    if (bestGap < MIN_DY) {
      const dir = item.id % 2 === 0 ? 1 : -1;
      labelY = item.y + dir * 9;
    }

    labelY = Math.min(
      imageHeight - LABEL_HEIGHT / 2 - 2,
      Math.max(LABEL_HEIGHT / 2 + 2, labelY),
    );

    let labelX = LABEL_COLUMNS[bestCol];
    if (labelX + width > imageWidth - 4) {
      labelX = Math.max(4, imageWidth - width - 4);
    }

    colLastY[bestCol] = labelY;
    placed.push({
      id: item.id,
      lineY: item.y,
      labelX,
      labelY,
      width,
      height: LABEL_HEIGHT,
    });
  }

  return placed;
}
