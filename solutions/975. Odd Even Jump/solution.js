/**
 * @param {number[]} arr
 * @return {number}
 */
const oddEvenJumps = function (arr) {
  const n = arr.length;
  const ascIndices = arr.toSorted((a, b) => arr[a] - arr[b]);
  const descIndices = arr.toSorted((a, b) => arr[b] - arr[a]);

  const generateNextJumpIndices = indices => {
    const result = new Array(n).fill(-1);
    const stack = [];

    for (const index of indices) {
      while (index > stack.at(-1)) {
        const previousIndex = stack.pop();

        result[previousIndex] = index;
      }
      stack.push(index);
    }
    return result;
  };

  const oddNextJump = generateNextJumpIndices(ascIndices);
  const evenNextJump = generateNextJumpIndices(descIndices);
  const oddJump = new Array(n).fill(false);
  const evenJump = new Array(n).fill(false);

  oddJump[n - 1] = true;
  evenJump[n - 1] = true;

  for (let index = n - 2; index >= 0; index--) {
    const oddNextIndex = oddNextJump[index];
    const evenNextIndex = evenNextJump[index];

    if (oddNextIndex > -1) {
      oddJump[index] = evenJump[oddNextIndex];
    }
    if (evenNextIndex > -1) {
      evenJump[index] = oddJump[evenNextIndex];
    }
  }
  return oddJump.reduce((total, isReach) => total + isReach, 0);
};
