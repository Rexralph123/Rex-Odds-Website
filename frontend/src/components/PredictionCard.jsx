import { Lock } from "lucide-react";

import VerdictSlip from "./VerdictSlip";
import OddsDigits from "./OddsDigits";
import Badge from "./Badge";

export default function PredictionCard({
  p,
  locked,
  onLockedClick,
}) {
  return (
    <VerdictSlip locked={locked} glow={!locked}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] uppercase tracking-widest text-[#5C6E65] font-mono">
          {p.league}
        </span>

        <span className="text-[11px] uppercase tracking-widest text-[#5C6E65] font-mono">
          {p.kickoff}
        </span>
      </div>

      <p className="font-display text-lg text-white mb-4 tracking-wide leading-tight">
        {p.match}
      </p>

      {locked ? (
        <button
          onClick={onLockedClick}
          className="w-full text-left group"
        >
          <div className="flex items-center gap-1.5 mb-2 text-[#1FDB77]">
            <Lock size={13} />

            <span className="text-[11px] uppercase tracking-widest font-semibold">
              Premium Prediction
            </span>
          </div>

          <div className="flex items-end justify-between">
            <div className="h-4 w-28 rounded-sm bg-[#1D2420] group-hover:bg-[#22302A] transition-colors" />

            <div className="h-6 w-12 rounded-sm bg-[#1D2420] group-hover:bg-[#22302A] transition-colors" />
          </div>

          <p className="text-xs text-[#5C6E65] mt-3">
            Analysis: Premium members only.
          </p>
        </button>
      ) : (
        <>
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-[#5C6E65] mb-1">
                Prediction
              </p>

              <p className="text-white font-medium">
                {p.prediction}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[11px] uppercase tracking-widest text-[#5C6E65] mb-1">
                Odds
              </p>

              <OddsDigits value={p.odds} />
            </div>
          </div>

          <p className="text-xs text-[#8FA79B] leading-relaxed border-t border-[#1B211C] pt-3">
            {p.analysis}
          </p>

          <div className="mt-3">
            <Badge result={p.result} />
          </div>
        </>
      )}
    </VerdictSlip>
  );
}