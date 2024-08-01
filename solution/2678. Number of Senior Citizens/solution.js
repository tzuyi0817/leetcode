/**
 * @param {string[]} details
 * @return {number}
 */
var countSeniors = function(details) {
    const startPosition = 10 + 1;
    let result = 0;

    for (const information of details) {
        const age = information.slice(startPosition, startPosition + 2);

        if (age > 60) result += 1;
    }
    return result;
};