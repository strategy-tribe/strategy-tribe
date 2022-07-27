export function kFormatter(num: number) {
  let formatter = Intl.NumberFormat('en', { notation: 'compact' });

  return formatter.format(num);
}

export function roundToThree(num: number) {
  return Math.round((num + Number.EPSILON) * 1000) / 1000;
}
