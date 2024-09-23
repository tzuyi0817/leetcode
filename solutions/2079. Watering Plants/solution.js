/**
 * @param {number[]} plants
 * @param {number} capacity
 * @return {number}
 */
var wateringPlants = function(plants, capacity) {
    let result = 0;
    let watering = capacity;

    for (let index = 0; index < plants.length; index++) {
        const plant = plants[index];

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