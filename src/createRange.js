export default (one, two) => {
  const [first, last] = [one, two].sort();
  return Array.from(new Array(last - first + 1), (val, index) => index + first);
};
