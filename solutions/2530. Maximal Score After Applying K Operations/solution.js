/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxKelements = function (nums, k) {
  const queue = new MaxPriorityQueue({ compare: (a, b) => b - a });
  let result = 0;

  for (const num of nums) {
    queue.enqueue(num);
  }

  while (k) {
    const num = queue.dequeue();

    result += num;
    k -= 1;
    queue.enqueue(Math.ceil(num / 3));
  }
  return result;
};
