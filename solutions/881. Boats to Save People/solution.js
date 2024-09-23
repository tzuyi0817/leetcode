/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function(people, limit) {
    let left = result = 0;
    let right = people.length - 1;

    people.sort((a, b) => b - a);

    while (left <= right) {
        if (people[left] + people[right] <= limit) right -= 1;
        left += 1;
        result += 1;
    }
    return result;
};