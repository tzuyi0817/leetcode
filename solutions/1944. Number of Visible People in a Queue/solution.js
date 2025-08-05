/**
 * @param {number[]} heights
 * @return {number[]}
 */
const canSeePersonsCount = function (heights) {
  const n = heights.length;
  const stack = [];
  const result = Array.from({ length: n }, () => 0);

  for (let index = 0; index < n; index++) {
    const height = heights[index];

    while (stack.length && heights[stack.at(-1)] <= height) {
      const people = stack.pop();

      result[people] += 1;
    }

    if (stack.length) {
      result[stack.at(-1)] += 1;
    }

    stack.push(index);
  }

  return result;
};
