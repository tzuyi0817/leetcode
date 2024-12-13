/**
 * @param {number[]} nums
 * @return {number}
 */
const findScore = function (nums) {
  const n = nums.length;
  const elements = nums.map((num, index) => ({ num, index }));
  const visited = Array.from({ length: n }, () => false);
  let result = 0;

  elements.sort((a, b) => a.num - b.num);

  for (const { num, index } of elements) {
    if (visited[index]) continue;

    result += num;
    visited[index] = true;

    if (index - 1 > -1) {
      visited[index - 1] = true;
    }
    if (index + 1 < n) {
      visited[index + 1] = true;
    }
  }
  return result;
};
