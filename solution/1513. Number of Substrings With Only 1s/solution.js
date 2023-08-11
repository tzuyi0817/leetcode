/**
 * @param {string} s
 * @return {number}
 */
var numSub = function(s) {
    const MODULO = 10 ** 9 + 7;
    let result = current = subCount = 0;
 
    for (let index = 0; index <= s.length; index++) {
       const char = s[index];
 
       if (char === '1') {
          subCount += 1;
          current += subCount;
          continue;
       }
       result = (result + current) % MODULO;
       current = subCount = 0;
    }
    return result;
 };
