/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSumAbsoluteDifferences = function(nums) {
    const prefixSum = [nums[0]];
    const size = nums.length;

    for (let index = 1; index < size; index++) {
        prefixSum[index] = prefixSum[index - 1] + nums[index];
    }
    const sum = prefixSum.at(-1);
    
    return nums.map((num, index) => {
        const currentSum = prefixSum[index];
        const left = num * (index + 1) - currentSum;
        const right = sum - currentSum - num * (size - index - 1);

        return left + right;
    });
};
