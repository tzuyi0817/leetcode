/**
 * @param {string} s
 * @param {string} t
 * @param {number} maxCost
 * @return {number}
 */
var equalSubstring = function(s, t, maxCost) {
    let left = cost = result = 0;

    for (let index = 0; index < s.length; index++) {
        const needCost = Math.abs(s.charCodeAt(index) - t.charCodeAt(index));

        cost += needCost;
        while (cost > maxCost && left <= index) {
            cost -= Math.abs(s.charCodeAt(left) - t.charCodeAt(left));
            left += 1;
        }
        result = Math.max(index - left + 1, result);
    }
    return result;
};