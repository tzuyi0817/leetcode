/**
 * @param {number[]} strength
 * @return {number}
 */
const totalStrength = function (strength) {
  const n = strength.length;
  const MODULO = BigInt(10 ** 9 + 7);
  const prefix = Array.from({ length: n }, () => 0n);
  const prefixOfPrefix = Array.from({ length: n + 1 }, () => 0n);
  const left = Array.from({ length: n }, () => -1);
  const right = Array.from({ length: n }, () => n);
  let stack = [];
  let result = 0n;

  for (let index = 0; index < n; index++) {
    prefix[index] = (prefix[index - 1] ?? 0n) + (BigInt(strength[index]) % MODULO);
  }

  for (let index = 1; index <= n; index++) {
    prefixOfPrefix[index] = (prefixOfPrefix[index - 1] + prefix[index - 1]) % MODULO;
  }

  for (let index = n - 1; index >= 0; index--) {
    const value = strength[index];

    while (stack.length && strength[stack.at(-1)] >= value) {
      const pos = stack.pop();

      left[pos] = index;
    }

    stack.push(index);
  }

  stack = [];

  for (let index = 0; index < n; index++) {
    const value = strength[index];

    while (stack.length && strength[stack.at(-1)] > value) {
      const pos = stack.pop();

      right[pos] = index;
    }

    stack.push(index);
  }

  for (let index = 0; index < n; index++) {
    const l = left[index];
    const r = right[index];
    const leftSum = prefixOfPrefix[index] - (prefixOfPrefix[l] ?? 0n);
    const rightSum = prefixOfPrefix[r] - prefixOfPrefix[index];
    const leftLen = BigInt(index - l);
    const rightLen = BigInt(r - index);
    const sum = (((rightSum * leftLen - leftSum * rightLen) % MODULO) + MODULO) % MODULO;

    result = (result + sum * BigInt(strength[index])) % MODULO;
  }

  return Number(result);
};
