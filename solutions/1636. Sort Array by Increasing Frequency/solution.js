/**
 * @param {number[]} nums
 * @return {number[]}
 */
var frequencySort = function(nums) {
    const frequencyMap = nums.reduce((map, num) => {
        const count = map.get(num) ?? 0;

        return map.set(num, count + 1);
    }, new Map());

    return nums.sort((a, b) => frequencyMap.get(a) - frequencyMap.get(b) || b - a);
};
