import { Lock, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { CONFIG } from "../config";
import { formatNaira } from "../utils/formatNaira";

export default function PremiumModal({ open, onClose }) {
  const navigate = useNavigate();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-[#0F1512] border border-[#22C55E44] rounded-sm p-7 animate-[modalIn_.18s_ease-out]">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#7C8F85] hover:text-white">
          <X size={18} />
        </button>
        <div className="w-12 h-12 rounded-full bg-[#173B2A] border border-[#2A6B49] flex items-center justify-center mb-5">
          <Lock size={20} className="text-[#1FDB77]" />
        </div>
        <h3 className="font-display text-2xl text-white mb-2 tracking-wide">PREMIUM PREDICTION</h3>
        <p className="text-sm text-[#93A69B] mb-4 leading-relaxed">
          This selection is available to Premium members. Unlock today's complete 2 Odds
          and 5 Odds predictions for:
        </p>
        <p className="font-mono text-[#1FDB77] text-3xl mb-6">
          {formatNaira(CONFIG.PREMIUM_PRICE_NGN)}<span className="text-sm text-[#7C8F85]">/month</span>
        </p>
        <button
          onClick={() => { onClose(); navigate("/premium"); }}
          className="w-full bg-[#1FDB77] text-[#08130D] font-semibold uppercase tracking-wide text-sm py-3 rounded-sm hover:bg-[#3FE68B] transition-colors mb-3"
        >
          Unlock Premium
        </button>
        <button onClick={onClose} className="w-full text-center text-sm text-[#7C8F85] hover:text-white py-1">
          Maybe Later
        </button>
      </div>
    </div>
  );
}