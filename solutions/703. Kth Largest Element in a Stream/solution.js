/**
 * @param {number} k
 * @param {number[]} nums
 */
const KthLargest = function (k, nums) {
  this.k = k;
  this.nums = nums.toSorted((a, b) => a - b).slice(-k);
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  let left = 0;
  let right = this.nums.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    this.nums[mid] >= val ? (right = mid) : (left = mid + 1);
  }
  this.nums.splice(left, 0, val);

  if (this.nums.length > this.k) {
    this.nums.shift();
  }
  return this.nums[0];
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
