/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkIfCanBreak = function(s1, s2) {
    const permutationS1 = s1.split('').sort();
    const permutationS2 = s2.split('').sort();
    const isCanBreak = (s1, s2) => {
        for (let index = 0; index < s1.length; index++) {
            if (s1[index] >= s2[index]) continue;
            return false;
        }
        return true;
    };
    
    return isCanBreak(permutationS1, permutationS2) ||
        isCanBreak(permutationS2, permutationS1);
};
