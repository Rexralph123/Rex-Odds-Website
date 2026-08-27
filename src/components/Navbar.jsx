import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  LogOut,
  User,
  Settings,
  Crown,
} from "lucide-react";

import CrestMark from "./CrestMark";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isActive, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/predictions", label: "Predictions" },
    { to: "/premium", label: "Premium" },
  ];

  const isActivePath = (to) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0D0B]/90 backdrop-blur border-b border-[#1B211C]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <CrestMark className="w-7 h-7" />
          <span className="font-display text-xl tracking-wide text-white">
            REX<span className="text-[#1FDB77]">ODDS</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm tracking-wide uppercase font-medium transition-colors ${
                isActivePath(l.to) ? "text-[#1FDB77]" : "text-[#C7D2CC] hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin" className="text-sm text-[#C7D2CC] hover:text-white flex items-center gap-1.5">
                  <Settings size={15} /> Admin
                </Link>
              )}
              <Link to="/account" className="text-sm text-[#C7D2CC] hover:text-white flex items-center gap-1.5">
                <User size={15} /> {user.name.split(" ")[0]}
                {isActive && <Crown size={13} className="text-[#1FDB77]" />}
              </Link>
              <button onClick={handleLogout} className="text-sm text-[#93A69B] hover:text-white flex items-center gap-1.5">
                <LogOut size={15} />
              </button>
            </>
          ) : (
            <Link to="/login" className="text-sm text-[#C7D2CC] hover:text-white">Log In</Link>
          )}
          <Link
            to="/premium"
            className="bg-[#1FDB77] text-[#08130D] text-sm font-semibold tracking-wide uppercase px-4 py-2 rounded-sm hover:bg-[#3FE68B] transition-colors"
          >
            Get Premium
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#1B211C] px-5 py-4 flex flex-col gap-4 bg-[#0A0D0B]">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-left text-[#C7D2CC] text-sm uppercase tracking-wide">
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin" onClick={() => setOpen(false)} className="text-left text-[#C7D2CC] text-sm">Admin</Link>
              )}
              <Link to="/account" onClick={() => setOpen(false)} className="text-left text-[#C7D2CC] text-sm">My Account</Link>
              <button onClick={() => { handleLogout(); setOpen(false); }} className="text-left text-[#93A69B] text-sm">Log Out</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="text-left text-[#C7D2CC] text-sm">Log In</Link>
          )}
          <Link
            to="/premium"
            onClick={() => setOpen(false)}
            className="bg-[#1FDB77] text-[#08130D] text-sm font-semibold uppercase px-4 py-2.5 rounded-sm text-center"
          >
            Get Premium
          </Link>
        </div>
      )}
    </header>
  );
}