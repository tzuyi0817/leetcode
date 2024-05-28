/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countRangeSum = function(nums, lower, upper) {
    const n = nums.length;
    const prefixSum = Array(n + 1).fill(0);

    for (let index = 0; index < n; index++) {
        prefixSum[index + 1] = prefixSum[index] + nums[index];
    }

    const sortedPrefixSum = Array.from(new Set(prefixSum)).sort((a, b) => a - b);
    const bit = Array(sortedPrefixSum.length + 2).fill(0);

    const getIndex = (value) => {
        let left = 0;
        let right = sortedPrefixSum.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            sortedPrefixSum[mid] >= value ? right = mid - 1 : left = mid + 1;
        }
        return left;
    };

    const updateBit = (index) => {
        while (index < bit.length) {
            bit[index] += 1;
            index += index & -index;
        }
    };

    const queryBit = (index) => {
        let count = 0;

        while (index > 0) {
            count += bit[index];
            index -= index & -index;
        }
        return count;
    };

    let result = 0;

    for (const sum of prefixSum) {
        const leftIndex = getIndex(sum - upper);
        const rightIndex = getIndex(sum - lower + 1);

        result += queryBit(rightIndex) - queryBit(leftIndex);
        updateBit(getIndex(sum) + 1);
    }
    return result;
};