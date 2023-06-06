export const capitalize = (str: string) =>
  str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const lowercase = (str: string) => str.toLowerCase();

export const getFirstWord = (str: string) => str.split(' ')[0];
