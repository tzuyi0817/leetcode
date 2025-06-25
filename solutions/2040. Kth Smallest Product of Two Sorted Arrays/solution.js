/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
const kthSmallestProduct = function (nums1, nums2, k) {
  const negNums1 = [];
  const posNums1 = [];
  let negNums2 = [];
  let posNums2 = [];

  for (const num of nums1) {
    num < 0 ? negNums1.push(-num) : posNums1.push(num);
  }

  for (const num of nums2) {
    num < 0 ? negNums2.push(-num) : posNums2.push(num);
  }

  const negCount = negNums1.length * posNums2.length + posNums1.length * negNums2.length;
  let sign = 1;
  let left = 0;
  let right = 10 ** 10;

  negNums1.reverse();
  negNums2.reverse();

  if (k > negCount) {
    k -= negCount;
  } else {
    sign = -1;
    k = negCount - k + 1;
    [negNums2, posNums2] = [posNums2, negNums2];
  }

  const getSmallerCount = (a, b, product) => {
    let count = 0;
    let index = b.length - 1;

    for (const num of a) {
      while (index >= 0 && num * b[index] > product) {
        index -= 1;
      }

      count += index + 1;
    }

    return count;
  };

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const kth = getSmallerCount(negNums1, negNums2, mid) + getSmallerCount(posNums1, posNums2, mid);

    kth >= k ? (right = mid) : (left = mid + 1);
  }

  return left * sign;
};
