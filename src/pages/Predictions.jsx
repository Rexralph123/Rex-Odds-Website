import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePredictions } from "../context/PredictionContext";
import { useAuth } from "../context/AuthContext";

import Badge from "../components/Badge";
import PredictionCard from "../components/PredictionCard";
import PremiumModal from "../components/PremiumModal";

import { CONFIG } from "../config";
import { formatNaira } from "../utils/formatNaira";

export default function Predictions() {
  const navigate = useNavigate();
  const { isActive } = useAuth();
  const { predictions, results } = usePredictions();
  const [modalOpen, setModalOpen] = useState(false);
  const openLockModal = () => setModalOpen(true);

  const twoOdds = predictions.filter((p) => p.type === "2odds");
  const fiveOdds = predictions.filter((p) => p.type === "5odds");

  const today = new Date();
  const dayName = today.toLocaleDateString("en-GB", { weekday: "long" }).toUpperCase();
  const dateStr = today.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }).toUpperCase();

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <p className="font-display text-3xl sm:text-4xl text-white tracking-wide mb-2">TODAY'S FOOTBALL PREDICTIONS</p>
      <p className="text-[#93A69B] mb-2">Our latest selections for today's matches.</p>
      <p className="font-mono text-[#1FDB77] text-sm tracking-widest mb-14">{dayName}<br className="sm:hidden" /> {dateStr}</p>

      <p className="font-display text-2xl text-white tracking-wide mb-6">🔥 2 ODDS</p>
      <div className="grid sm:grid-cols-2 gap-5 mb-16">
        {twoOdds.map((p) => (
          <PredictionCard key={p.id} p={p} locked={!isActive} onLockedClick={openLockModal} />
        ))}
      </div>

      <p className="font-display text-2xl text-white tracking-wide mb-6">🔥 5 ODDS</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {fiveOdds.map((p) => (
          <PredictionCard key={p.id} p={p} locked={!isActive} onLockedClick={openLockModal} />
        ))}
      </div>

      <p className="font-display text-2xl text-white tracking-wide mb-6">PREVIOUS RESULTS</p>
      <div className="border border-[#1B211C] rounded-sm divide-y divide-[#1B211C] mb-16 bg-[#0D120F]">
        {results.map((r) => (
          <div key={r.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-white text-sm font-medium">{r.match}</p>
              <p className="text-xs text-[#5C6E65]">{r.league} · {r.prediction}</p>
            </div>
            <Badge result={r.result} />
          </div>
        ))}
      </div>

      {!isActive && (
        <div className="text-center border border-[#1B211C] rounded-sm py-10 px-6 bg-[#0D120F]">
          <p className="font-display text-2xl text-white tracking-wide mb-2">WANT TO SEE THE FULL PREDICTIONS?</p>
          <p className="text-[#93A69B] mb-6">Unlock all premium selections for {formatNaira(CONFIG.PREMIUM_PRICE_NGN)}/month.</p>
          <button onClick={() => navigate("/premium")} className="bg-[#1FDB77] text-[#08130D] font-semibold uppercase text-sm tracking-wide px-7 py-3.5 rounded-sm hover:bg-[#3FE68B] transition-colors">
            Get Premium
          </button>
        </div>
      )}

      <PremiumModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}