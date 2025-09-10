/**
 * @param {number} n
 * @param {number[][]} languages
 * @param {number[][]} friendships
 * @return {number}
 */
const minimumTeachings = function (n, languages, friendships) {
  const m = languages.length;
  const languageKnows = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  const users = new Set();
  let result = m;

  for (let index = 0; index < m; index++) {
    const user = index + 1;

    for (const language of languages[index]) {
      languageKnows[user][language] = true;
    }
  }

  for (const [u, v] of friendships) {
    const isCommunicable = languageKnows[u].some((isKnow, language) => {
      return isKnow && languageKnows[v][language];
    });

    if (isCommunicable) continue;

    users.add(u);
    users.add(v);
  }

  for (let language = 1; language <= n; language++) {
    let teach = 0;

    for (const user of users) {
      if (!languageKnows[user][language]) {
        teach += 1;
      }
    }

    result = Math.min(teach, result);
  }

  return result;
};
