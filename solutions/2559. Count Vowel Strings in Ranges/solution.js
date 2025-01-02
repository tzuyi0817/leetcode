/**
 * @param {string[]} words
 * @param {number[][]} queries
 * @return {number[]}
 */
const vowelStrings = function (words, queries) {
  const VOWEL = 'aeiou';
  const n = words.length;
  const prefixVowel = Array.from({ length: n + 1 }, () => 0);

  for (let index = 1; index <= n; index++) {
    const word = words[index - 1];
    const prefix = prefixVowel[index - 1];
    const isVowelWord = VOWEL.includes(word[0]) && VOWEL.includes(word.at(-1));

    prefixVowel[index] = prefix + (isVowelWord ? 1 : 0);
  }

  return queries.map(([l, r]) => {
    return prefixVowel[r + 1] - prefixVowel[l];
  });
};
