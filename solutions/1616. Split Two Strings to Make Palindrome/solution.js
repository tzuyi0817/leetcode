/**
 * @param {string} a
 * @param {string} b
 * @return {boolean}
 */
var checkPalindromeFormation = function(a, b) {
    const checkPalindrome = (a, b) => {
        let left = 0;
        let right = b.length - 1;

        while (left < right && a[left] === b[right]) {
            left += 1;
            right -= 1;
        }
        return isPalindrome(a, left, right) || isPalindrome(b, left, right);
    };
    const isPalindrome = (str, left, right) => {
        while (left < right && str[left] === str[right]) {
            left += 1;
            right -= 1;
        }
        return left >= right;
    };

    return checkPalindrome(a, b) || checkPalindrome(b, a);
};
