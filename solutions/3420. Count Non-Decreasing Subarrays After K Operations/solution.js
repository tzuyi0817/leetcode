/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const countNonDecreasingSubarrays = function (nums, k) {
  const n = nums.length;
  const deque = [];
  let end = n - 1;
  let cost = 0;
  let result = 0;

  for (let index = n - 1; index >= 0; index--) {
    const num = nums[index];

    while (deque.length && nums[deque.at(-1)] < num) {
      const l = deque.pop();
      const diff = num - nums[l];
      const r = deque.length ? deque.at(-1) : end + 1;

      cost += diff * (r - l);
    }

    deque.push(index);

    while (cost > k) {
      const r = deque[0];
      const diff = nums[r] - nums[end];

      if (r === end) {
        deque.shift();
      }

      cost -= diff;
      end -= 1;
    }

    result += end - index + 1;
  }

  return result;
};
