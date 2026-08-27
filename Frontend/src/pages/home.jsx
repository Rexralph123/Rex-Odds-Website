import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target, Trophy, BarChart3, Clock, PieChart, Bell, Check } from "lucide-react";

import { usePredictions } from "../context/PredictionContext";

import VerdictSlip from "../components/VerdictSlip";
import OddsDigits from "../components/OddsDigits";
import PredictionCard from "../components/PredictionCard";
import PremiumModal from "../components/PremiumModal";

import { CONFIG } from "../config";
import { formatNaira } from "../utils/formatNaira";

export default function Home() {
  const navigate = useNavigate();
  const { predictions } = usePredictions();
  const [modalOpen, setModalOpen] = useState(false);
  const openLockModal = () => setModalOpen(true);

  const freePick = predictions.find((p) => p.type === "free");
  const twoOdds = predictions.filter((p) => p.type === "2odds").slice(0, 2);
  const fiveOdds = predictions.filter((p) => p.type === "5odds").slice(0, 3);

  const stats = [
    { label: "Win Rate (30d)", value: "71%" },
    { label: "Slips Posted", value: "184" },
    { label: "Avg. Odds", value: "1.9" },
    { label: "Active Members", value: "1,240" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#1B211C] grunge-bg">
        <div className="absolute -top-10 -right-24 w-[420px] h-[420px] bg-[#1FDB77] opacity-[0.10] rotate-12 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-20 w-[320px] h-[320px] bg-[#1FDB77] opacity-[0.08] -rotate-6 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 relative">
          <div className="flex items-center justify-center gap-6 sm:gap-10 mb-10 text-[#D6E0DA]">
            {[[BarChart3, "Stats"], [Target, "Predict"], [Trophy, "Win"]].map(([Icon, label], i) => (
              <div key={label} className="flex items-center gap-6 sm:gap-10">
                <div className="flex flex-col items-center gap-1.5">
                  <Icon size={20} className="text-[#1FDB77]" />
                  <span className="text-[10px] uppercase tracking-widest">{label}</span>
                </div>
                {i < 2 && <span className="h-8 w-px bg-[#2E3A34]" />}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-16 sm:pb-20 grid md:grid-cols-2 gap-12 items-center relative">
          <div className="text-center md:text-left">
            <h1 className="font-display text-3xl sm:text-5xl text-white tracking-wide leading-[1.05] mb-1">
              PLAY SMART
            </h1>
            <h2 className="font-brush text-[#1FDB77] text-5xl sm:text-7xl leading-[0.9] mb-4" style={{ textShadow: "0 0 30px #1FDB7744" }}>
              STAY AHEAD
            </h2>
            <p className="text-white text-sm sm:text-base font-semibold uppercase tracking-[0.25em] mb-2">
              Analyze. Predict. Profit.
            </p>
            <p className="text-[#93A69B] text-base max-w-md mx-auto md:mx-0 mb-8 leading-relaxed">
              Carefully selected daily football predictions, including our 2 Odds
              and 5 Odds selections.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <button onClick={() => navigate("/predictions")} className="bg-[#1FDB77] text-[#08130D] font-semibold uppercase text-sm tracking-wide px-6 py-3.5 rounded-sm hover:bg-[#3FE68B] transition-colors">
                View Today's Predictions
              </button>
              <button onClick={() => navigate("/premium")} className="border border-[#2E3A34] text-white font-medium uppercase text-sm tracking-wide px-6 py-3.5 rounded-sm hover:border-[#1FDB77] transition-colors">
                Get Premium
              </button>
            </div>
          </div>

          {freePick && (
            <div className="md:justify-self-end w-full max-w-sm mx-auto">
              <div className="mb-2 flex justify-end">
                <span className="bg-[#173B2A] text-[#3FE08C] text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-sm border border-[#2A6B49]">Free Pick · Live</span>
              </div>
              <VerdictSlip glow>
                <p className="text-[11px] uppercase tracking-widest text-[#5C6E65] font-mono mb-1">{freePick.league}</p>
                <p className="font-display text-2xl text-white mb-4 tracking-wide">{freePick.match}</p>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-[#5C6E65] mb-1">Prediction</p>
                    <p className="text-white font-medium">{freePick.prediction}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-widest text-[#5C6E65] mb-1">Odds</p>
                    <OddsDigits value={freePick.odds} size="text-3xl" />
                  </div>
                </div>
                <div className="border-t border-[#1B211C] pt-3 flex items-center justify-between">
                  <span className="text-[11px] text-[#5C6E65] font-mono uppercase tracking-widest">Total Winnings</span>
                  <span className="font-mono text-[#1FDB77] text-lg">₦350,000</span>
                </div>
              </VerdictSlip>
            </div>
          )}
        </div>

        <div className="border-t border-[#1B211C] bg-[#0A0D0B]/60">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[[Clock, "Live Odds"], [PieChart, "Detailed Stats"], [Bell, "Instant Alerts"], [BarChart3, "Win More"]].map(([Icon, label]) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <Icon size={18} className="text-[#1FDB77]" />
                <span className="text-[10px] uppercase tracking-widest text-[#8FA79B]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM PREVIEW */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="mb-10">
          <p className="font-display text-3xl text-white tracking-wide">🔥 2 ODDS</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {twoOdds.map((p) => (
            <PredictionCard key={p.id} p={p} locked onLockedClick={openLockModal} />
          ))}
        </div>

        <div className="mb-10">
          <p className="font-display text-3xl text-white tracking-wide">🔥 5 ODDS</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {fiveOdds.map((p) => (
            <PredictionCard key={p.id} p={p} locked onLockedClick={openLockModal} />
          ))}
        </div>

        <div className="text-center border border-[#1B211C] rounded-sm py-10 px-6 bg-[#0D120F]">
          <p className="font-display text-2xl text-white tracking-wide mb-2">UNLOCK PREMIUM PREDICTIONS</p>
          <p className="font-mono text-[#1FDB77] text-xl mb-6">{formatNaira(CONFIG.PREMIUM_PRICE_NGN)} / MONTH</p>
          <button onClick={() => navigate("/premium")} className="bg-[#1FDB77] text-[#08130D] font-semibold uppercase text-sm tracking-wide px-7 py-3.5 rounded-sm hover:bg-[#3FE68B] transition-colors">
            Get Premium
          </button>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-[#1B211C] bg-[#0D120F]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <p className="font-display text-3xl text-white tracking-wide mb-12">HOW IT WORKS</p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              ["01", "Create Your Account", "Sign up in under a minute with just your email."],
              ["02", "Subscribe", "Unlock full access for " + formatNaira(CONFIG.PREMIUM_PRICE_NGN) + "/month via Paystack."],
              ["03", "Access Premium Predictions", "See every 2 Odds and 5 Odds selection, daily."],
            ].map(([n, t, d]) => (
              <div key={n}>
                <p className="font-mono text-[#1FDB77] text-sm mb-3">{n}</p>
                <p className="font-display text-xl text-white tracking-wide mb-2">{t}</p>
                <p className="text-sm text-[#7C8F85] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PREMIUM */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <p className="font-display text-3xl text-white tracking-wide mb-10">WHY PREMIUM?</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {[
            "Daily selections", "2 Odds & 5 Odds", "Match analysis",
            "Daily updates", "Prediction history", "Simple and transparent approach",
          ].map((f) => (
            <div key={f} className="flex items-center gap-3 border border-[#1B211C] rounded-sm px-4 py-4 bg-[#0D120F]">
              <Check size={16} className="text-[#1FDB77] shrink-0" />
              <span className="text-[#D6E0DA] text-sm">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TRACK RECORD */}
      <section className="border-t border-[#1B211C] bg-[#0D120F]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
          <div className="flex items-center justify-between mb-2">
            <p className="font-display text-3xl text-white tracking-wide">TRACK RECORD</p>
          </div>
          <p className="text-xs text-[#5C6E65] mb-10 font-mono uppercase tracking-widest">Demo figures — live stats connect once results are logged</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center border border-[#1B211C] rounded-sm py-8 bg-[#0A0D0B]">
                <p className="font-mono text-[#1FDB77] text-3xl mb-2">{s.value}</p>
                <p className="text-[11px] uppercase tracking-widest text-[#7C8F85]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM CTA */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 text-center">
        <p className="font-display text-3xl sm:text-4xl text-white tracking-wide mb-3">READY FOR TODAY'S PICKS?</p>
        <p className="text-[#93A69B] mb-8">Get access to our premium football predictions for just {formatNaira(CONFIG.PREMIUM_PRICE_NGN)}/month.</p>
        <button onClick={() => navigate("/premium")} className="bg-[#1FDB77] text-[#08130D] font-semibold uppercase text-sm tracking-wide px-8 py-4 rounded-sm hover:bg-[#3FE68B] transition-colors">
          Get Premium
        </button>
      </section>

      <PremiumModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}