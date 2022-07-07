export function kFormatter(num: number) {
  let formatter = Intl.NumberFormat('en', { notation: 'compact' });

  return formatter.format(num);
}
