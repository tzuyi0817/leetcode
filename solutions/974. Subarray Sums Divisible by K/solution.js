/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysDivByK = function(nums, k) {
    const remainderMap = new Map([[0, 1]]);
    let current = result = 0;

    for (const num of nums) {
        current = (current + num % k + k) % k;
        const count = remainderMap.get(current) ?? 0;

        result += count;
        remainderMap.set(current, count + 1);
    }
    return result;
};