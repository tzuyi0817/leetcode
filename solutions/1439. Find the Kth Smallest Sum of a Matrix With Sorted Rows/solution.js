/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number}
 */
const kthSmallest = function (mat, k) {
  const m = mat.length;
  const n = mat[0].length;
  let currentSums = mat[0];

  const kSmallestSums = (nums1, nums2, k) => {
    const minHeap = new MinPriorityQueue({ priority: ({ sum }) => sum });
    const result = [];

    for (const [index, element] of nums1.entries()) {
      const sum = element + nums2[0];

      minHeap.enqueue({ a: index, b: 0, sum });
    }

    while (minHeap.size() && result.length < k) {
      const { a, b, sum } = minHeap.dequeue().element;

      result.push(sum);

      if (b + 1 < n) {
        const nextSum = nums1[a] + nums2[b + 1];

        minHeap.enqueue({ a, b: b + 1, sum: nextSum });
      }
    }

    return result;
  };

  for (let row = 1; row < m; row++) {
    currentSums = kSmallestSums(currentSums, mat[row], k);
  }

  return currentSums[k - 1];
};
