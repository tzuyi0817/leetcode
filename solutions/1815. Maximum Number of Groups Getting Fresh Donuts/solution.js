/**
 * @param {number} batchSize
 * @param {number[]} groups
 * @return {number}
 */
const maxHappyGroups = function (batchSize, groups) {
  const customers = Array.from({ length: batchSize }, () => 0);
  const memo = new Map();
  let happyGroups = 0;

  for (const customer of groups) {
    const leftOver = customer % batchSize;

    if (leftOver) {
      const other = batchSize - leftOver;

      if (customers[other]) {
        customers[other] -= 1;
        happyGroups += 1;
      } else {
        customers[leftOver] += 1;
      }
    } else {
      happyGroups += 1;
    }
  }

  const getHappyGroups = leftOver => {
    const key = `${customers.join(',')},${leftOver}`;

    if (memo.has(key)) return memo.get(key);
    let result = 0;

    for (let index = 1; index < batchSize; index++) {
      if (!customers[index]) continue;
      const nextLeftOver = (leftOver + index) % batchSize;

      customers[index] -= 1;
      const happyGroups = getHappyGroups(nextLeftOver);
      const totalHappyGroups = leftOver ? happyGroups : happyGroups + 1;

      customers[index] += 1;
      result = Math.max(totalHappyGroups, result);
    }

    memo.set(key, result);

    return result;
  };

  return happyGroups + getHappyGroups(0);
};
