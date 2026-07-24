/**
 * @param {number[]} nums
 * @return {number}
 */
const uniqueXorTriplets = function (nums) {
  const n = nums.length;
  const maxNum = Math.max(...nums);
  const maxK = 32 - Math.clz32(maxNum);
  const maxXor = 1 << maxK;
  const pairXor = Array.from({ length: maxXor }, () => false);
  const tripletXor = Array.from({ length: maxXor }, () => false);

  for (let a = 0; a < n; a++) {
    for (let b = a; b < n; b++) {
      const xor = nums[a] ^ nums[b];

      pairXor[xor] = true;
    }
  }

  for (let xor = 0; xor < maxXor; xor++) {
    if (!pairXor[xor]) continue;

    for (const num of nums) {
      tripletXor[xor ^ num] = true;
    }
  }

  return tripletXor.reduce((result, isVisited) => result + Number(isVisited), 0);
};
