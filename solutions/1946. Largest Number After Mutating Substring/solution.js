/**
 * @param {string} num
 * @param {number[]} change
 * @return {string}
 */
const maximumNumber = function (num, change) {
  const nums = num.split('');
  let isChanged = false;

  for (let index = 0; index < nums.length; index++) {
    const value = nums[index];
    const changeValue = change[value];

    if (isChanged && value > changeValue) break;
    if (value >= changeValue) continue;
    nums[index] = changeValue;
    isChanged = true;
  }
  return nums.join('');
};
