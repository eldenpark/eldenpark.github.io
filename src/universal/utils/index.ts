const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function getDisplayableDate(timestamp: number): string {
  const date = new Date(timestamp);
  return months[date.getMonth() - 1].substring(0, 3)
    + ' '
    + date.getDate()
    + ', '
    + date.getFullYear();
}
