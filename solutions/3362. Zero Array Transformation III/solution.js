/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
const maxRemoval = function (nums, queries) {
  const m = queries.length;
  const n = nums.length;
  const available = new MaxPriorityQueue();
  const running = new MinPriorityQueue();
  let queryIndex = 0;

  queries.sort((a, b) => a[0] - b[0]);

  for (let index = 0; index < n; index++) {
    const value = nums[index];

    while (queryIndex < m && queries[queryIndex][0] <= index) {
      const right = queries[queryIndex][1];

      available.enqueue(right);
      queryIndex += 1;
    }

    while (running.size() && running.front() < index) {
      running.dequeue();
    }

    while (value > running.size()) {
      if (!available.size() || available.front() < index) {
        return -1;
      }
      const right = available.dequeue();

      running.enqueue(right);
    }
  }

  return available.size();
};
