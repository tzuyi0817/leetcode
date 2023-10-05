/**
 * @param {number[]} aliceValues
 * @param {number[]} bobValues
 * @return {number}
 */
var stoneGameVI = function(aliceValues, bobValues) {
    const values = aliceValues.map((value, index) => {
        return { alice: value, bob: bobValues[index] };
    });
    let alice = bob = 0;

    values.sort((a, b) => b.alice + b.bob - a.alice - a.bob);
    
    for (let index = 0; index < values.length; index++) {
        const value = values[index];

        index % 2 ? bob += value.bob : alice += value.alice;
    }
    return bob > alice ? -1 : alice > bob;
};
