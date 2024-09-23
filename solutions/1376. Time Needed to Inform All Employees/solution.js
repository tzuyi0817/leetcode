/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
var numOfMinutes = function(n, headID, manager, informTime) {
    const companyMap =  manager.reduce((map, manager, index) => {
        if (manager === -1) return map;
        const subordinates = map.get(manager) ?? [];

        subordinates.push(index);
        return map.set(manager, subordinates);
    }, new Map());
    const getMinutes = (manager = headID) => {
        if (!companyMap.has(manager)) return 0;
        const subordinates = companyMap.get(manager);
        let minutes = 0;

        subordinates.forEach(employee => {
            minutes = Math.max(getMinutes(employee), minutes);
        });

        return informTime[manager] + minutes;
    };

    return getMinutes();
};
