/**
 * @param {number} n
 * @return {number}
 */
const nextBeautifulNumber = function (n) {
  let current = n + 1;

  const isBalanced = num => {
    const counts = new Array(10).fill(0);

    while (num) {
      const digit = num % 10;

      if (!digit) return false;

      counts[digit] += 1;
      num = Math.floor(num / 10);
    }

    for (let index = 1; index < 10; index++) {
      if (counts[index] && counts[index] !== index) return false;
    }

    return true;
  };

  while (!isBalanced(current)) {
    current += 1;
  }

  return current;
};
