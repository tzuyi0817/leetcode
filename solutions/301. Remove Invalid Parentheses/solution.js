/**
 * @param {string} s
 * @return {string[]}
 */
const removeInvalidParentheses = function (s) {
  const n = s.length;
  let invalidLeft = 0;
  let invalidRight = 0;

  for (const char of s) {
    if (char !== '(' && char !== ')') continue;

    if (char === '(') {
      invalidLeft += 1;

      continue;
    }

    if (invalidLeft === 0) {
      invalidRight += 1;
    } else {
      invalidLeft -= 1;
    }
  }

  const removeable = invalidLeft + invalidRight;

  if (removeable === n) return [''];

  if (removeable === 0) return [s];

  const result = new Set();

  const dfs = (index, current, left, right, diff) => {
    if (n - index < left + right) return;

    if (index === n) {
      if (diff === 0) {
        result.add(current);
      }

      return;
    }

    const char = s[index];
    const nextCurrent = `${current}${char}`;

    if (char !== '(' && char !== ')') {
      dfs(index + 1, nextCurrent, left, right, diff);

      return;
    }

    if (char !== ')' || diff) {
      const nextDiff = diff + (char === '(' ? 1 : -1);

      dfs(index + 1, nextCurrent, left, right, nextDiff);
    }

    if (char === '(' && left) {
      dfs(index + 1, current, left - 1, right, diff);
    }

    if (char === ')' && right) {
      dfs(index + 1, current, left, right - 1, diff);
    }
  };

  dfs(0, '', invalidLeft, invalidRight, 0);

  return [...result];
};
