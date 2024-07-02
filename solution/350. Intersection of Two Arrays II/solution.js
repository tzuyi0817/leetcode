/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    if (nums1.length > nums2.length) return intersect(nums2, nums1);

    const numsMap = nums1.reduce((map, num) => {
        const count = map.get(num) ?? 0;

        return map.set(num, count + 1);
    }, new Map());

    const result = [];

    for (const num of nums2) {
        if (!numsMap.has(num)) continue;
        const count = numsMap.get(num);

        result.push(num);
        count === 1 ? numsMap.delete(num) : numsMap.set(num, count - 1);
    }
    return result;
};