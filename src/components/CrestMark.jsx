export default function CrestMark({ className = "" }) {
  return (
    <svg viewBox="0 0 44 40" className={className} fill="none">
      <path
        d="M4 24c0-6 3-10 7-13 1-4 5-7 10-8 6-1 12 1 15 6 2 3 3 7 2 11-1 5-4 8-8 9l1 6-5-1-2-4c-3 0-6-1-8-3l-4 1-2-4H6c-1-1-2-2-2-3Z"
        fill="#0F1512"
        stroke="#1FDB77"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      <path
        d="M18 15l2 3 2-3M12 22l2 2M9 26l2 1.5"
        stroke="#1FDB77"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      <circle
        cx="26"
        cy="14"
        r="1.4"
        fill="#1FDB77"
      />
    </svg>
  );
}