/**
 * @param {string} num
 * @return {number}
 */
const countBalancedPermutations = function (num) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = num.length;
  const digits = Array.from({ length: 10 }, () => 0);
  let total = 0;

  for (const digit of num) {
    digits[digit] += 1;
    total += Number(digit);
  }

  if (total % 2) return 0;
  const halfSize = Math.floor(n / 2);
  const comb = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(1n));
  const memo = new Map();

  for (let a = 2; a <= n; a++) {
    for (let b = 1; b < a; b++) {
      comb[a][b] = comb[a - 1][b - 1] + comb[a - 1][b];
    }
  }

  const balancedPermutations = (digit, odd, even, balance) => {
    if (!odd && !even && !balance) return 1n;
    if (digit > 9 || odd < 0 || even < 0 || balance < 0) return 0n;
    const key = `${digit},${odd},${even},${balance}`;

    if (memo.has(key)) return memo.get(key);
    const digitCount = digits[digit];
    let result = 0n;

    for (let count = 0; count <= digitCount; count++) {
      const evenCount = digitCount - count;
      const ways = (comb[odd][count] * comb[even][evenCount]) % MODULO;
      const nextBalance = balance - digit * count;
      const balanced = balancedPermutations(digit + 1, odd - count, even - evenCount, nextBalance);

      result = (result + ways * balanced) % MODULO;
    }

    memo.set(key, result);

    return result;
  };

  return Number(balancedPermutations(0, n - halfSize, halfSize, total / 2));
};
