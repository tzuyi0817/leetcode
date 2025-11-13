/**
 * @param {number[]} flowers
 * @param {number} newFlowers
 * @param {number} target
 * @param {number} full
 * @param {number} partial
 * @return {number}
 */
const maximumBeauty = function (flowers, newFlowers, target, full, partial) {
  const n = flowers.length;
  const clampFlowers = flowers.map(flower => Math.min(flower, target));

  clampFlowers.sort((a, b) => a - b);

  if (clampFlowers[0] === target) return full * n;

  const totalFlowers = clampFlowers.reduce((total, flower) => total + flower);

  if (newFlowers >= n * target - totalFlowers) {
    return Math.max(full * n, full * (n - 1) + partial * (target - 1));
  }

  const costs = Array.from({ length: n }, () => 0);
  let result = 0;

  const findFirstGreater = (maxIndex, current) => {
    let left = 0;
    let right = maxIndex;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      costs[mid] > current ? (right = mid - 1) : (left = mid + 1);
    }

    return left;
  };

  for (let index = 1; index < n; index++) {
    const cost = index * (clampFlowers[index] - clampFlowers[index - 1]);

    costs[index] = costs[index - 1] + cost;
  }

  for (let index = n - 1; index >= 0; index--) {
    if (clampFlowers[index] === target) continue;

    const planted = findFirstGreater(index, newFlowers);
    const average = Math.floor((newFlowers - costs[planted - 1]) / planted);
    const minFlowers = clampFlowers[planted - 1] + average;
    const beauty = full * (n - index - 1) + partial * minFlowers;

    result = Math.max(beauty, result);
    newFlowers -= target - clampFlowers[index];

    if (newFlowers <= 0) return result;
  }

  return result;
};
