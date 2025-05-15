/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minMoves = function (nums, k) {
  const n = nums.length;
  const ones = [];

  for (let index = 0; index < n; index++) {
    if (nums[index]) {
      ones.push(index);
    }
  }

  const getMedian = index => Math.floor((index + index + k - 1) / 2);
  const median = getMedian(0);
  let moves = 0;

  for (let index = 0; index < k; index++) {
    moves += Math.abs(ones[median] - ones[index]);
  }

  let result = moves;

  for (let index = 1; index <= ones.length - k; index++) {
    const oldMedian = getMedian(index - 1);
    const newMedian = getMedian(index);

    if (k % 2) {
      moves += ones[newMedian] - ones[oldMedian];
    }

    moves -= ones[newMedian] - ones[index - 1];
    moves += ones[index + k - 1] - ones[newMedian];
    result = Math.min(moves, result);
  }

  const nthSum = n => ((1 + n) * n) / 2;
  const leftNthSum = nthSum(Math.floor((k - 1) / 2));
  const rightNthSum = nthSum(Math.floor(k / 2));

  return result - leftNthSum - rightNthSum;
};
