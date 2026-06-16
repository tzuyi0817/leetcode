/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const beautifulSubstrings = function (s, k) {
  const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
  const countMap = new Map();
  const root = getRoot(k);
  let vowels = 0;
  let vowelsMinusConsonants = 0;
  let result = 0;

  const isVowel = char => VOWELS.has(char);

  countMap.set('0,0', 1);

  for (const char of s) {
    if (isVowel(char)) {
      vowels = (vowels + 1) % root;
      vowelsMinusConsonants += 1;
    } else {
      vowelsMinusConsonants -= 1;
    }

    const key = `${vowels},${vowelsMinusConsonants}`;
    const count = countMap.get(key) ?? 0;

    result += count;
    countMap.set(key, count + 1);
  }

  return result;
};

function getRoot(num) {
  for (let index = 1; index <= num; index++) {
    if (index ** 2 % num === 0) {
      return index;
    }
  }

  return num;
}
