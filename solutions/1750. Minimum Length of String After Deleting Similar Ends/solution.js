/**
 * @param {string} s
 * @return {number}
 */
const minimumLength = function (s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    const start = { left, right };

    while (left < right && s[left] === s[left + 1]) left += 1;
    while (right > left && s[right] === s[right - 1]) right -= 1;

    if (s[left] !== s[right]) return start.right - start.left + 1;
    left += 1;
    right -= 1;
  }
  return left === right ? 1 : 0;
};
