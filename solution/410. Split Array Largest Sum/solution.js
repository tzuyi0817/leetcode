/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var splitArray = function(nums, k) {
    let left = Math.max(...nums);
    let right = nums.reduce((sum, num) => sum + num);

    const isValidSplit = (averageAssign) => {
        let current = 0;
        let count = 1;

        for (const num of nums) {
            current += num;
            if (current <= averageAssign) continue;
            count += 1;
            if (count > k) return false;
            current = num;
        }
        return true;
    };

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        isValidSplit(mid) ? right = mid : left = mid + 1;
    }
    return left;
};