/**
 * @param {string} word
 * @return {boolean}
 */
const isValid = function (word) {
  const n = word.length;

  if (n < 3) return false;

  const vowels = ['a', 'e', 'i', 'o', 'u'];
  let containVowel = false;
  let containConsonant = false;

  for (const char of word) {
    const lowerChar = char.toLowerCase();

    if (!/[a-z0-9]/.test(lowerChar)) return false;
    if (/\d/.test(lowerChar)) continue;

    if (vowels.includes(lowerChar)) {
      containVowel = true;
    } else {
      containConsonant = true;
    }
  }

  return containVowel && containConsonant;
};
