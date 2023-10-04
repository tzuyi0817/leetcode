/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function(nums, k) {
    const numMap = new Map();
    let result = 0;

    for (const num of nums) {
        const pairCount = numMap.get(k - num);

        if (pairCount) {
            numMap.set(k - num, pairCount - 1);
            result += 1;
            continue;
        }
        const count = numMap.get(num) ?? 0;

        numMap.set(num, count + 1);
    }
    return result;
};
