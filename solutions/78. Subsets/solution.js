/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function (nums) {
  const result = [[]];
  const backtrackingSubset = (start, current) => {
    for (let index = start; index < nums.length; index++) {
      const num = nums[index];

      current.push(num);
      result.push([...current]);
      backtrackingSubset(index + 1, current);
      current.pop();
    }
  };

  backtrackingSubset(0, []);
  return result;
};
