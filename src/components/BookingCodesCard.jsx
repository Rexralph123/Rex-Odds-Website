import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useBookingCodes } from "../context/BookingCodeContext";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 bg-[#173B2A] text-[#3FE08C] text-xs font-mono uppercase tracking-widest px-3 py-2 rounded-sm border border-[#2A6B49] hover:bg-[#1FDB77] hover:text-[#08130D] transition-colors"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

const TYPE_LABEL = { "2odds": "2 ODDS", "5odds": "5 ODDS" };

export default function BookingCodesCard() {
  const { codes, loading } = useBookingCodes();
  const activeCodes = codes.filter((c) => c.active);

  if (loading || activeCodes.length === 0) return null;

  return (
    <div className="border border-[#1B211C] rounded-sm bg-[#0D120F] mb-14">
      <div className="px-5 py-4 border-b border-[#1B211C]">
        <p className="font-display text-xl text-white tracking-wide">TODAY'S BOOKING CODES</p>
        <p className="text-xs text-[#7C8F85] mt-1">Paste into your bookmaker app to load the full slip.</p>
      </div>

      <div className="divide-y divide-[#1B211C]">
        {activeCodes.map((c) => (
          <div key={c.id} className="flex items-center justify-between px-5 py-4 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#173B2A] text-[#3FE08C] text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-sm border border-[#2A6B49]">
                  {TYPE_LABEL[c.type] || c.type}
                </span>
                <p className="text-[10px] uppercase tracking-widest text-[#5C6E65] font-mono">{c.bookmaker}</p>
              </div>
              <p className="text-white font-mono text-lg tracking-wider">{c.code}</p>
              {c.note && <p className="text-xs text-[#7C8F85] mt-1">{c.note}</p>}
            </div>
            <CopyButton text={c.code} />
          </div>
        ))}
      </div>
    </div>
  );
}