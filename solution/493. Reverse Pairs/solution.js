/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function(nums) {
    const n = nums.length;
    const bit = Array(n + 2).fill(0);
    const sortedNums = [...nums].sort((a, b) => a - b);
    let result = 0;

    const searchIndex = (num) => {
        let left = 0;
        let right = n;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);

            sortedNums[mid] >= num ? right = mid : left = mid + 1;
        }
        return left;
    };

    const updateBit = (num) => {
        while (num < bit.length) {
            bit[num] += 1;
            num += num & -num;
        }
    };

    const queryBit = (num) => {
        let count = 0;

        while (num > 0) {
            count += bit[num];
            num -= num & -num;
        }
        return count;
    };

    for (let index = n - 1; index >= 0; index--) {
        const num = nums[index];
        const sortedIndex = searchIndex(Math.ceil(num / 2));

        result += queryBit(sortedIndex);
        updateBit(searchIndex(num) + 1);
    }
    return result;
};