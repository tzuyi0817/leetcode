/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
const gcdValues = function (nums, queries) {
  const maxNum = Math.max(...nums);
  const countDivisor = Array.from({ length: maxNum + 1 }, () => 0);
  const countGcdPair = Array.from({ length: maxNum + 1 }, () => 0);
  const prefixCountGcdPair = [0];

  for (const num of nums) {
    for (let divisor = 1; divisor * divisor <= num; divisor++) {
      if (num % divisor) continue;

      countDivisor[divisor] += 1;

      if (num / divisor !== divisor) {
        countDivisor[num / divisor] += 1;
      }
    }
  }

  for (let gcd = maxNum; gcd >= 1; gcd--) {
    const count = countDivisor[gcd];

    countGcdPair[gcd] = (count * (count - 1)) / 2;

    for (let largeGcd = gcd * 2; largeGcd <= maxNum; largeGcd += gcd) {
      countGcdPair[gcd] -= countGcdPair[largeGcd];
    }
  }

  for (let gcd = 1; gcd <= maxNum; gcd++) {
    const count = prefixCountGcdPair[gcd - 1] + countGcdPair[gcd];

    prefixCountGcdPair.push(count);
  }

  const findGcdPair = nth => {
    let left = 1;
    let right = prefixCountGcdPair.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      prefixCountGcdPair[mid] < nth ? (left = mid + 1) : (right = mid - 1);
    }

    return left;
  };

  return queries.map(index => findGcdPair(index + 1));
};
