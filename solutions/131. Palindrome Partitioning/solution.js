/**
 * @param {string} s
 * @return {string[][]}
 */
const partition = function (s) {
  const n = s.length;
  const result = [];
  const isPalindrome = str => {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
      if (str[left] !== str[right]) return false;
      left += 1;
      right -= 1;
    }
    return true;
  };
  const backtrackingSubstr = (start, substrs) => {
    if (start === n) {
      result.push(substrs);
      return;
    }
    let current = '';

    for (let index = start; index < n; index++) {
      current += s[index];

      if (!isPalindrome(current)) continue;
      substrs.push(current);
      backtrackingSubstr(index + 1, [...substrs]);
      substrs.pop();
    }
  };

  backtrackingSubstr(0, []);
  return result;
};
