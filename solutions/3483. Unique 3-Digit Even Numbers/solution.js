/**
 * @param {number[]} digits
 * @return {number}
 */
const totalNumbers = function (digits) {
  const counts = Array.from({ length: 10 }, () => 0);
  const evenNumSet = new Set();

  for (const num of digits) {
    counts[num] += 1;
  }

  const backtracking = (count, current) => {
    if (count === 3) {
      evenNumSet.add(current);

      return;
    }

    const start = count === 2 ? 1 : 0;
    const gap = count ? 1 : 2;

    for (let num = start; num <= 9; num += gap) {
      if (!counts[num]) continue;

      const nextCurrent = num * 10 ** count + current;

      counts[num] -= 1;
      backtracking(count + 1, nextCurrent);
      counts[num] += 1;
    }
  };

  backtracking(0, 0);

  return evenNumSet.size;
};
