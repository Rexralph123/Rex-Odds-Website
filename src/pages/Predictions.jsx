import { useNavigate } from "react-router-dom";
import { Flame, TrendingUp, Sparkles } from "lucide-react";

import { usePredictions } from "../context/PredictionContext";
import { useBookingCodes } from "../context/BookingCodeContext";

import Badge from "../components/Badge";
import PredictionCard from "../components/PredictionCard";
import BookingCodesCard from "../components/BookingCodesCard";
import H2HDailyRecord from "../components/H2HDailyRecord";

import { CONFIG } from "../config";
import { formatNaira } from "../utils/formatNaira";

export default function Predictions() {
  const navigate = useNavigate();
  const { predictions: contextPredictions } = usePredictions();
  const { codes: contextCodes } = useBookingCodes();

  const predictions = Array.isArray(contextPredictions) ? contextPredictions : [];
  const codes = Array.isArray(contextCodes) ? contextCodes : [];

  // Stats + results now come from booking codes, since that's the table
  // actually being kept up to date via the admin dashboard.
  const results = codes.filter(
    (c) => c.result === "WON" || c.result === "LOST" || c.result === "VOID"
  );

  const today = new Date();
  const dayName = today
    .toLocaleDateString("en-GB", { weekday: "long" })
    .toUpperCase();
  const dateStr = today
    .toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
    .toUpperCase();

  const wins = results.filter((r) => r.result === "WON").length;
  const decided = results.filter((r) => r.result === "WON" || r.result === "LOST").length;
  const winRate = decided ? Math.round((wins / decided) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-8 pb-10 border-b border-[#1B211C]">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FDB77] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1FDB77]" />
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#3FE08C] font-mono">
              Live for {dayName} · {dateStr}
            </span>
          </div>

          <p className="font-display text-3xl sm:text-4xl text-white tracking-wide mb-2">
            TODAY'S FOOTBALL PREDICTIONS
          </p>

          <p className="text-[#93A69B] max-w-md">
            Hand-picked selections across today's fixtures, with analysis behind
            every slip. New picks are posted daily before 10am.
          </p>
        </div>

        <div className="flex gap-6 sm:gap-8 shrink-0">
          <div>
            <p className="font-mono text-[#1FDB77] text-2xl">{winRate}%</p>
            <p className="text-[10px] uppercase tracking-widest text-[#7C8F85] mt-1">
              Win Rate
            </p>
          </div>

          <div>
            <p className="font-mono text-[#1FDB77] text-2xl">{codes.length}</p>
            <p className="text-[10px] uppercase tracking-widest text-[#7C8F85] mt-1">
              Codes Posted
            </p>
          </div>

          <div>
            <p className="font-mono text-[#1FDB77] text-2xl">{results.length}</p>
            <p className="text-[10px] uppercase tracking-widest text-[#7C8F85] mt-1">
              Tracked Results
            </p>
          </div>
        </div>
      </div>

      {/* BOOKING CODES */}
      <BookingCodesCard />

      {/* H2H WEEKLY RECORD */}
      <H2HDailyRecord />

      {/* FREE BANNER */}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        <span className="flex items-center gap-1.5 bg-[#173B2A] text-[#3FE08C] text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-sm border border-[#2A6B49]">
          <Sparkles size={11} />
          Free Access — Launch Period
        </span>

        <p className="text-sm text-[#7C8F85]">
          Every pick below is free to view during our launch period — no
          subscription required.
        </p>
      </div>

      {/* PICKS */}
      <div className="flex items-center gap-2 mb-6">
        <Flame size={18} className="text-[#1FDB77]" />
        <p className="font-display text-2xl text-white tracking-wide">
          TODAY'S PICKS
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {predictions.map((p) => (
          <PredictionCard key={p.id} p={p} locked={false} />
        ))}

        {predictions.length === 0 && (
          <div className="col-span-full text-center border border-dashed border-[#1B211C] rounded-sm py-14">
            <p className="text-[#7C8F85] text-sm">
              No picks yet — check back before 10am.
            </p>
          </div>
        )}
      </div>

      {/* RESULTS */}
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp size={18} className="text-[#1FDB77]" />
        <p className="font-display text-2xl text-white tracking-wide">
          PREVIOUS RESULTS
        </p>
      </div>

      <div className="border border-[#1B211C] rounded-sm divide-y divide-[#1B211C] mb-16 bg-[#0D120F]">
        {results.map((r) => (
          <div key={r.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-white text-sm font-medium">
                {r.bookmaker} <span className="text-[#5C6E65] font-mono text-xs">({r.type === "5odds" ? "5 Odds" : "2 Odds"})</span>
              </p>
              <p className="text-xs text-[#5C6E65] font-mono">{r.code}</p>
            </div>
            <Badge result={r.result} />
          </div>
        ))}

        {results.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-[#7C8F85]">
            Results will appear here once codes are settled.
          </div>
        )}
      </div>

      {/* PREMIUM TEASER */}
      <div className="text-center border border-[#1B211C] rounded-sm py-10 px-6 bg-[#0D120F]">
        <p className="font-display text-2xl text-white tracking-wide mb-2">
          PREMIUM IS ON ITS WAY
        </p>

        <p className="text-[#93A69B] mb-6 max-w-md mx-auto">
          Premium launches soon at {formatNaira(CONFIG.PREMIUM_PRICE_NGN)}/month.
          Until then, every pick above is free to view.
        </p>

        <button
          onClick={() => navigate("/premium")}
          className="bg-[#1FDB77] text-[#08130D] font-semibold uppercase text-sm tracking-wide px-7 py-3.5 rounded-sm hover:bg-[#3FE68B] transition-colors"
        >
          Get Notified
        </button>
      </div>
    </div>
  );
}