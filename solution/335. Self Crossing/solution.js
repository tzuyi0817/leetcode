/**
 * @param {number[]} distance
 * @return {boolean}
 */
var isSelfCrossing = function(distance) {
    const situation1 = (index) => {
        const one = distance[index - 3];
        const two = distance[index - 2];
        const three = distance[index - 1];
        const four = distance[index];

        return one >= three && four >= two;
    };
    const situation2 = (index) => {
        if (index < 4) return false;
        const one = distance[index - 4];
        const two = distance[index - 3];
        const three = distance[index - 2];
        const four = distance[index - 1];
        const five = distance[index];

        return three >= one && two === four && five >= three - one;
    };
        const situation3 = (index) => {
        if (index < 5) return false;
        const one = distance[index - 5];
        const two = distance[index - 4];
        const three = distance[index - 3];
        const four = distance[index - 2];
        const five = distance[index - 1];
        const six = distance[index];

        return four >= two && three >= five && one >= three - five && six >= four - two;
    };

    for (let index = 3; index < distance.length; index++) {
        if (situation1(index)) return true;
        if (situation2(index)) return true;
        if (situation3(index)) return true;
    }
    return false;
};