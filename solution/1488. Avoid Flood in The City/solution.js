/**
 * @param {number[]} rains
 * @return {number[]}
 */
var avoidFlood = function(rains) {
    const fullLakeMap = new Map();
    const dryDays = [];
    const result = [];
    const searchDryDay = (day) => {
        if (dryDays.at(-1) < day) return -1; 
        let start = 0;
        let end = dryDays.length - 1;

        while (start < end) {
            const mid = Math.floor((start + end) / 2);

            dryDays[mid] < day ? start = mid + 1 : end = mid;
        }
        return start;
    };

    for (let index = 0; index < rains.length; index++) {
        const lake = rains[index];

        if (!lake) {
            dryDays.push(index);
            result[index] = 1;
            continue;
        }
        if (fullLakeMap.has(lake)) {
            if (!dryDays.length) return [];
            const fullDay = fullLakeMap.get(lake);
            const dryIndex = searchDryDay(fullDay);
            if (dryIndex < 0) return [];
            const [dryDay] = dryDays.splice(dryIndex, 1);
 
            result[dryDay] = lake;
        }
        fullLakeMap.set(lake, index);
        result[index] = -1;
    }
    return result;
};
