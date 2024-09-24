/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
const crackSafe = function (n, k) {
  const visited = new Set();
  const totalPassword = k ** n;
  let result = '0'.repeat(n);

  visited.add(result);

  const crackPassword = prefix => {
    if (visited.size === totalPassword) return;

    for (let integer = k - 1; integer >= 0; integer--) {
      const password = `${prefix}${integer}`;

      if (visited.has(password)) continue;
      result += integer;
      visited.add(password);
      crackPassword(password.slice(1));
      break;
    }
  };

  crackPassword(result.slice(1));

  return result;
};
