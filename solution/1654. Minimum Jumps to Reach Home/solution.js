/**
 * @param {number[]} forbidden
 * @param {number} a
 * @param {number} b
 * @param {number} x
 * @return {number}
 */
var minimumJumps = function(forbidden, a, b, x) {
    const MAX_X = a + b + 2000;
    const visited = new Set(forbidden);
    const queue = [{ position: 0, isBack: false }];
    let result = 0;

    while (queue.length) {
        const size = queue.length;

        for (let index = 0; index < size; index++) {
            const { position, isBack } = queue.shift();
            const forward = position + a;
            const back = position - b;
            
            if (position === x) return result;
            if (forward <= MAX_X && !visited.has(forward)) {
                visited.add(forward);
                queue.push({ position: forward, isBack: false });
            }
            if (back >= 0 && !visited.has(back) && !isBack) {
                queue.push({ position: back, isBack: true });
            }
        }
        result += 1;
    }
    return -1;
};
