const sortNumbers = (a, b) => a - b;

export default (a, b) => {
  const [first, last] = [a, b].sort(sortNumbers);
  return Array.from(new Array(last - first + 1), (val, index) => index + first);
};
