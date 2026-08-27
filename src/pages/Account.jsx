import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { CONFIG } from "../config";
import { Crown } from "lucide-react";

export default function Account() {
  const navigate = useNavigate();
  const { user, subscription, isActive } = useAuth();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-lg mx-auto px-5 py-16 sm:py-24">
      <p className="font-display text-3xl text-white tracking-wide mb-8">MY ACCOUNT</p>
      <div className="border border-[#1B211C] rounded-sm p-6 bg-[#0D120F] mb-5 space-y-3">
        <div className="flex justify-between text-sm"><span className="text-[#7C8F85]">Name</span><span className="text-white">{user.name}</span></div>
        <div className="flex justify-between text-sm"><span className="text-[#7C8F85]">Email</span><span className="text-white">{user.email}</span></div>
        <div className="flex justify-between text-sm"><span className="text-[#7C8F85]">Role</span><span className="text-white capitalize">{user.role}</span></div>
      </div>
      <div className="border border-[#1B211C] rounded-sm p-6 bg-[#0D120F]">
        <p className="text-xs uppercase tracking-widest text-[#7C8F85] mb-3">Subscription</p>
        {isActive ? (
          <>
            <div className="flex items-center gap-2 mb-2"><Crown size={16} className="text-[#1FDB77]" /><span className="text-[#1FDB77] font-medium">Active — {CONFIG.PLAN_NAME}</span></div>
            <p className="text-sm text-[#7C8F85]">Renews / expires {subscription.expiry}</p>
          </>
        ) : (
          <>
            <p className="text-sm text-[#93A69B] mb-4">No active subscription.</p>
            <button onClick={() => navigate("/premium")} className="bg-[#1FDB77] text-[#08130D] font-semibold uppercase text-sm tracking-wide px-5 py-2.5 rounded-sm hover:bg-[#3FE68B] transition-colors">
              Get Premium
            </button>
          </>
        )}
      </div>
    </div>
  );
}