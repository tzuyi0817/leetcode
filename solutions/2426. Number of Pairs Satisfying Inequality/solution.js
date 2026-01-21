/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} diff
 * @return {number}
 */
const numberOfPairs = function (nums1, nums2, diff) {
  const n = nums1.length;
  const nums = [];

  for (let index = 0; index < n; index++) {
    const num = nums1[index] - nums2[index];

    nums.push(num);
  }

  const minNum = Math.min(...nums);
  const maxNum = Math.max(...nums);
  const offset = Math.abs(Math.min(minNum, minNum + diff)) + 1;
  const bit = new BIT(offset + Math.max(maxNum, maxNum + diff));
  let result = 0;

  for (const num of nums) {
    result += bit.query(num + diff + offset);
    bit.update(num + offset, 1);
  }

  return result;
};

class BIT {
  constructor(n) {
    this.bit = Array.from({ length: n + 1 }, () => 0);
  }

  update(num, delta) {
    while (num < this.bit.length) {
      this.bit[num] += delta;
      num += num & -num;
    }
  }

  query(num) {
    let result = 0;

    while (num > 0) {
      result += this.bit[num];
      num -= num & -num;
    }

    return result;
  }
}
