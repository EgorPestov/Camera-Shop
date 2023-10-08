export const formatPrice = (number: number): string => {
  const numberString = number.toString();
  if (numberString.length <= 3) {
    return numberString;
  }
  const lastIndex = numberString.length - 3;
  const part1 = numberString.slice(0, lastIndex);
  const part2 = numberString.slice(lastIndex);
  return `${part1} ${part2}`;
};


