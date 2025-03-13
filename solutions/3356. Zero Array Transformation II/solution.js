/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
const countOfSubstrings = function (word, k) {
  const n = word.length;
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  const isVowel = letter => vowels.includes(letter);

  const atMost = consonants => {
    const vowelMap = new Map();
    let left = 0;
    let consonantCount = 0;
    let result = 0;

    for (let index = 0; index < n; index++) {
      const letter = word[index];

      if (isVowel(letter)) {
        const count = vowelMap.get(letter) ?? 0;

        vowelMap.set(letter, count + 1);
      } else {
        consonantCount += 1;
      }

      while (vowelMap.size === vowels.length && consonantCount > consonants) {
        const current = word[left];

        if (isVowel(current)) {
          const count = vowelMap.get(current);

          count === 1 ? vowelMap.delete(current) : vowelMap.set(current, count - 1);
        } else {
          consonantCount -= 1;
        }

        left += 1;
      }

      result += index - left + 1;
    }

    return result;
  };

  return atMost(k) - atMost(k - 1);
};
