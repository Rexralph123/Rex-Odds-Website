import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldAlert } from "lucide-react";
import logo from "../images/RexOdds Logo.png";

import { useAuth } from "../admin/AdminAuthContext.jsx";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setChecking(true);
    try {
      // Real POST to the Flask/Postgres backend — it checks the password
      // hash and returns a session token. No client-side "is admin" logic.
      await login(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src={logo} alt="RexOdds" className="h-9 w-auto mx-auto mb-4 opacity-80" />
          <p className="font-display text-xl text-white tracking-widest">ADMIN ACCESS</p>
        </div>

        <form onSubmit={submit} className="border border-[#1B211C] rounded-sm p-7 bg-[#0D120F] space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-[#7C8F85] mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full bg-[#121713] border border-[#2E3A34] rounded-sm px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-[#1FDB77]"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-[#7C8F85] mb-1.5 block">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#121713] border border-[#2E3A34] rounded-sm px-3.5 py-2.5 pr-10 text-white text-sm focus:outline-none focus:border-[#1FDB77]"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C8F85]"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 text-[#E5787C] text-xs bg-[#2A1416] border border-[#4A2226] rounded-sm px-3 py-2.5">
              <ShieldAlert size={14} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={checking}
            className="w-full bg-[#1FDB77] text-[#08130D] font-semibold uppercase text-sm tracking-wide py-3 rounded-sm hover:bg-[#3FE68B] transition-colors disabled:opacity-60"
          >
            {checking ? "Verifying…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}