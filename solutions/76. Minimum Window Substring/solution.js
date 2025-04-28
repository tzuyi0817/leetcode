/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = function (s, t) {
  const targetMap = new Map();
  let minSize = Number.MAX_SAFE_INTEGER;
  let left = 0;
  let current = 0;
  let minLeft = -1;

  for (const str of t) {
    const count = targetMap.get(str) ?? 0;

    targetMap.set(str, count + 1);
  }
  for (let index = 0; index < s.length; index++) {
    if (targetMap.has(s[index])) {
      const count = targetMap.get(s[index]) - 1;

      targetMap.set(s[index], count);
      if (count > -1) current += 1;
    }
    while (current === t.length) {
      if (index - left + 1 < minSize) {
        minSize = index - left + 1;
        minLeft = left;
      }
      if (targetMap.has(s[left])) {
        const count = targetMap.get(s[left]) + 1;

        targetMap.set(s[left], count);
        if (count > 0) current -= 1;
      }
      left += 1;
    }
  }
  return minLeft > -1 ? s.slice(minLeft, minLeft + minSize) : '';
};
