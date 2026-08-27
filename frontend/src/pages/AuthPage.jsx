import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "../context/AuthContext";

import CrestMark from "../components/CrestMark";

export default function AuthPage({ mode }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const isRegister = mode === "register";

  const submit = (e) => {
    e.preventDefault();
    // DEMO: real version calls supabase.auth.signInWithPassword / signUp.
    login(email || "demo@rexodds.com", name || "Demo User");
    navigate("/");
  };

  const googleSignIn = () => {
    // DEMO ONLY. Real version: supabase.auth.signInWithOAuth({ provider: "google" }),
    // which redirects to Google and back — no credentials are handled here directly.
    login("demo.google@gmail.com", "Google User");
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto px-5 py-16 sm:py-24">
      <div className="text-center mb-8">
        <CrestMark className="w-10 h-10 mx-auto mb-4" />
        <p className="font-display text-2xl text-white tracking-wide">{isRegister ? "CREATE YOUR ACCOUNT" : "WELCOME BACK"}</p>
      </div>

      <button
        onClick={googleSignIn}
        className="w-full flex items-center justify-center gap-3 bg-white text-[#1F2421] font-medium text-sm py-3 rounded-sm mb-4 hover:bg-[#EDEFEC] transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.61Z" />
          <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.19l-2.92-2.26c-.81.54-1.85.87-3.04.87-2.34 0-4.32-1.58-5.03-3.7H.95v2.33A9 9 0 0 0 9 18Z" />
          <path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.28-1.72V4.95H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.05l3.02-2.33Z" />
          <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.95l3.02 2.33C4.68 5.16 6.66 3.58 9 3.58Z" />
        </svg>
        Sign in with Google
      </button>

      <div className="flex items-center gap-3 mb-4">
        <span className="h-px flex-1 bg-[#1B211C]" />
        <span className="text-[10px] uppercase tracking-widest text-[#5C6E65]">or</span>
        <span className="h-px flex-1 bg-[#1B211C]" />
      </div>

      <form onSubmit={submit} className="border border-[#1B211C] rounded-sm p-7 bg-[#0D120F] space-y-4">
        {isRegister && (
          <div>
            <label className="text-xs uppercase tracking-widest text-[#7C8F85] mb-1.5 block">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full bg-[#121713] border border-[#2E3A34] rounded-sm px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-[#1FDB77]" />
          </div>
        )}
        <div>
          <label className="text-xs uppercase tracking-widest text-[#7C8F85] mb-1.5 block">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full bg-[#121713] border border-[#2E3A34] rounded-sm px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-[#1FDB77]" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-[#7C8F85] mb-1.5 block">Password</label>
          <div className="relative">
            <input type={showPw ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} required
              className="w-full bg-[#121713] border border-[#2E3A34] rounded-sm px-3.5 py-2.5 pr-10 text-white text-sm focus:outline-none focus:border-[#1FDB77]" />
            <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C8F85]">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <button type="submit" className="w-full bg-[#1FDB77] text-[#08130D] font-semibold uppercase text-sm tracking-wide py-3 rounded-sm hover:bg-[#3FE68B] transition-colors mt-2">
          {isRegister ? "Create Account" : "Log In"}
        </button>
        <p className="text-center text-xs text-[#5C6E65] pt-1">
          {isRegister ? "Already have an account? " : "New here? "}
          <button type="button" onClick={() => navigate(isRegister ? "/login" : "/register")} className="text-[#1FDB77] hover:underline">
            {isRegister ? "Log In" : "Create one"}
          </button>
        </p>
        <p className="text-center text-[10px] text-[#4A5952] pt-2 font-mono">Demo auth — Supabase Auth not connected in this preview.</p>
      </form>
    </div>
  );
}