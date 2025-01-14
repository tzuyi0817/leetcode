/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
const findThePrefixCommonArray = function (A, B) {
  const n = A.length;
  const counts = Array.from({ length: n + 1 }, () => 0);
  const result = [];
  let prefixCommon = 0;

  for (let index = 0; index < n; index++) {
    const a = A[index];
    const b = B[index];

    counts[a] += 1;
    if (counts[a] === 2) prefixCommon += 1;

    counts[b] += 1;
    if (counts[b] === 2) prefixCommon += 1;

    result.push(prefixCommon);
  }
  return result;
};
