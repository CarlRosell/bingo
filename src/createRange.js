const sortNumbers = (a, b) => a - b;

export const createNumberRange = (a, b) => {
  const [first, last] = [a, b].sort(sortNumbers);
  return Array.from(new Array(last - first + 1), (val, index) => index + first);
};

const CHARS = [...'abcdefghijklmnopqrstuvwxyzåäö'];

export const createAlphaRange = (firstLetter, lastLetter) => {
  const [firstIndex, lastIndex] = [
    CHARS.indexOf(firstLetter.toLowerCase()),
    CHARS.indexOf(lastLetter.toLowerCase())
  ].sort(sortNumbers);
  let availableChars = CHARS;
  if (firstIndex >= 0 && lastIndex >= 0) {
    availableChars = CHARS.slice(firstIndex, lastIndex + 1);
  }
  return availableChars.map(a => `${a.toUpperCase()}${a}`);
};
