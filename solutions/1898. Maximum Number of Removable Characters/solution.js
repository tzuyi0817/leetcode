/**
 * @param {string} s
 * @param {string} p
 * @param {number[]} removable
 * @return {number}
 */
const maximumRemovals = function (s, p, removable) {
  if (removable.length === 0) return 0;
  const isSubsequence = (target, sub) => {
    let subIndex = 0;

    for (let index = 0; index < target.length; index++) {
      if (target[index] === sub[subIndex]) subIndex += 1;
    }
    return subIndex === sub.length;
  };
  let left = 0;
  let right = removable.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const string = [...s];

    for (let index = 0; index <= mid; index++) {
      string[removable[index]] = '';
    }

    isSubsequence(string.join(''), p) ? (left = mid + 1) : (right = mid - 1);
  }
  return left;
};
