/**
 * @param {number[]} arr
 * @return {number}
 */
const maxChunksToSorted = function (arr) {
  const n = arr.length;
  const stack = [arr[0]];

  for (let index = 1; index < n; index++) {
    const current = arr[index];

    if (current >= stack.at(-1)) {
      stack.push(current);
      continue;
    }
    const max = stack.at(-1);

    while (stack.at(-1) > current) stack.pop();

    stack.push(max);
  }
  return stack.length;
};
