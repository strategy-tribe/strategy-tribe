export const ArrayOf = (num: number) => {
  return Array.from(Array(num));
};

export const ArrayOfNumbers = (length: number, starts = 0, maxNum?: number) => {
  const arr: number[] = [];

  for (let i = starts; i < length + starts; i++) {
    if (!maxNum || i < maxNum) arr.push(i);
  }
  return arr;
};
