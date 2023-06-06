export function formatDate(date: string | Date) {
  const formatted = new Date(date);
  const year = formatted.getFullYear();
  const month = String(formatted.getMonth() + 1).padStart(2, '0');
  const day = String(formatted.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
