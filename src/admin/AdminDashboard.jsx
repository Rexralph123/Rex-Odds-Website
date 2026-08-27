import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { usePredictions } from "../context/PredictionContext";
import { seedSubscribers } from "../data/mockData";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { predictions, setPredictions } = usePredictions();
  const [tab, setTab] = useState("predictions");
  const [form, setForm] = useState(null);

  if (!user || user.role !== "admin") {
    return (
      <div className="max-w-md mx-auto px-5 py-24 text-center">
        <p className="font-display text-2xl text-white mb-3">RESTRICTED</p>
        <p className="text-[#93A69B] mb-6 text-sm">This area is for administrators only. Log in with an admin account (e.g. anything@admin.com) to preview it.</p>
        <button onClick={() => navigate("/login")} className="bg-[#1FDB77] text-[#08130D] font-semibold uppercase text-sm tracking-wide px-6 py-3 rounded-sm">Log In</button>
      </div>
    );
  }

  const blank = { id: "", type: "2odds", match: "", league: "", kickoff: "", prediction: "", odds: "", analysis: "", result: "PENDING", published: true };

  const savePrediction = (e) => {
    e.preventDefault();
    if (form.id) {
      setPredictions((prev) => prev.map((p) => (p.id === form.id ? form : p)));
    } else {
      setPredictions((prev) => [...prev, { ...form, id: "p" + (prev.length + 1) + Date.now() }]);
    }
    setForm(null);
  };

  const removePrediction = (id) => setPredictions((prev) => prev.filter((p) => p.id !== id));
  const toggleResult = (id, result) => setPredictions((prev) => prev.map((p) => (p.id === id ? { ...p, result } : p)));
  const togglePublish = (id) => setPredictions((prev) => prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p)));

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
      <p className="font-display text-3xl text-white tracking-wide mb-1">ADMIN DASHBOARD</p>
      <p className="text-sm text-[#7C8F85] mb-8 font-mono">Demo only — writes affect local state, not a real database.</p>

      <div className="flex gap-2 mb-8 border-b border-[#1B211C]">
        {[["predictions", "Predictions"], ["subscribers", "Subscribers"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-4 py-2.5 text-sm uppercase tracking-wide border-b-2 ${tab === id ? "border-[#1FDB77] text-white" : "border-transparent text-[#7C8F85]"}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === "predictions" && (
        <>
          <div className="flex justify-end mb-4">
            <button onClick={() => setForm(blank)} className="flex items-center gap-1.5 bg-[#1FDB77] text-[#08130D] font-semibold uppercase text-xs tracking-wide px-4 py-2.5 rounded-sm hover:bg-[#3FE68B]">
              <Plus size={14} /> Add Prediction
            </button>
          </div>

          {form && (
            <form onSubmit={savePrediction} className="border border-[#22C55E44] rounded-sm p-6 bg-[#0D120F] mb-8 grid sm:grid-cols-2 gap-4">
              {[
                ["match", "Match", "text"], ["league", "League", "text"], ["kickoff", "Kickoff Time", "text"],
                ["prediction", "Prediction", "text"], ["odds", "Odds", "text"],
              ].map(([key, label]) => (
                <div key={key}>
                  <label className="text-xs uppercase tracking-widest text-[#7C8F85] mb-1.5 block">{label}</label>
                  <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required
                    className="w-full bg-[#121713] border border-[#2E3A34] rounded-sm px-3 py-2 text-white text-sm focus:outline-none focus:border-[#1FDB77]" />
                </div>
              ))}
              <div>
                <label className="text-xs uppercase tracking-widest text-[#7C8F85] mb-1.5 block">Category</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-[#121713] border border-[#2E3A34] rounded-sm px-3 py-2 text-white text-sm focus:outline-none focus:border-[#1FDB77]">
                  <option value="free">Free</option>
                  <option value="2odds">2 Odds</option>
                  <option value="5odds">5 Odds</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-widest text-[#7C8F85] mb-1.5 block">Analysis</label>
                <textarea value={form.analysis} onChange={(e) => setForm({ ...form, analysis: e.target.value })} rows={2}
                  className="w-full bg-[#121713] border border-[#2E3A34] rounded-sm px-3 py-2 text-white text-sm focus:outline-none focus:border-[#1FDB77]" />
              </div>
              <div className="sm:col-span-2 flex gap-3 pt-2">
                <button type="submit" className="bg-[#1FDB77] text-[#08130D] font-semibold uppercase text-xs tracking-wide px-5 py-2.5 rounded-sm">Save</button>
                <button type="button" onClick={() => setForm(null)} className="border border-[#2E3A34] text-white text-xs uppercase tracking-wide px-5 py-2.5 rounded-sm">Cancel</button>
              </div>
            </form>
          )}

          <div className="border border-[#1B211C] rounded-sm divide-y divide-[#1B211C] bg-[#0D120F]">
            {predictions.map((p) => (
              <div key={p.id} className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between px-5 py-4">
                <div>
                  <p className="text-white text-sm font-medium">{p.match} <span className="text-[#5C6E65] font-mono text-xs">({p.type})</span></p>
                  <p className="text-xs text-[#7C8F85]">{p.league} · {p.prediction} @ {p.odds}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <select value={p.result} onChange={(e) => toggleResult(p.id, e.target.value)}
                    className="bg-[#121713] border border-[#2E3A34] rounded-sm px-2 py-1.5 text-xs text-white focus:outline-none">
                    <option>PENDING</option><option>WON</option><option>LOST</option><option>VOID</option>
                  </select>
                  <button onClick={() => togglePublish(p.id)} className="text-xs px-2.5 py-1.5 rounded-sm border border-[#2E3A34] text-[#C7D2CC] hover:border-[#1FDB77]">
                    {p.published ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => setForm(p)} className="text-[#7C8F85] hover:text-white"><Pencil size={15} /></button>
                  <button onClick={() => removePrediction(p.id)} className="text-[#7C8F85] hover:text-[#E5787C]"><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "subscribers" && (
        <div className="border border-[#1B211C] rounded-sm divide-y divide-[#1B211C] bg-[#0D120F]">
          {seedSubscribers.map((s) => (
            <div key={s.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-white text-sm font-medium">{s.name}</p>
                <p className="text-xs text-[#7C8F85]">{s.email}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs font-mono uppercase tracking-widest ${s.status === "active" ? "text-[#3FE08C]" : "text-[#8B978F]"}`}>{s.status}</span>
                <p className="text-[11px] text-[#5C6E65]">exp. {s.expiry}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}