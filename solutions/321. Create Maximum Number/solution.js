/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[]}
 */
const maxNumber = function (nums1, nums2, k) {
  const m = nums1.length;
  const n = nums2.length;
  let result = [];

  const sliceNums = (nums, count) => {
    const result = [];
    let drop = nums.length - count;

    for (const num of nums) {
      while (drop && result.at(-1) < num) {
        result.pop();
        drop -= 1;
      }
      result.push(num);
    }
    return result.slice(0, count);
  };
  const isGreater = (numsA, numsB, a = 0, b = 0) => {
    while (a < numsA.length && b < numsB.length) {
      if (numsA[a] > numsB[b]) return true;
      if (numsA[a] < numsB[b]) return false;
      a += 1;
      b += 1;
    }
    return a < numsA.length;
  };
  const mergeSlice = (numsA, numsB) => {
    const result = [];
    let a = (b = 0);

    while (a < numsA.length || b < numsB.length) {
      isGreater(numsA, numsB, a, b) ? result.push(numsA[a++]) : result.push(numsB[b++]);
    }
    return result;
  };

  for (let count = Math.max(0, k - n); count <= Math.min(m, k); count++) {
    const slice1 = sliceNums(nums1, count);
    const slice2 = sliceNums(nums2, k - count);
    const mergeResult = mergeSlice(slice1, slice2);

    if (isGreater(result, mergeResult)) continue;
    result = mergeResult;
  }
  return result;
};
