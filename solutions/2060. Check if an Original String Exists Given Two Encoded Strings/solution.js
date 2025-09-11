/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const possiblyEquals = function (s1, s2) {
  const n1 = s1.length;
  const n2 = s2.length;
  const dp = Array.from({ length: n1 + 1 }, () => {
    return new Array(n2 + 1).fill('').map(() => new Map());
  });

  const isNumber = char => Number.isInteger(Number(char));

  const findNextLetter = (s, index) => {
    while (index < s.length && isNumber(s[index])) {
      index += 1;
    }

    return index;
  };

  const getPaddings = num => {
    const n = num.length;
    const nums = [Number(num)];

    if (n === 2) {
      const [a, b] = num;

      nums.push(Number(a) + Number(b));
    }

    if (n === 3) {
      const [a, b, c] = num;
      const num1 = Number(a) + Number(b) + Number(c);
      const num2 = Number(a) + Number(`${b}${c}`);
      const num3 = Number(`${a}${b}`) + Number(c);

      nums.push(num1, num2, num3);
    }

    return nums;
  };

  const isPossiblyEncode = (a, b, padding) => {
    if (a === n1 && b === n2) return padding === 0;
    if (dp[a][b].has(padding)) return dp[a][b].get(padding);

    if (a < n1 && isNumber(s1[a])) {
      const index = findNextLetter(s1, a);
      const nums = getPaddings(s1.slice(a, index));

      for (const num of nums) {
        if (isPossiblyEncode(index, b, padding + num)) {
          dp[a][b].set(padding, true);

          return true;
        }
      }
    } else if (b < n2 && isNumber(s2[b])) {
      const index = findNextLetter(s2, b);
      const nums = getPaddings(s2.slice(b, index));

      for (const num of nums) {
        if (isPossiblyEncode(a, index, padding - num)) {
          dp[a][b].set(padding, true);

          return true;
        }
      }
    } else if (padding < 0) {
      if (a < n1 && isPossiblyEncode(a + 1, b, padding + 1)) {
        dp[a][b].set(padding, true);

        return true;
      }
    } else if (padding > 0) {
      if (b < n2 && isPossiblyEncode(a, b + 1, padding - 1)) {
        dp[a][b].set(padding, true);

        return true;
      }
    } else if (a < n1 && b < n2 && s1[a] === s2[b] && isPossiblyEncode(a + 1, b + 1, 0)) {
      dp[a][b].set(padding, true);

      return true;
    }

    dp[a][b].set(padding, false);

    return false;
  };

  return isPossiblyEncode(0, 0, 0);
};
