/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestDistancePair = function(nums, k) {
    const n = nums.length;

    nums.sort((a, b) => a - b);

    let left = 0;
    let right = nums[n - 1] - nums[0];

    const getSmallestCount = (target) => {
        let result = 0;
        let right = 1;

        for (let index = 0; index < n; index++) {
            const num = nums[index];

            while (right < n && nums[right] - num <= target) {
                right += 1;
            }
            result += right - index - 1;
        }
        return result;
    };

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const count = getSmallestCount(mid);

        count >= k ? right = mid : left = mid + 1;
    }
    return left;
};