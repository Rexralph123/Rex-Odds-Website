import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronDown } from "lucide-react";

import { useAuth } from "../context/AuthContext";

import VerdictSlip from "../components/VerdictSlip";

import { CONFIG } from "../config";
import { formatNaira } from "../utils/formatNaira";

export default function Premium() {
  const navigate = useNavigate();
  const { user, isActive, subscribe } = useAuth();
  const [openFaq, setOpenFaq] = useState(null);
  const [paying, setPaying] = useState(false);

  const faqs = [
    ["What do I get with Premium?", "Full access to every 2 Odds and 5 Odds selection we post, each with short match analysis, plus your prediction history."],
    ["How often are predictions posted?", "Daily, ahead of that day's fixtures. You'll see them appear on the Predictions page each morning."],
    ["Is there a guaranteed win?", "No. No prediction service can guarantee results. We publish our reasoning and full track record so you can judge for yourself, and we never claim a 'sure win'."],
  ];

  const handleSubscribe = () => {
    if (!user) { navigate("/login"); return; }
    setPaying(true);
    setTimeout(() => { subscribe(); setPaying(false); }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
      <div className="text-center mb-14">
        <p className="font-display text-3xl sm:text-4xl text-white tracking-wide mb-3">UNLOCK PREMIUM PREDICTIONS</p>
        <p className="text-[#93A69B]">Get access to our daily football selections and analysis.</p>
      </div>

      <div className="max-w-sm mx-auto mb-16">
        <VerdictSlip glow>
          <p className="text-center font-display text-xl text-[#1FDB77] tracking-widest mb-4">PREMIUM</p>
          <div className="text-center mb-6">
            <span className="font-mono text-5xl text-white">{formatNaira(CONFIG.PREMIUM_PRICE_NGN)}</span>
            <p className="text-[11px] uppercase tracking-widest text-[#7C8F85] mt-1">/ Month</p>
          </div>
          <ul className="space-y-3 mb-7">
            {["Daily football predictions", "2 Odds selections", "5 Odds selections", "Match analysis", "Premium selections", "Prediction history", "Daily updates"].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-[#D6E0DA]">
                <Check size={15} className="text-[#1FDB77] shrink-0" /> {f}
              </li>
            ))}
          </ul>
          {isActive ? (
            <div className="w-full text-center bg-[#173B2A] text-[#3FE08C] border border-[#2A6B49] font-semibold uppercase text-sm tracking-wide py-3.5 rounded-sm">
              You're Subscribed
            </div>
          ) : (
            <button
              onClick={handleSubscribe}
              disabled={paying}
              className="w-full bg-[#1FDB77] text-[#08130D] font-semibold uppercase text-sm tracking-wide py-3.5 rounded-sm hover:bg-[#3FE68B] transition-colors disabled:opacity-60"
            >
              {paying ? "Redirecting to Paystack…" : "Subscribe Now"}
            </button>
          )}
          <p className="text-center text-[11px] text-[#5C6E65] mt-4">Introductory price — pricing may change as the platform grows.</p>
        </VerdictSlip>
      </div>

      <div className="border-t border-[#1B211C] pt-12">
        {faqs.map(([q, a], i) => (
          <div key={q} className="border-b border-[#1B211C] py-5">
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between text-left">
              <span className="text-white font-medium">{q}</span>
              <ChevronDown size={18} className={`text-[#7C8F85] transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
            </button>
            {openFaq === i && <p className="text-sm text-[#93A69B] mt-3 leading-relaxed max-w-2xl">{a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}