/**
 * @param {string} s
 * @return {number}
 */
var minSwaps = function(s) {
    const ones = s.replaceAll('0', '').length;
    const zeros = s.length - ones;
    
    if (Math.abs(ones - zeros) > 1) return -1;
    const swapString = (current) => {
        let times = 0;

        for (const character of s) {
            if (+character !== current) times += 1;
            current ^= 1;
        }
        return times / 2;
    };

    if (ones > zeros) return swapString(1);
    if (ones < zeros) return swapString(0);
    return Math.min(swapString(0), swapString(1));
};