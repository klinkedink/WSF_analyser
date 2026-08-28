export type Completion = {
  number: number;
  dateInstalled: string;
  year: number;
  pumpingDays: number;
  eot_mKB: number;
  gasProduced_TJ: number;
  color: string;
};

/**
 * Colourblind-friendly palette (Okabe–Ito + indigo), chosen to stay
 * readable on yellow sandstone, black coal, and grey siltstone.
 */
export const COMPLETION_COLORS: Record<number, string> = {
  1: "#0072B2",
  2: "#D55E00",
  3: "#009E73",
  4: "#CC79A7",
  5: "#E69F00",
  6: "#56B4E9",
  7: "#332288",
};

export const PBTD_MKB = 608.57;

export const WELL = {
  name: "HRY WH103",
  basin: "Surat Basin CSG / QGC",
  pbtd_mKB: PBTD_MKB,
  formations: [
    { name: "Taroom Coal Measures", top_mMD: 504.78 },
    { name: "Eurombah", top_mMD: 583.2 },
  ],
} as const;

export const COMPLETIONS: Completion[] = [
  {
    number: 1,
    dateInstalled: "08-May-2013",
    year: 2013,
    pumpingDays: 0,
    eot_mKB: 577.58,
    gasProduced_TJ: 160.26,
    color: COMPLETION_COLORS[1],
  },
  {
    number: 2,
    dateInstalled: "15-Feb-2016",
    year: 2016,
    pumpingDays: 99,
    eot_mKB: 559.89,
    gasProduced_TJ: 60.02,
    color: COMPLETION_COLORS[2],
  },
  {
    number: 3,
    dateInstalled: "17-Jun-2016",
    year: 2016,
    pumpingDays: 369,
    eot_mKB: 550.16,
    gasProduced_TJ: 191.08,
    color: COMPLETION_COLORS[3],
  },
  {
    number: 4,
    dateInstalled: "02-Jan-2018",
    year: 2018,
    pumpingDays: 260,
    eot_mKB: 548.45,
    gasProduced_TJ: 241.83,
    color: COMPLETION_COLORS[4],
  },
  {
    number: 5,
    dateInstalled: "09-Jan-2019",
    year: 2019,
    pumpingDays: 796,
    eot_mKB: 547.15,
    gasProduced_TJ: 584.97,
    color: COMPLETION_COLORS[5],
  },
  {
    number: 6,
    dateInstalled: "04-Aug-2021",
    year: 2021,
    pumpingDays: 269,
    eot_mKB: 557.57,
    gasProduced_TJ: 139.82,
    color: COMPLETION_COLORS[6],
  },
  {
    number: 7,
    dateInstalled: "06-Jan-2023",
    year: 2023,
    pumpingDays: 462,
    eot_mKB: 547.28,
    gasProduced_TJ: 135.77,
    color: COMPLETION_COLORS[7],
  },
];
