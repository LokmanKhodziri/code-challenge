// Format number to avoid scientific notation
export function formatNumber(num) {
  if (num === 0) return "0";
  if (!num || isNaN(num)) return "";

  // For very small numbers, use toFixed with more decimal places
  if (Math.abs(num) < 0.000001) {
    // For extremely small numbers, show up to 18 decimal places
    return num.toFixed(18).replace(/\.?0+$/, "");
  }

  // For regular numbers, use toFixed(8) and remove trailing zeros
  return num.toFixed(8).replace(/\.?0+$/, "");
}
