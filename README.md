# WSF Analyser

Overlay PCP **end-of-tubing (EOT)** depths on a lithology well log for Surat Basin CSG work. Demo well: **HRY WH103**.

This is a Next.js App Router app (React 19, TypeScript, Tailwind CSS v4). Completions are hardcoded; there is no file upload or LAS parsing yet.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm test` | Unit tests (depth calibration, labels, number format) |
| `npm run lint` | ESLint |

Requires Node 20+.

## What you should see

- The lithology log as the background (500–600 mMD ticks).
- Seven full-width coloured EOT lines, one per PCP completion.
- Labels in the same colour: `C5  2019  796d  584.97 TJ` (two decimal places, no thousands separators).
- A completions table/legend (colour, EOT, year, days, gas). Hover a row to emphasise that line.

Y is mapped from the printed depth ticks on `public/lithology-log.png`, not from the top and bottom of the image. EOT mKB is plotted as the same numeric depth as the log mMD scale.

## Demo data

| C# | Installed | Year | Pumping days | EOT mKB | Gas TJ |
| --- | --- | --- | --- | --- | --- |
| 1 | 08-May-2013 | 2013 | 0 | 577.58 | 160.26 |
| 2 | 15-Feb-2016 | 2016 | 99 | 559.89 | 60.02 |
| 3 | 17-Jun-2016 | 2016 | 369 | 550.16 | 191.08 |
| 4 | 02-Jan-2018 | 2018 | 260 | 548.45 | 241.83 |
| 5 | 09-Jan-2019 | 2019 | 796 | 547.15 | 584.97 |
| 6 | 04-Aug-2021 | 2021 | 269 | 557.57 | 139.82 |
| 7 | 06-Jan-2023 | 2023 | 462 | 547.28 | 135.77 |

PBTD is 608.57 mKB for all rows. Formation tops on the log: Taroom Coal Measures 504.78 mMD, Eurombah 583.2 mMD.
