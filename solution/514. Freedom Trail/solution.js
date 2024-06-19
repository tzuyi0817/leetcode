/**
 * @param {string} ring
 * @param {string} key
 * @return {number}
 */
var findRotateSteps = function(ring, key) {
    const ringMap = new Map();
    const memo = new Map();
    const n = ring.length;
    const m = key.length;

    for (let index = 0; index < n; index++) {
        const char = ring[index];
        const indices = ringMap.get(char);

        indices ? indices.push(index) : ringMap.set(char, [index]);
    }

    const rotateRing = (index, current) => {
        const memoKey = `${index}-${current}`;

        if (memo.has(memoKey)) return memo.get(memoKey);
        if (index >= m) return 0;
        const char = key[index];
        const indices = ringMap.get(char);
        let result = Number.MAX_SAFE_INTEGER;

        for (const ringIndex of indices) {
            const clockwise = ringIndex > current ? ringIndex - current : n - current + ringIndex;
            const anticlockwise = n - clockwise;
            const minStep =  Math.min(clockwise, anticlockwise);

            result = Math.min(minStep + 1 + rotateRing(index + 1, ringIndex), result);
        }
        memo.set(memoKey, result);
        return result;
    };

    return rotateRing(0, 0);
};