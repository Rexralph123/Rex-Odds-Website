import { Link } from "react-router-dom";
import logo from "../images/RexOdds Logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-[#1B211C] bg-[#0A0D0B]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="RexOdds" className="h-6 w-auto" />
            <span className="font-display text-lg text-white">REX<span className="text-[#1FDB77]">ODDS</span></span>
          </div>
          <p className="text-sm text-[#7C8F85] max-w-sm leading-relaxed">
            Daily football selections, backed by analysis, delivered straight, no noise, no false promises.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-[#5C6E65] mb-3">Platform</p>
          <div className="flex flex-col gap-2 text-sm text-[#C7D2CC]">
            <Link to="/" className="text-left hover:text-white w-fit">Home</Link>
            <Link to="/predictions" className="text-left hover:text-white w-fit">Predictions</Link>
            <Link to="/premium" className="text-left hover:text-white w-fit">Premium</Link>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-[#5C6E65] mb-3">Legal</p>
          <div className="flex flex-col gap-2 text-sm text-[#C7D2CC]">
            <span className="hover:text-white w-fit cursor-default">Contact</span>
            <span className="hover:text-white w-fit cursor-default">Terms</span>
            <span className="hover:text-white w-fit cursor-default">Privacy</span>
            <span className="hover:text-white w-fit cursor-default">Responsible Gambling</span>
          </div>
        </div>
      </div>
      <div className="border-t border-[#1B211C] px-5 sm:px-8 py-5">
        <p className="text-[11px] leading-relaxed text-[#5C6E65] max-w-3xl">
          Predictions are not guaranteed. Past results do not guarantee future performance.
          Gamble responsibly and only stake money you can afford to lose. RexOdds 18+.
        </p>
      </div>
    </footer>
  );
}
