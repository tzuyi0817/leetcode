/**
 * @param {string} s
 * @return {number}
 */
const maxProduct = function (s) {
  const sub1 = [];
  const sub2 = [];
  const size = s.length;
  let result = 0;

  findMaxProduct();
  return result;

  function findMaxProduct(index = 0) {
    if (index >= size) {
      if (isPalindromic(sub1) && isPalindromic(sub2)) {
        result = Math.max(sub1.length * sub2.length, result);
      }
      return;
    }
    const char = s[index];

    sub1.push(char);
    findMaxProduct(index + 1);
    sub1.pop();
    sub2.push(char);
    findMaxProduct(index + 1);
    sub2.pop();
    findMaxProduct(index + 1);
  }
  function isPalindromic(sub) {
    if (!sub.length) return false;
    let left = 0;
    let right = sub.length - 1;

    while (left < right) {
      if (sub[left++] !== sub[right--]) return false;
    }
    return true;
  }
};
