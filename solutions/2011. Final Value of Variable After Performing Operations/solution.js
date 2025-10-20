/**
 * @param {string[]} operations
 * @return {number}
 */
const finalValueAfterOperations = function (operations) {
  const operateMap = {
    '++X': val => val + 1,
    'X++': val => val + 1,
    '--X': val => val - 1,
    'X--': val => val - 1,
  };
  let result = 0;

  for (const operate of operations) {
    if (!operateMap[operate]) continue;

    result = operateMap[operate](result);
  }

  return result;
};
