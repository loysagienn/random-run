export const stringifyNumber = (num: number, length = 0): string => {
  let numStr = String(num);

  while (numStr.length < length) {
    numStr = `0${numStr}`;
  }

  return numStr;
};
