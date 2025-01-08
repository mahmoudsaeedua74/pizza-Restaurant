export function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}

export function calcMinutesLeft(dateStr: string): number {
  const now = new Date();
  const estimated = new Date(dateStr);
  return Math.floor((estimated.getTime() - now.getTime()) / 60000); // التحويل من ملي ثانية إلى دقائق
}
