/**
 * @param {number[]} obstacles
 * @return {number}
 */
const minSideJumps = function (obstacles) {
  const MAX_OBSTACLES = 5 * 10 ** 5;
  let land1 = (land3 = 1);
  let land2 = 0;

  for (const obstacle of obstacles) {
    land1 = obstacle !== 1 ? land1 : MAX_OBSTACLES;
    land2 = obstacle !== 2 ? land2 : MAX_OBSTACLES;
    land3 = obstacle !== 3 ? land3 : MAX_OBSTACLES;

    if (obstacle !== 1) {
      land1 = Math.min(land1, Math.min(land2, land3) + 1);
    }
    if (obstacle !== 2) {
      land2 = Math.min(land2, Math.min(land1, land3) + 1);
    }
    if (obstacle !== 3) {
      land3 = Math.min(land3, Math.min(land1, land2) + 1);
    }
  }
  return Math.min(land1, land2, land3);
};
