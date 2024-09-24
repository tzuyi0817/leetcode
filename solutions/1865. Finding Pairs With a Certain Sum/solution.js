/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 */
const FindSumPairs = function (nums1, nums2) {
  this.nums1 = nums1;
  this.nums2 = nums2;
  this.num2Map = nums2.reduce((map, num) => {
    const count = map.get(num) ?? 0;

    return map.set(num, count + 1);
  }, new Map());
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
FindSumPairs.prototype.add = function (index, val) {
  const num2 = this.nums2[index];
  const sum = num2 + val;
  const count = this.num2Map.get(sum) ?? 0;

  this.nums2[index] = sum;
  this.num2Map.set(num2, this.num2Map.get(num2) - 1);
  this.num2Map.set(sum, count + 1);
};

/**
 * @param {number} tot
 * @return {number}
 */
FindSumPairs.prototype.count = function (tot) {
  return this.nums1.reduce((result, num1) => {
    const num2 = tot - num1;
    if (num2 < 0) return result;
    const num2Count = this.num2Map.get(num2) ?? 0;

    return result + num2Count;
  }, 0);
};

/**
 * Your FindSumPairs object will be instantiated and called as such:
 * var obj = new FindSumPairs(nums1, nums2)
 * obj.add(index,val)
 * var param_2 = obj.count(tot)
 */
