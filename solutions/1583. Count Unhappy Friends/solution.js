/**
 * @param {number} n
 * @param {number[][]} preferences
 * @param {number[][]} pairs
 * @return {number}
 */
var unhappyFriends = function(n, preferences, pairs) {
    const pairPreferenceMap = pairs.reduce((map, [x, y]) => {
        map.set(x, preferences[x].indexOf(y));
        return map.set(y, preferences[y].indexOf(x));
    }, new Map());
    let result = 0;

    for (let friend = 0; friend < n; friend++) {
        const pairPreference = pairPreferenceMap.get(friend);

        for (let index = 0; index < pairPreference; index++) {
            const partner = preferences[friend][index];

            if (preferences[partner].indexOf(friend) < pairPreferenceMap.get(partner)) {
                result += 1;
                break;
            }
        }
    }
    return result;
};