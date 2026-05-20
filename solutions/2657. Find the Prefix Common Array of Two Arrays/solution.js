/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
const findThePrefixCommonArray = function (A, B) {
  const n = A.length;
  const numSet = new Set();
  const result = [];

  for (let index = 0; index < n; index++) {
    const numA = A[index];
    const numB = B[index];

    numSet.add(numA);
    numSet.add(numB);

    const total = (index + 1) * 2;
    const commonCount = total - numSet.size;

    result.push(commonCount);
  }

  return result;
};
