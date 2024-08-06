/**
 * @param {string[]} strs
 * @return {number}
 */
var numSimilarGroups = function(strs) {
    const n = strs.length;
    const groups = Array(n).fill('').map((_, index) => index);

    const isSimilar = (a, b) => {
        let diff = 0;

        for (let index = 0; index < a.length; index++) {
            if (a[index] === b[index]) continue;
            diff += 1;
            if (diff > 2) return false;
        }
        return true;
    };

    const unionFind = (x) => {
        return groups[x] === x ? x : unionFind(groups[x]);
    };

    for (let a = 0; a < n - 1; a++) {
        for (let b = a + 1; b < n; b++) {
            if (!isSimilar(strs[a], strs[b])) continue;
            const groupA = unionFind(a);
            const groupB = unionFind(b);

            groups[groupB] = groupA;
        }
    }
    let result = 0;

    for (let index = 0; index < n; index++) {
        if (groups[index] === index) result += 1;
    }
    return result;
};