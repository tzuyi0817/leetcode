/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const numTriplets = function (nums1, nums2) {
  const triplets = (numsA, numsB) => {
    const squareMap = numsA.reduce((map, num) => {
      const square = num ** 2;
      const count = map.get(square) ?? 0;

      return map.set(square, count + 1);
    }, new Map());
    let result = 0;

    for (let a = 0; a < numsB.length; a++) {
      for (let b = a - 1; b >= 0; b--) {
        const product = numsB[a] * numsB[b];

        if (!squareMap.has(product)) continue;
        result += squareMap.get(product);
      }
    }
    return result;
  };

  return triplets(nums1, nums2) + triplets(nums2, nums1);
};
