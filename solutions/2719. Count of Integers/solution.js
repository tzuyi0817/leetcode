/**
 * @param {string} num1
 * @param {string} num2
 * @param {number} min_sum
 * @param {number} max_sum
 * @return {number}
 */
const MODULO = 10 ** 9 + 7;

const count = function (num1, num2, min_sum, max_sum) {
  const n = num2.length;
  const num1Padded = num1.padStart(n, '0');
  const maxCount = solveForSum(num1Padded, num2, n, max_sum);
  const minCount = solveForSum(num1Padded, num2, n, min_sum - 1);

  return (maxCount - minCount + MODULO) % MODULO;
};

function getCountRecursive(index, sum, minTight, maxTight, config) {
  if (sum < 0) return 0;
  if (index === config.n) return 1;

  const t1 = minTight ? 1 : 0;
  const t2 = maxTight ? 1 : 0;
  const key = ((index * (config.maxSum + 1) + sum) * 2 + t1) * 2 + t2;

  if (config.dp[key] !== -1) return config.dp[key];

  const minNum = minTight ? Number(config.num1[index]) : 0;
  const maxNum = maxTight ? Number(config.num2[index]) : 9;
  let result = 0;

  for (let d = minNum; d <= maxNum; d++) {
    const nextMinTight = minTight && d === minNum;
    const nextMaxTight = maxTight && d === maxNum;

    const count = getCountRecursive(index + 1, sum - d, nextMinTight, nextMaxTight, config);
    result = (result + count) % MODULO;
  }

  config.dp[key] = result;

  return result;
}

function solveForSum(num1, num2, n, maxSum) {
  if (maxSum < 0) return 0;

  const dpSize = n * (maxSum + 1) * 2 * 2;
  const config = {
    num1,
    num2,
    n,
    maxSum,
    dp: new Int32Array(dpSize).fill(-1),
  };

  return getCountRecursive(0, maxSum, true, true, config);
}
