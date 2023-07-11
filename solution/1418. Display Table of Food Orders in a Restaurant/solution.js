/**
 * @param {string[][]} orders
 * @return {string[][]}
 */
var displayTable = function(orders) {
    const foods = new Set();
    const orderMap = orders.reduce((map, [customer, table, food]) => {
        const order = map.get(table) ?? {};

        order[food] = (order[food] ?? 0) + 1;
        foods.add(food);
        return map.set(table, order);
    }, new Map());
    const alphabeticalFoods = [...foods].sort();
    const title = ['Table', ...alphabeticalFoods];
    const tables = [...orderMap.keys()].sort((a, b) => a - b);
    
    return tables.reduce((result, table) => {
        const order = orderMap.get(table);
        const counts = alphabeticalFoods.map(food => `${order[food] ?? 0}`);
        
        result.push([table, ...counts]);
        return result;
    }, [title]);
};
