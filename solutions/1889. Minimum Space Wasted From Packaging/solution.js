/**
 * @param {number[]} packages
 * @param {number[][]} boxes
 * @return {number}
 */
const minWastedSpace = function (packages, boxes) {
  const MODULO = BigInt(10 ** 9 + 7);
  const n = packages.length;
  const prefixSum = Array.from({ length: n + 1 }, () => 0n);
  let result = -1;

  const findPackage = (left, box) => {
    let right = n - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      packages[mid] > box ? (right = mid - 1) : (left = mid + 1);
    }

    return right;
  };

  packages.sort((a, b) => a - b);

  for (let index = 1; index <= n; index++) {
    prefixSum[index] = prefixSum[index - 1] + BigInt(packages[index - 1]);
  }

  for (const supplier of boxes) {
    supplier.sort((a, b) => a - b);

    if (supplier.at(-1) < packages[n - 1]) continue;

    let left = 0;
    let wasted = 0n;

    for (const box of supplier) {
      const index = findPackage(left, box);

      if (index < left) continue;
      const boxCount = BigInt(index - left + 1);
      const totalBoxSizes = BigInt(box) * boxCount;
      const totalPackages = prefixSum[index + 1] - prefixSum[left];

      wasted = wasted + totalBoxSizes - totalPackages;
      left = index + 1;
    }

    if (result === -1 || wasted < result) {
      result = wasted;
    }
  }

  return Number(BigInt(result) % MODULO);
};
