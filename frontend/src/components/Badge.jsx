export default function Badge({ result }) {
  const styles = {
    WON: "bg-[#173B2A] text-[#3FE08C] border-[#2A6B49]",
    LOST: "bg-[#3A1B1B] text-[#E5787C] border-[#6B2A2A]",
    PENDING: "bg-[#1D2420] text-[#93A69B] border-[#2E3A34]",
    VOID: "bg-[#26241B] text-[#D8C56A] border-[#4A4530]",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-sm border text-[11px] font-mono tracking-widest ${styles[result]}`}
    >
      {result}
    </span>
  );
}