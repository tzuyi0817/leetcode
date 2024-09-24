/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
const relativeSortArray = function (arr1, arr2) {
  const n = arr2.length;
  const relativeMap = arr2.reduce((map, num, index) => {
    return map.set(num, index);
  }, new Map());

  return arr1.sort((a, b) => {
    const relativeA = relativeMap.get(a) ?? n + a;
    const relativeB = relativeMap.get(b) ?? n + b;

    return relativeA - relativeB;
  });
};
