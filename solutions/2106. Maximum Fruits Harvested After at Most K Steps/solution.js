/**
 * @param {number[][]} fruits
 * @param {number} startPos
 * @param {number} k
 * @return {number}
 */
const maxTotalFruits = function (fruits, startPos, k) {
  const n = fruits.length;
  const [pos] = fruits[n - 1];
  const maxPos = Math.max(pos, startPos);
  const prefixSum = Array.from({ length: maxPos + 1 }, () => 0);
  const maxForwardSteps = Math.min(k, maxPos - startPos);
  const maxBackSteps = Math.min(k, startPos);
  let result = 0;

  for (let index = 0; index < n; index++) {
    const [pos, amount] = fruits[index];

    prefixSum[pos] += amount;
  }

  for (let pos = 1; pos <= maxPos; pos++) {
    prefixSum[pos] += prefixSum[pos - 1];
  }

  const getFruits = (backSteps, forwardSteps) => {
    const leftPos = Math.max(0, startPos - backSteps);
    const rightPos = Math.min(maxPos, startPos + forwardSteps);

    return prefixSum[rightPos] - (prefixSum[leftPos - 1] ?? 0);
  };

  for (let step = 0; step <= maxBackSteps; step++) {
    const forwardSteps = Math.max(0, k - step * 2);
    const total = getFruits(step, forwardSteps);

    result = Math.max(total, result);
  }

  for (let step = 0; step <= maxForwardSteps; step++) {
    const backSteps = Math.max(0, k - step * 2);
    const total = getFruits(backSteps, step);

    result = Math.max(total, result);
  }

  return result;
};
