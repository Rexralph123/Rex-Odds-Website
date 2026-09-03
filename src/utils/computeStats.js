export function computeSlipStats(codes = []) {
  const settled = codes.filter((c) => c.result === "WON" || c.result === "LOST");
  const won = settled.filter((c) => c.result === "WON").length;

  const winRate = settled.length ? Math.round((won / settled.length) * 100) : 0;

  return {
    winRate,
    slipsPosted: codes.length,
    settledCount: settled.length,
    wonCount: won,
  };
}

export function computeAvgOdds(predictions = []) {
  const nums = predictions
    .map((p) => parseFloat(p.odds))
    .filter((n) => !isNaN(n));

  if (!nums.length) return "—";

  const avg = nums.reduce((sum, n) => sum + n, 0) / nums.length;
  return avg.toFixed(1);
}