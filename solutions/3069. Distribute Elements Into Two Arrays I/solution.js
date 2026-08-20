/**
 * @param {number[]} nums
 * @return {number[]}
 */
const resultArray = function (nums) {
  const n = nums.length;
  const arr1 = [nums[0]];
  const arr2 = [nums[1]];

  for (let index = 2; index < n; index++) {
    const num = nums[index];

    if (arr1.at(-1) > arr2.at(-1)) {
      arr1.push(num);
    } else {
      arr2.push(num);
    }
  }

  return [...arr1, ...arr2];
};
