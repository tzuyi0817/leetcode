/**
 * @param {string[]} keyName
 * @param {string[]} keyTime
 * @return {string[]}
 */
var alertNames = function(keyName, keyTime) {
    const useKeyCardMap = keyName.reduce((map, name, index) => {
        const times = map.get(name) ?? [];
        const [hour, minute] = keyTime[index].split(':');

        times.push(hour * 60 + +minute);
        return map.set(name, times);
    }, new Map());
    const result = [];

    for (const [name, times] of useKeyCardMap) {
        if (times.length < 3) continue;
        times.sort((a, b) => a - b);

        for (let index = 2; index < times.length; index++) {
            if (times[index] - times[index - 2] > 60) continue;
            result.push(name);
            break;
        }
    }
    return result.sort((a, b) => a.localeCompare(b));
};
