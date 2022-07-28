export const ArrayOf = (num: number) => {
  return Array.from(Array(num));
};

export const ArrayOfNumbers = (length: number, starts = 0, maxNum?: number) => {
  const arr: number[] = [];

  const beginnin = starts >= 0 ? starts : 0;

  for (let i = beginnin; i < length + beginnin; i++) {
    if (!maxNum || i < maxNum) arr.push(i);
  }
  return arr;
};
