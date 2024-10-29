/**
 * @param {number} n
 * @param {number[][]} languages
 * @param {number[][]} friendships
 * @return {number}
 */
const minimumTeachings = function (n, languages, friendships) {
  const size = languages.length;
  const communicate = new Array(size).fill('').map(_ => new Array(n).fill(false));
  const users = new Set();
  let result = Number.MAX_SAFE_INTEGER;

  for (let index = 0; index < size; index++) {
    for (const language of languages[index]) {
      communicate[index][language - 1] = true;
    }
  }
  for (const [a, b] of friendships) {
    const isCommunicate = communicate[a - 1].some((isKnow, language) => {
      return isKnow ? communicate[b - 1][language] : isKnow;
    });

    if (isCommunicate) continue;
    users.add(a - 1).add(b - 1);
  }
  for (let language = 0; language < n; language++) {
    let teach = 0;

    for (const user of users) {
      !communicate[user][language] && teach++;
    }
    result = Math.min(teach, result);
  }
  return result;
};
