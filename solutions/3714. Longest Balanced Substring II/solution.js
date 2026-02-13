/**
 * @param {string} s
 * @return {number}
 */
const longestBalanced = function (s) {
  const n = s.length;

  const maxSingle = target => {
    let count = 0;
    let result = 0;

    for (const char of s) {
      count = char === target ? count + 1 : 0;
      result = Math.max(result, count);
    }

    return result;
  };

  const maxPair = (u, v) => {
    const prevMap = new Map();
    let diff = 0;
    let result = 0;

    prevMap.set(0, -1);

    for (let index = 0; index < n; index++) {
      const char = s[index];

      if (char === u) {
        diff += 1;
      } else if (char === v) {
        diff -= 1;
      } else {
        diff = 0;
        prevMap.clear();
        prevMap.set(0, index);
        continue;
      }

      if (prevMap.has(diff)) {
        const len = index - prevMap.get(diff);

        result = Math.max(len, result);
      } else {
        prevMap.set(diff, index);
      }
    }

    return result;
  };

  const single = Math.max(maxSingle('a'), maxSingle('b'), maxSingle('c'));
  const pair = Math.max(maxPair('a', 'b'), maxPair('b', 'c'), maxPair('a', 'c'));
  const balanceMap = new Map();
  let a = 0;
  let b = 0;
  let c = 0;
  let result = Math.max(single, pair);

  balanceMap.set('0-0', -1);

  for (let index = 0; index < n; index++) {
    const char = s[index];

    if (char === 'a') {
      a += 1;
    } else if (char === 'b') {
      b += 1;
    } else {
      c += 1;
    }

    const key = `${a - b}-${b - c}`;

    if (balanceMap.has(key)) {
      const len = index - balanceMap.get(key);

      result = Math.max(len, result);
    } else {
      balanceMap.set(key, index);
    }
  }

  return result;
};
