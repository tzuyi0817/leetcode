/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const m = nums1.length;
    const n = nums2.length;
    const medianKthA = Math.floor((m + n + 1) / 2);
    const medianKthB = Math.floor((m + n + 2) / 2);
    const findKth = (a, b, kth) => {
        if (a >= m) return nums2[b + kth - 1];
        if (b >= n) return nums1[a + kth - 1];
        if (kth === 1) return Math.min(nums1[a], nums2[b]);
        const mid = Math.floor(kth / 2);
        const mid1 = a + mid - 1;
        const mid2 = b + mid - 1;
        const midValue1 = mid1 < m ? nums1[mid1] : Number.MAX_SAFE_INTEGER;
        const midValue2 = mid2 < n ? nums2[mid2] : Number.MAX_SAFE_INTEGER;

        return midValue1 < midValue2 
            ? findKth(a + mid, b, kth - mid)
            : findKth(a, b + mid, kth - mid);
    };

    return (findKth(0, 0, medianKthA) + findKth(0, 0, medianKthB)) / 2;
};
