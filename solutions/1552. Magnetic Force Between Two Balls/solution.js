/**
 * @param {number[]} position
 * @param {number} m
 * @return {number}
 */
var maxDistance = function(position, m) {
    position.sort((a, b) => a - b);
    let left = 1;
    let right = position.at(-1) - position[0];
    const isMaxForce = (force) => {
        let balls = 1;
        let left = 0;

        for (let index = 1; index < position.length; index++) {
            if (position[index] - position[left] < force) continue;
            balls += 1;
            left = index;
            if (balls === m) return true;
        }
        return false;
    };

    while (left < right) {
        const mid = Math.floor((left + right + 1) / 2);

        isMaxForce(mid) ? left = mid : right = mid - 1;
    }
    return left;
};
