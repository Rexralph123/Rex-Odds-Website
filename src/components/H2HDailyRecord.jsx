// src/components/H2HDailyRecord.jsx
import { usePredictions } from "../context/PredictionContext";

const DAY_NAMES = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

function startOfWeek(d) {
  const date = new Date(d);
  const day = date.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day; // shift back to Monday
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function dateKey(d) {
  return d.toISOString().slice(0, 10);
}

const STATUS_STYLE = {
  WIN: { emoji: "🟢", label: "WIN", color: "text-[#3FE08C]" },
  LOSS: { emoji: "🔴", label: "LOSS", color: "text-[#E5787C]" },
  MIXED: { emoji: "🟡", label: "MIXED", color: "text-[#D8C56A]" },
  NONE: { emoji: "⚪", label: "—", color: "text-[#5C6E65]" },
};

export default function H2HDailyRecord() {
  const { predictions } = usePredictions();

  const settled = predictions.filter(
    (p) => (p.result === "WON" || p.result === "LOST") && p.created_at
  );

  const monday = startOfWeek(new Date());
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

  const byDay = {};
  weekDates.forEach((d) => {
    byDay[dateKey(d)] = { win: 0, loss: 0 };
  });

  settled.forEach((p) => {
    const key = dateKey(new Date(p.created_at));
    if (!byDay[key]) return; // outside this week
    if (p.result === "WON") byDay[key].win += 1;
    else byDay[key].loss += 1;
  });

  const rows = weekDates.map((d, i) => {
    const key = dateKey(d);
    const { win, loss } = byDay[key];
    let status = "NONE";
    if (win > 0 && loss === 0) status = "WIN";
    else if (loss > 0 && win === 0) status = "LOSS";
    else if (win > 0 && loss > 0) status = "MIXED";
    return { label: DAY_NAMES[i], status };
  });

  const winDays = rows.filter((r) => r.status === "WIN").length;
  const lossDays = rows.filter((r) => r.status === "LOSS").length;
  const decidedDays = winDays + lossDays;
  const winRate = decidedDays ? ((winDays / decidedDays) * 100).toFixed(1) : "0.0";

  if (decidedDays === 0) return null;

  return (
    <div className="border border-[#1B211C] rounded-sm bg-[#0D120F] mb-14 font-mono">
      <div className="px-5 py-4 border-b border-[#1B211C]">
        <p className="font-display text-xl text-white tracking-wide">H2H WEEKLY RECORD</p>
        <p className="text-xs text-[#7C8F85] mt-1">Daily verdict based on settled picks this week.</p>
      </div>

      <div className="px-5 py-4 space-y-1.5">
        {rows.map((r) => {
          const s = STATUS_STYLE[r.status];
          return (
            <div key={r.label} className="flex items-center justify-between text-sm">
              <span className="text-[#C7D2CC] tracking-widest">{r.label}</span>
              <span className={`flex items-center gap-2 ${s.color}`}>
                <span>{s.emoji}</span>
                <span className="tracking-widest">{s.label}</span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[#1B211C] px-5 py-4 flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-[#7C8F85]">
          Week Record: <span className="text-white">{winDays}W - {lossDays}L</span>
        </span>
        <span className="text-xs uppercase tracking-widest text-[#7C8F85]">
          Win Rate: <span className="text-[#1FDB77]">{winRate}%</span>
        </span>
      </div>
    </div>
  );
}