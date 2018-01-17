/**
 * Source https://css-tricks.com/snippets/javascript/shuffle-array/
 */

export default o => {
  for (
    let j, x, i = o.length;
    i;
    j = parseInt(Math.random() * i, 10),
      x = o[--i],
      o[i] = o[j],
      o[j] = x
  );
  return o;
};
