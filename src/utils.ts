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

export const formatDateToMachineType = (inputDate: string): string => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatDateToHumanType = (inputDate: string): string => {
  const date = new Date(inputDate);
  const day = date.getDate();
  let month = date.toLocaleString('default', { month: 'long' });

  const lastChar = month.charAt(month.length - 1);
  if (lastChar === 'ь' || lastChar === 'й') {
    month = month.replace(/.$/, 'я');
  } else if (lastChar === 'т') {
    month += 'а';
  }

  return `${day} ${month}`;
};

export const formatString = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

