"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { COMPLETIONS, PBTD_MKB } from "@/lib/completions";
import { depthToY, LOG_IMAGE } from "@/lib/depth-scale";
import { formatEotLabel } from "@/lib/format";
import { layoutLabels } from "@/lib/label-layout";

type LogOverlayProps = {
  highlighted: number | null;
  onHighlight: (n: number | null) => void;
};

export function LogOverlay({ highlighted, onHighlight }: LogOverlayProps) {
  const overlay = useMemo(() => {
    const items = COMPLETIONS.map((c) => ({
      id: c.number,
      y: depthToY(c.eot_mKB),
      text: formatEotLabel(c),
      color: c.color,
    }));
    const labels = layoutLabels(items, {
      imageWidth: LOG_IMAGE.width,
      imageHeight: LOG_IMAGE.height,
    });
    const byId = Object.fromEntries(labels.map((b) => [b.id, b]));
    return COMPLETIONS.map((c) => ({
      completion: c,
      y: depthToY(c.eot_mKB),
      text: formatEotLabel(c),
      box: byId[c.number],
    }));
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm"
      style={{ aspectRatio: `${LOG_IMAGE.width} / ${LOG_IMAGE.height}` }}
    >
      <Image
        src={LOG_IMAGE.src}
        alt="HRY WH103 lithology well log, 500–600 mMD"
        width={LOG_IMAGE.width}
        height={LOG_IMAGE.height}
        className="block h-full w-full select-none"
        priority
      />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${LOG_IMAGE.width} ${LOG_IMAGE.height}`}
        role="img"
        aria-label="End-of-tubing overlay"
      >
        <title>EOT depths for PCP completions 1–7</title>
        {overlay.map(({ completion, y, text, box }) => {
          const active =
            highlighted === null || highlighted === completion.number;
          const emphasis = highlighted === completion.number;
          const opacity = active ? 1 : 0.18;
          const strokeW = emphasis ? 2.8 : 2;
          return (
            <g
              key={completion.number}
              opacity={opacity}
              style={{ transition: "opacity 120ms ease" }}
            >
              <line
                x1={0}
                x2={LOG_IMAGE.width}
                y1={y}
                y2={y}
                stroke="#fff"
                strokeWidth={strokeW + 2.4}
                strokeLinecap="butt"
              />
              <line
                x1={0}
                x2={LOG_IMAGE.width}
                y1={y}
                y2={y}
                stroke={completion.color}
                strokeWidth={strokeW}
                strokeLinecap="butt"
              />
              <rect
                x={box.labelX}
                y={box.labelY - box.height / 2}
                width={box.width}
                height={box.height}
                rx={2.5}
                fill="#fff"
                fillOpacity={0.94}
                stroke={completion.color}
                strokeWidth={1.2}
              />
              <text
                x={box.labelX + 5}
                y={box.labelY + 0.5}
                fill={completion.color}
                fontFamily="IBM Plex Mono, ui-monospace, monospace"
                fontSize={11}
                fontWeight={600}
                dominantBaseline="middle"
              >
                {text}
              </text>
            </g>
          );
        })}
        {/* Invisible hit targets for hover */}
        {overlay.map(({ completion, y }) => (
          <rect
            key={`hit-${completion.number}`}
            x={0}
            y={y - 6}
            width={LOG_IMAGE.width}
            height={12}
            fill="transparent"
            className="pointer-events-auto cursor-pointer"
            onMouseEnter={() => onHighlight(completion.number)}
            onMouseLeave={() => onHighlight(null)}
          />
        ))}
      </svg>
    </div>
  );
}

export function CompletionsTable({
  highlighted,
  onHighlight,
}: LogOverlayProps) {
  return (
    <div className="overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-800 px-3 py-2">
        <h2 className="text-xs font-semibold tracking-wide text-slate-100 uppercase">
          PCP completions
        </h2>
        <p className="text-[11px] text-slate-300">
          EOT plotted on the log mMD scale. PBTD {PBTD_MKB.toFixed(2)} mKB all
          rows.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-left text-xs">
          <thead>
            <tr className="bg-amber-300 text-[11px] font-semibold text-slate-900">
              <th className="px-2 py-1.5">C#</th>
              <th className="px-2 py-1.5">Installed</th>
              <th className="px-2 py-1.5 text-right">EOT mKB</th>
              <th className="px-2 py-1.5 text-right">Days</th>
              <th className="bg-emerald-200 px-2 py-1.5 text-right">
                Gas TJ
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPLETIONS.map((c, i) => {
              const on = highlighted === c.number;
              return (
                <tr
                  key={c.number}
                  className={`${i % 2 === 1 ? "bg-slate-50" : "bg-white"} cursor-pointer ${on ? "ring-2 ring-inset ring-slate-800" : "hover:bg-slate-100"}`}
                  onMouseEnter={() => onHighlight(c.number)}
                  onMouseLeave={() => onHighlight(null)}
                >
                  <td className="px-2 py-1.5 font-semibold whitespace-nowrap">
                    <span
                      className="mr-1.5 inline-block h-2.5 w-2.5 rounded-sm align-middle"
                      style={{ backgroundColor: c.color }}
                      aria-hidden
                    />
                    C{c.number}
                  </td>
                  <td className="px-2 py-1.5 whitespace-nowrap text-slate-700">
                    {c.dateInstalled}
                    <span className="ml-1 text-slate-500">({c.year})</span>
                  </td>
                  <td className="px-2 py-1.5 text-right font-mono tabular-nums">
                    {c.eot_mKB.toFixed(2)}
                  </td>
                  <td className="px-2 py-1.5 text-right font-mono tabular-nums">
                    {c.pumpingDays}
                  </td>
                  <td className="bg-emerald-50 px-2 py-1.5 text-right font-mono tabular-nums">
                    {c.gasProduced_TJ.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function WsfAnalyser() {
  const [highlighted, setHighlighted] = useState<number | null>(null);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <LogOverlay highlighted={highlighted} onHighlight={setHighlighted} />
      <CompletionsTable
        highlighted={highlighted}
        onHighlight={setHighlighted}
      />
    </div>
  );
}
