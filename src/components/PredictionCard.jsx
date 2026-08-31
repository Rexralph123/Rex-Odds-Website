import { useState } from "react";
import { Lock, Copy, Check } from "lucide-react";

import VerdictSlip from "./VerdictSlip";
import OddsDigits from "./OddsDigits";
import Badge from "./Badge";

export default function PredictionCard({
  p,
  locked,
  onLockedClick,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();

    if (!p.code) return;

    try {
      await navigator.clipboard.writeText(p.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked (e.g. non-https/local) — fail silently
    }
  };

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
            Booking code: Premium members only.
          </p>
        </button>
      ) : (
        <>
          <div className="flex items-end justify-between mb-4">
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

          {/* BOOKING CODE */}
          <div className="border-t border-[#1B211C] pt-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] uppercase tracking-widest text-[#5C6E65]">
                Booking Code
                {p.bookmaker ? (
                  <span className="text-[#3FE08C]"> · {p.bookmaker}</span>
                ) : null}
              </p>
            </div>

            <button
              onClick={handleCopy}
              disabled={!p.code}
              className="w-full flex items-center justify-between gap-3 bg-[#0D120F] border border-dashed border-[#2E3A34] rounded-sm px-3.5 py-3 hover:border-[#1FDB77] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-mono text-lg text-[#1FDB77] tracking-[0.15em] tabular-nums">
                {p.code || "—"}
              </span>

              <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#93A69B] shrink-0">
                {copied ? (
                  <>
                    <Check size={13} className="text-[#1FDB77]" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    Copy
                  </>
                )}
              </span>
            </button>
          </div>

          <div className="mt-3">
            <Badge result={p.result} />
          </div>
        </>
      )}
    </VerdictSlip>
  );
}