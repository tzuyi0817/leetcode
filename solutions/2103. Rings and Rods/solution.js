/**
 * @param {string} rings
 * @return {number}
 */
const countPoints = function (rings) {
  const rodMap = new Map();
  let result = 0;

  for (let index = 0; index < rings.length - 1; index += 2) {
    const ring = rings[index];
    const rod = rings[index + 1];
    const cacheRod = rodMap.get(rod);

    cacheRod ? cacheRod.add(ring) : rodMap.set(rod, new Set([ring]));
  }
  for (const rod of rodMap.values()) {
    if (rod.size < 3) continue;
    result += 1;
  }
  return result;
};
