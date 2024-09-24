/**
 * @param {number[]} plants
 * @param {number} capacityA
 * @param {number} capacityB
 * @return {number}
 */
const minimumRefill = function (plants, capacityA, capacityB) {
  let alice = capacityA;
  let bob = capacityB;
  let result = 0;
  let left = 0;
  let right = plants.length - 1;

  while (left < right) {
    if (alice < plants[left]) {
      result += 1;
      alice = capacityA;
    }
    if (bob < plants[right]) {
      result += 1;
      bob = capacityB;
    }
    alice -= plants[left];
    bob -= plants[right];
    left += 1;
    right -= 1;
  }
  if (left === right && Math.max(alice, bob) < plants[left]) result += 1;

  return result;
};
