/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function(nums) {
    let left = currentSize = result = 0;
    let isDelete = false;

    for (let index = 0; index < nums.length; index++) {
        const value = nums[index];
        
        if (value) currentSize += 1;
        else {
            isDelete
                ? currentSize = index - left - 1
                : isDelete = true;

            left = index;
        }
        result = Math.max(result, currentSize);
    }
    return isDelete ? result : result - 1;
};
