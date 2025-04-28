/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
const numRescueBoats = function (people, limit) {
  let left = 0;
  let right = people.length - 1;
  let result = 0;

  people.sort((a, b) => b - a);

  while (left <= right) {
    if (people[left] + people[right] <= limit) right -= 1;
    left += 1;
    result += 1;
  }
  return result;
};
