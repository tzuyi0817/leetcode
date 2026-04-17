/**
 * @param {number[]} nums
 * @return {number}
 */
const minMirrorPairDistance = function (nums) {
  const n = nums.length;
  const mirrorMap = new Map();
  let result = Number.MAX_SAFE_INTEGER;

  const getReverseNum = num => {
    let reverseNum = 0;

    while (num) {
      const value = num % 10;

      reverseNum = reverseNum * 10 + value;
      num = Math.floor(num / 10);
    }

    return reverseNum;
  };

  for (let index = 0; index < n; index++) {
    const num = nums[index];
    const reverseNum = getReverseNum(num);

    if (mirrorMap.has(num)) {
      const dis = index - mirrorMap.get(num);

      result = Math.min(dis, result);
    }

    mirrorMap.set(reverseNum, index);
  }

  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
