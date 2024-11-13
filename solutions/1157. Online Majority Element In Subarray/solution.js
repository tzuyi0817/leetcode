const MajorityChecker = function (arr) {
  const n = arr.length;

  this.arr = arr;
  this.majorityMap = new Map();
  this.checkTimes = Math.ceil(Math.log2(10 ** 4));

  for (let index = 0; index < n; index++) {
    const num = arr[index];

    if (!this.majorityMap.has(num)) {
      this.majorityMap.set(num, []);
    }
    const indices = this.majorityMap.get(num);

    indices.push(index);
  }
};

MajorityChecker.prototype.query = function (left, right, threshold) {
  const findIndex = (indices, target) => {
    let low = 0;
    let high = indices.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);

      indices[mid] > target ? (high = mid - 1) : (low = mid + 1);
    }
    return { low, high };
  };

  for (let index = 0; index < this.checkTimes; index++) {
    const random = Math.floor(Math.random() * (right - left) + left);
    const num = this.arr[random];
    const indices = this.majorityMap.get(num);
    const { low: leftIndex } = findIndex(indices, left - 1);
    const { high: rightIndex } = findIndex(indices, right);

    if (rightIndex < leftIndex) continue;
    if (rightIndex - leftIndex + 1 >= threshold) return num;
  }
  return -1;
};
