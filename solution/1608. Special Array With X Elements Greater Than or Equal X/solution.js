/**
 * @param {number[]} nums
 * @return {number}
 */
var specialArray = function(nums) {
    const n = nums.length;
    const findGreaterCount = (x) => {
      let left = 0;
      let right = n - 1;
  
      while (left <= right) {
          const mid = Math.floor((left + right) / 2);
  
          nums[mid] >= x ? left = mid + 1 : right = mid - 1;
      }
      return left;
    };
  
    nums.sort((a, b) => b - a);
  
    for (let x = 1; x <= n; x++) {
      if (x === findGreaterCount(x)) return x;
    }
    return -1; 
  };
