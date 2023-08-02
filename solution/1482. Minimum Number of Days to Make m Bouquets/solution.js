/**
 * @param {number[]} bloomDay
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
var minDays = function(bloomDay, m, k) {
    if (bloomDay.length < m * k) return -1;
    let left = 1;
    let right = Math.max(...bloomDay);
    const makeBouquetCount = (day) => {
        let result = currnetFlowers = 0;

        for (let index = 0; index < bloomDay.length; index++) {
            if (day < bloomDay[index]) {
                currnetFlowers = 0;
                continue; 
            }
            currnetFlowers += 1;
            if (currnetFlowers !== k) continue;
            result += 1;
            currnetFlowers = 0;
        }
        return result;
    };

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        makeBouquetCount(mid) < m ? left = mid + 1 : right = mid;
    }
    return left;
};
