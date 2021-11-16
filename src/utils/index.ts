export function formatCurrency(transaction: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(transaction);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

export function formatShortDate(date: number) {
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    day: 'numeric'
  }).format(date);
}
