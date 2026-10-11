/**
 * Formats a number into Indian Rupee representation (e.g., ₹1,12,000)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || !isFinite(amount)) return '₹0';
  const isNegative = amount < 0;
  const absAmount = Math.round(Math.abs(amount));
  
  // Format with Indian numbering system (en-IN)
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(absAmount);

  return `${isNegative ? '-' : ''}₹${formatted}`;
}

/**
 * Formats a number with compact Indian notation (k or L)
 */
export function formatCompactINR(amount: number): string {
  if (isNaN(amount) || !isFinite(amount)) return '₹0';
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (abs >= 100000) {
    const lakhs = abs / 100000;
    return `${sign}₹${lakhs.toFixed(1).replace(/\.0$/, '')}L`;
  }
  if (abs >= 1000) {
    const thousands = abs / 1000;
    return `${sign}₹${thousands.toFixed(0)}k`;
  }
  return `${sign}₹${abs}`;
}

/**
 * Formats a percentage with single decimal or whole number
 */
export function formatPercent(value: number, decimals: number = 1): string {
  if (isNaN(value) || !isFinite(value)) return '0%';
  return `${value.toFixed(decimals).replace(/\.0$/, '')}%`;
}
