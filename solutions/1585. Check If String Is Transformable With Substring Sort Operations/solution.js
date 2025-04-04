/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isTransformable = function (s, t) {
  const n = s.length;
  const positions = Array.from({ length: 10 }, () => []);

  for (let index = n - 1; index >= 0; index--) {
    const num = Number(s[index]);

    positions[num].push(index);
  }

  for (const char of t) {
    const num = Number(char);

    if (!positions[num].length) return false;
    const index = positions[num].pop();

    for (let smaller = 0; smaller < num; smaller++) {
      if (!positions[smaller].length) continue;
      if (positions[smaller].at(-1) < index) return false;
    }
  }

  return true;
};
