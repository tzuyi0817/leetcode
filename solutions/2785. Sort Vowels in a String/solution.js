/**
 * @param {string} s
 * @return {string}
 */
const sortVowels = function (s) {
  const n = s.length;
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  const vowelMap = { A: 0, E: 0, I: 0, O: 0, U: 0, a: 0, e: 0, i: 0, o: 0, u: 0 };

  const isVowel = char => vowels.has(char.toLowerCase());

  for (const char of s) {
    if (isVowel(char)) {
      vowelMap[char] += 1;
    }
  }

  const counts = Object.entries(vowelMap);
  const result = s.split('');
  let currentVowel = 0;

  for (let index = 0; index < n; index++) {
    if (!isVowel(s[index])) continue;

    while (!counts[currentVowel][1]) {
      currentVowel += 1;
    }

    result[index] = counts[currentVowel][0];
    counts[currentVowel][1] -= 1;
  }

  return result.join('');
};
