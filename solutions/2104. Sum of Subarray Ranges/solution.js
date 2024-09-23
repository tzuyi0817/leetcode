/**
 * @param {number[]} nums
 * @return {number}
 */
var subArrayRanges = function(nums) {
    const compareSmall = (num, target) => num < target;
    const compareLarge = (num, target) => num > target;
    const sumRanges = (edge, compare) => {
        const stack = [];
        let result = 0;

        for (let index = 0; index <= nums.length; index++) {
            const num = nums[index] ?? edge;

            while (stack.length && compare(num, nums[stack.at(-1)])) {
                const previous = stack.pop();
                const start = stack.length ? stack.at(-1) : -1;
                const count = (index - previous) * (previous - start);

                result += nums[previous] * count;
            }
            stack.push(index);
        }
        return result;
    };
    const sumLargest = sumRanges(Number.MAX_SAFE_INTEGER, compareLarge);
    const sumSmallest = sumRanges(Number.MIN_SAFE_INTEGER, compareSmall);
    
    return sumLargest - sumSmallest;
};