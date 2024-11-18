/**
 * @param {number[]} code
 * @param {number} k
 * @return {number[]}
 */
const decrypt = function (code, k) {
  const n = code.length;
  const result = Array.from({ length: n }, () => 0);

  if (k === 0) return result;

  let start = k > 0 ? 1 : n + k;
  let end = k > 0 ? k : n - 1;
  let sum = 0;

  for (let index = start; index <= end; index++) {
    sum += code[index];
  }

  for (let index = 0; index < n; index++) {
    result[index] = sum;
    sum -= code[start];
    start = (start + 1) % n;
    end = (end + 1) % n;
    sum += code[end];
  }
  return result;
};
