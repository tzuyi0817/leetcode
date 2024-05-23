/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var beautifulSubsets = function(nums, k) {
    const backtrackingSubset = (subset) => {
        const n = subset.length;

        if (n === 0) return 0;
        let result = 0;

        for (let a = 0; a < n; a++) {
            const next = [];

            for (let b = a + 1; b < n; b++) {
                if (Math.abs(subset[a] - subset[b]) === k) continue;
                next.push(subset[b]);
            }
            result += 1 + backtrackingSubset(next);
        }
        return result;
    };

    return backtrackingSubset(nums);
};