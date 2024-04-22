/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function(deadends, target) {
    const deadendSet = new Set(deadends);
    if (deadendSet.has('0000')) return -1;
    const visited = new Set();
    const createNextStepValues = (value) => {
        const result = [];

        for (let index = 0; index < value.length; index++) {
            const num = +value[index];
            const firstHalf = value.slice(0, index);
            const secondHalf = value.slice(index + 1);
            const up = num === 9 ? 0 : num + 1;
            const down = num === 0 ? 9 : num - 1;
            const upValue = `${firstHalf}${up}${secondHalf}`;
            const downValue = `${firstHalf}${down}${secondHalf}`;

            result.push(upValue, downValue);
        }
        return result;
    };
    let queue = ['0000'];
    let result = 0;

    while (queue.length) {
        const size = queue.length;
        const nextQueue = [];

        for (let index = 0; index < size; index++) {
            const value = queue[index];

            if (value === target) return result;
            if (visited.has(value)) continue;
            visited.add(value);
            const nextValues = createNextStepValues(value);

            for (const nextValue of nextValues) {
                if (visited.has(nextValue) || deadendSet.has(nextValue)) continue;
                nextQueue.push(nextValue);
            }
        }
        result += 1;
        queue = nextQueue;
    }
    return -1;
};