/**
 * @param {number[]} boxes
 * @return {number}
 */
var removeBoxes = function(boxes) {
    const n = boxes.length;
    const dp = Array(n).fill('').map(_ => Array(n).fill('').map(_ => Array(n).fill(0)));

    const calculatePoints = (left, right, count) => {
        if (left > right) return 0;
        if (dp[left][right][count]) return dp[left][right][count];
        const originLeft = left;
        const originCount = count;

        while (left + 1 <= right && boxes[left] === boxes[left + 1]) {
            left += 1;
            count += 1;
        }
        let result = (count + 1) ** 2 + calculatePoints(left + 1, right, 0);

        for (let index = left + 1; index <= right; index++) {
            if (boxes[left] !== boxes[index]) continue;
            const points = calculatePoints(left + 1, index - 1, 0) + calculatePoints(index, right, count + 1);

            result = Math.max(points, result);
        }
        return dp[originLeft][right][originCount] = result;
    };

    return calculatePoints(0, n - 1, 0);
};