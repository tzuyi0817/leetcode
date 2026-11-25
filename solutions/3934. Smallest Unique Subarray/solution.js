/**
 * @param {number[]} nums
 * @return {number}
 */
const smallestUniqueSubarray = function (nums) {
  const BASE_A = 100_019;
  const BASE_B = 100_043;
  const MOD_A = 10 ** 9 + 7;
  const MOD_B = 10 ** 9 + 9;
  const n = nums.length;
  let left = 1;
  let right = n;

  const hasUniqueSub = len => {
    const hashMap = new Map();
    let lenA = 1;
    let lenB = 1;
    let hashA = 0;
    let hashB = 0;

    for (let index = 0; index < len; index++) {
      lenA = (lenA * BASE_A) % MOD_A;
      lenB = (lenB * BASE_B) % MOD_B;
    }

    for (let index = 0; index < len; index++) {
      const num = nums[index];

      hashA = (hashA * BASE_A + num) % MOD_A;
      hashB = (hashB * BASE_B + num) % MOD_B;
    }

    hashMap.set(`${hashA},${hashB}`, 1);

    for (let index = len; index < n; index++) {
      const num = nums[index];
      const prev = nums[index - len];

      hashA = (hashA * BASE_A + num - ((lenA * prev) % MOD_A) + MOD_A) % MOD_A;
      hashB = (hashB * BASE_B + num - ((lenB * prev) % MOD_B) + MOD_B) % MOD_B;

      const key = `${hashA},${hashB}`;
      const count = hashMap.get(key) ?? 0;

      hashMap.set(key, count + 1);
    }

    for (const count of hashMap.values()) {
      if (count === 1) return true;
    }

    return false;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    hasUniqueSub(mid) ? (right = mid - 1) : (left = mid + 1);
  }

  return left;
};
