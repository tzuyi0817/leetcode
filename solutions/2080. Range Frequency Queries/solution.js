/**
 * @param {number[]} arr
 */
const RangeFreqQuery = function (arr) {
  this.frequencyMap = arr.reduce((map, value, index) => {
    const indices = map.get(value);

    indices ? indices.push(index) : map.set(value, [index]);
    return map;
  }, new Map());
};

function binarySearch(arr, target, lower = false) {
  let left = 0;
  let right = arr.length;
  const isBigger = value => (lower ? target > value : target >= value);

  while (left < right) {
    const middle = Math.floor((left + right) / 2);

    isBigger(arr[middle]) ? (left = middle + 1) : (right = middle);
  }
  return left;
}

/**
 * @param {number} left
 * @param {number} right
 * @param {number} value
 * @return {number}
 */
RangeFreqQuery.prototype.query = function (left, right, value) {
  if (!this.frequencyMap.has(value)) return 0;
  const indices = this.frequencyMap.get(value);

  return binarySearch(indices, right) - binarySearch(indices, left, true);
};

/**
 * Your RangeFreqQuery object will be instantiated and called as such:
 * var obj = new RangeFreqQuery(arr)
 * var param_1 = obj.query(left,right,value)
 */
