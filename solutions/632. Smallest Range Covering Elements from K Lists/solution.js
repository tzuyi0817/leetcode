/**
 * @param {number[][]} nums
 * @return {number[]}
 */
const smallestRange = function (nums) {
  const k = nums.length;
  const coverMap = new Map();
  const elements = nums.reduce((result, list, index) => {
    for (const num of list) {
      result.push({ num, index });
    }
    return result;
  }, []);
  let left = 0;
  let coverCount = 0;
  let minRange = Number.MAX_SAFE_INTEGER;
  let result = [];

  elements.sort((a, b) => a.num - b.num);

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    const count = coverMap.get(element.index) ?? 0;

    if (!count) coverCount += 1;
    coverMap.set(element.index, count + 1);

    while (coverCount === k) {
      const leftElement = elements[left];
      const range = element.num - leftElement.num;
      const leftCount = coverMap.get(leftElement.index);

      if (range < minRange) {
        minRange = range;
        result = [leftElement.num, element.num];
      }
      coverMap.set(leftElement.index, leftCount - 1);
      if (leftCount - 1 === 0) coverCount -= 1;
      left += 1;
    }
  }
  return result;
};
