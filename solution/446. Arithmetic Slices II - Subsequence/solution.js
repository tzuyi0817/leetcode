/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfArithmeticSlices = function(nums) {
    const n = nums.length;
    const dp = Array(n).fill('').map(_ => new Map());
    let result = 0;

    const getCount = (map, diff) => map.get(diff) ?? 0;

    for (let a = 1; a < n; a++) {
        const numA = nums[a];

        for (let b = 0; b < a; b++) {
            const numB = nums[b];
            const diff = numA - numB;
            const count = getCount(dp[b], diff);

            result += count;
            dp[a].set(diff, getCount(dp[a], diff) + count + 1);
        }
    }
    return result;
};