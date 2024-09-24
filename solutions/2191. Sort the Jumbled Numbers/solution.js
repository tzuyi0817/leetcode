/**
 * @param {number[]} mapping
 * @param {number[]} nums
 * @return {number[]}
 */
const sortJumbled = function (mapping, nums) {
  const mappingNums = nums.map((num, index) => {
    let mappingNum = '';

    for (const char of `${num}`) {
      mappingNum += mapping[char];
    }
    return { mappingNum: +mappingNum, index };
  });

  mappingNums.sort((a, b) => a.mappingNum - b.mappingNum);

  return mappingNums.map(({ index }) => nums[index]);
};
