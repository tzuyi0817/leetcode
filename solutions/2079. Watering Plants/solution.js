/**
 * @param {number[]} plants
 * @param {number} capacity
 * @return {number}
 */
const wateringPlants = function (plants, capacity) {
  let result = 0;
  let watering = capacity;

  for (const [index, plant] of plants.entries()) {
    result += 1;
    if (watering >= plant) {
      watering -= plant;
      continue;
    }
    result += index * 2;
    watering = capacity - plant;
  }
  return result;
};
