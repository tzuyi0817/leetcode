/**
 * @param {number} n
 * @return {number}
 */
const minimumBoxes = function (n) {
  let boxes = 0;
  let level = 0;
  let currentLevelBoxes = 0;

  while (boxes < n) {
    level += 1;
    currentLevelBoxes += level;
    boxes += currentLevelBoxes;
  }

  if (boxes === n) return currentLevelBoxes;

  boxes -= currentLevelBoxes;
  currentLevelBoxes -= level;
  level = 0;

  while (boxes < n) {
    level += 1;
    boxes += level;
  }

  return currentLevelBoxes + level;
};
