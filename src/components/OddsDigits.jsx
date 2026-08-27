export default function OddsDigits({
  value,
  size = "text-2xl",
}) {
  return (
    <span
      className={`font-mono ${size} text-[#1FDB77] tabular-nums tracking-tight`}
    >
      {value}
    </span>
  );
}