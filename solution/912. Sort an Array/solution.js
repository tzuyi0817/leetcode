/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    if (nums.length <= 1) return nums;

    const mid = Math.floor(nums.length / 2);
    const prefix = nums.slice(0, mid);
    const suffix = nums.slice(mid);

    const mergeSort = (nums1, nums2) => {
        const result = [];
        let a = b = 0;

        while (a < nums1.length && b < nums2.length) {
            const num = nums1[a] < nums2[b] ? nums1[a++] : nums2[b++];

            result.push(num);
        }
        while (a < nums1.length) result.push(nums1[a++]);
        while (b < nums2.length) result.push(nums2[b++]);

        return result;
    };

    return mergeSort(sortArray(prefix), sortArray(suffix));
};