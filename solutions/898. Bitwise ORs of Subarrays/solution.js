/**
 * @param {number[]} arr
 * @return {number}
 */
const subarrayBitwiseORs = function (arr) {
  const result = new Set();
  let orsSet = new Set();

  for (const num of arr) {
    const newOrsSet = new Set();

    newOrsSet.add(num);

    for (const or of orsSet) {
      newOrsSet.add(or | num);
    }

    for (const or of newOrsSet) {
      result.add(or);
    }

    orsSet = newOrsSet;
  }

  return result.size;
};
