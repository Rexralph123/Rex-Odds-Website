export default function VerdictSlip({
  children,
  locked = false,
  glow = false,
  className = "",
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`relative bg-[#121713] border ${
          locked
            ? "border-[#2E3A34]"
            : "border-[#22C55E33]"
        } rounded-[2px] px-5 py-5 sm:px-6 sm:py-6 ${
          glow
            ? "shadow-[0_0_40px_-12px_#1FDB7755]"
            : ""
        }`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent, transparent 27px, #ffffff03 27px, #ffffff03 28px)",
        }}
      >
        {children}
      </div>

      <div className="absolute -left-1.5 top-0 bottom-0 flex flex-col justify-evenly">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="w-3 h-3 rounded-full bg-[#0A0D0B] border border-[#22303] block"
          />
        ))}
      </div>
    </div>
  );
}