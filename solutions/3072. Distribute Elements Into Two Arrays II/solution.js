/**
 * @param {number[]} nums
 * @return {number[]}
 */
const resultArray = function (nums) {
  const n = nums.length;
  const arr1 = [];
  const arr2 = [];
  const rankMap = createRankMap(nums);
  const bit1 = new BIT(rankMap.size);
  const bit2 = new BIT(rankMap.size);

  const addElement = (num, arr, bit) => {
    arr.push(num);
    bit.update(rankMap.get(num), 1);
  };

  addElement(nums[0], arr1, bit1);
  addElement(nums[1], arr2, bit2);

  for (let index = 2; index < n; index++) {
    const num = nums[index];
    const rank = rankMap.get(num);
    const greaterCount1 = arr1.length - bit1.query(rank);
    const greaterCount2 = arr2.length - bit2.query(rank);

    if (greaterCount1 > greaterCount2) {
      addElement(num, arr1, bit1);
    } else if (greaterCount1 < greaterCount2) {
      addElement(num, arr2, bit2);
    } else if (arr1.length <= arr2.length) {
      addElement(num, arr1, bit1);
    } else {
      addElement(num, arr2, bit2);
    }
  }

  return [...arr1, ...arr2];
};

class BIT {
  constructor(n) {
    this.bit = Array.from({ length: n + 2 }, () => 0);
  }

  update(num, delta) {
    while (num < this.bit.length) {
      this.bit[num] += delta;
      num += num & -num;
    }
  }

  query(num) {
    let result = 0;

    while (num) {
      result += this.bit[num];
      num -= num & -num;
    }

    return result;
  }
}

function createRankMap(nums) {
  const sorted = [...new Set(nums)].toSorted((a, b) => a - b);
  const rankMap = new Map();
  let rank = 1;

  for (const num of sorted) {
    rankMap.set(num, rank);
    rank += 1;
  }

  return rankMap;
}
