/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSumOfThreeSubarrays = function(nums, k) {
    const n = nums.length;
    const prefixSum = Array(n).fill(0);
    const leftDp = Array(n).fill(0);
    const rightDp = Array(n).fill(n - k);

    prefixSum[-1] = 0;

    for (let index = 0; index < n; index++) {
        prefixSum[index] = prefixSum[index - 1] + nums[index];
    }
    const getSubSum = (index) => prefixSum[index + k - 1] - prefixSum[index - 1];
    let maxSum = prefixSum[k - 1];

    for (let index = 1; index < n; index++) {
        const currentSum = getSubSum(index);

        if (currentSum > maxSum) {
            maxSum = currentSum;
            leftDp[index] = index;
            continue;
        }
        leftDp[index] = leftDp[index - 1];
    }
    maxSum = prefixSum[n - 1] - prefixSum[n - k - 1];

    for (let index = n - k - 1; index >= 0; index--) {
        const currentSum = getSubSum(index);

        if (currentSum >= maxSum) {
            maxSum = currentSum;
            rightDp[index] = index;
            continue;
        }
        rightDp[index] = rightDp[index + 1];
    }
    let result = [];

    maxSum = 0;

    for (let index = k ; index <= n - k * 2; index++) {
        const left = leftDp[index - k];
        const right = rightDp[index + k];
        const sum = getSubSum(left) + getSubSum(index) + getSubSum(right);

        if (sum <= maxSum) continue;
        result = [left, index, right];
        maxSum = sum;
    }
    return result;
};