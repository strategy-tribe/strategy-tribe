export const ArrayOf = (num: number) => {
  return Array.from(Array(num));
};

export const ArrayOfNumbers = (length: number, starts = 0, maxNum?: number) => {
  const beginnin = starts > 0 ? starts : 0;
  const max = maxNum ?? beginnin + length;

  const arr: number[] = [];
  for (let i = beginnin; i < max; i++) {
    arr.push(i);
  }
  return arr;
};
