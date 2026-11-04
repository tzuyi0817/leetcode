/**
 * @param {number[]} nums
 * @param {number} x
 * @param {number} k
 * @return {number}
 */
const minOperations = function (nums, x, k) {
  const minOps = getMinOps(nums, x);
  const m = minOps.length;
  const dp = Array.from({ length: m }, () => new Array(k + 1).fill(-1));

  const getMinTotalOps = (index, remain) => {
    if (m - index < (remain - 1) * x + 1) {
      return Number.MAX_SAFE_INTEGER;
    }

    if (index >= m || !remain) return 0;

    if (dp[index][remain] !== -1) return dp[index][remain];

    const skip = getMinTotalOps(index + 1, remain);
    const pick = minOps[index] + getMinTotalOps(index + x, remain - 1);
    const result = Math.min(skip, pick);

    dp[index][remain] = result;

    return result;
  };

  return getMinTotalOps(0, k);
};

function getMinOps(nums, x) {
  const n = nums.length;
  const lowerHeap = new MaxHeap();
  const upperHeap = new MinHeap();
  const delayLowerMap = new Map();
  const delayUpperMap = new Map();
  const result = [];
  let lowerSize = 0;
  let upperSize = 0;
  let lowerSum = 0;
  let upperSum = 0;

  const prune = (heap, delayMap) => {
    while (heap.size()) {
      const num = heap.top();
      const count = delayMap.get(num);

      if (!count) return;

      heap.pop();

      if (count === 1) {
        delayMap.delete(num);
      } else {
        delayMap.set(num, count - 1);
      }
    }
  };

  const balance = () => {
    prune(lowerHeap, delayLowerMap);
    prune(upperHeap, delayUpperMap);

    if (lowerSize < upperSize) {
      const num = upperHeap.pop();

      lowerHeap.push(num);
      lowerSize += 1;
      lowerSum += num;
      upperSize -= 1;
      upperSum -= num;
    } else if (lowerSize - upperSize > 1) {
      const num = lowerHeap.pop();

      upperHeap.push(num);
      lowerSize -= 1;
      lowerSum -= num;
      upperSize += 1;
      upperSum += num;
    }

    prune(lowerHeap, delayLowerMap);
    prune(upperHeap, delayUpperMap);
  };

  for (let index = 0; index < n; index++) {
    const num = nums[index];

    if (!lowerSize || num <= lowerHeap.top()) {
      lowerSum += num;
      lowerSize += 1;
      lowerHeap.push(num);
    } else {
      upperSum += num;
      upperSize += 1;
      upperHeap.push(num);
    }

    if (index >= x) {
      prune(lowerHeap, delayLowerMap);
      prune(upperHeap, delayUpperMap);

      const deleteNum = nums[index - x];

      if (deleteNum <= lowerHeap.top()) {
        const count = delayLowerMap.get(deleteNum) ?? 0;

        delayLowerMap.set(deleteNum, count + 1);
        lowerSize -= 1;
        lowerSum -= deleteNum;
      } else {
        const count = delayUpperMap.get(deleteNum) ?? 0;

        delayUpperMap.set(deleteNum, count + 1);
        upperSize -= 1;
        upperSum -= deleteNum;
      }
    }

    balance();

    if (index >= x - 1) {
      const median = lowerHeap.top();
      const ops = median * lowerSize - lowerSum + upperSum - median * upperSize;

      result.push(ops);
    }
  }

  return result;
}
