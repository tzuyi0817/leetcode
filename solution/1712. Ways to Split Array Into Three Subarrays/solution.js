/**
 * @param {number[]} nums
 * @return {number}
 */
var waysToSplit = function(nums) {
    const MODULO = 10 ** 9 + 7;
    const prefixSum = [nums[0]];
    const size = nums.length;
    let mid = right = result = 0;

    for (let index = 1; index < size; index++) {
        prefixSum[index] = prefixSum[index - 1] + nums[index];
    }
    for (let index = 0; index < size - 2; index++) {
        const current = prefixSum[index];

        mid = Math.max(index + 1, mid);
        while (mid < size - 1 && prefixSum[mid] - current < current) mid += 1;
        right = Math.max(mid, right);
        while (right < size - 1 && prefixSum[right] - current <= prefixSum.at(-1) - prefixSum[right]) {
            right += 1;
        }
        result += right - mid;
        result %= MODULO;
    }
    return result;
};