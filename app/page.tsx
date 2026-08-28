import { WsfAnalyser } from "@/components/WsfAnalyser";
import { WELL } from "@/lib/completions";

export default function Home() {
  return (
    <div className="min-h-dvh">
      <header className="border-b border-slate-700 bg-slate-900 text-slate-100">
        <div className="mx-auto flex max-w-[90rem] flex-wrap items-end justify-between gap-3 px-4 py-3">
          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] text-slate-400 uppercase">
              Wellsite geology
            </p>
            <h1 className="text-lg font-semibold tracking-tight">
              WSF Analyser
            </h1>
          </div>
          <div className="text-right text-xs text-slate-300">
            <p className="font-semibold text-slate-100">{WELL.name}</p>
            <p>{WELL.basin}</p>
          </div>
        </div>
      </header>

      <section className="border-b border-slate-300 bg-white">
        <div className="mx-auto grid max-w-[90rem] gap-3 px-4 py-2.5 text-xs text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
          <p>
            <span className="font-semibold text-slate-900">Taroom CM top</span>
            <span className="ml-2 font-mono tabular-nums">504.78 mMD</span>
          </p>
          <p>
            <span className="font-semibold text-slate-900">Eurombah top</span>
            <span className="ml-2 font-mono tabular-nums">583.20 mMD</span>
          </p>
          <p>
            <span className="font-semibold text-slate-900">PBTD</span>
            <span className="ml-2 font-mono tabular-nums">
              {WELL.pbtd_mKB.toFixed(2)} mKB
            </span>
          </p>
          <p>
            <span className="font-semibold text-slate-900">Overlay</span>
            <span className="ml-2">EOT mKB on log mMD scale</span>
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[90rem] px-4 py-4">
        <p className="mb-3 max-w-3xl text-xs leading-relaxed text-slate-600">
          Horizontal lines are PCP end-of-tubing (EOT) for each completion,
          calibrated to the printed 500 / 525 / 550 / 575 / 600 mMD ticks.
          Labels: completion, install year, pumping days, gas produced.
          Completions 4, 5 and 7 sit near 547–548 m and are staggered so the
          text stays readable.
        </p>
        <WsfAnalyser />
      </main>
    </div>
  );
}
