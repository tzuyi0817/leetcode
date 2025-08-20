/**
 * @param {number[]} sums
 * @return {number[]}
 */
const recoverArray = function (sums) {
  sums.sort((a, b) => a - b);

  const recover = subset => {
    if (subset.length === 1) return [];

    const countMap = new Map();

    for (const sum of subset) {
      const count = countMap.get(sum) ?? 0;

      countMap.set(sum, count + 1);
    }

    const num = subset[1] - subset[0];
    const includeNumSubset = [];
    const excludeNumSubset = [];
    let includeNum = false;

    for (const sum of subset) {
      const count = countMap.get(sum) ?? 0;

      if (!count) continue;
      const sumSub = sum + num;

      countMap.set(sum, count - 1);
      excludeNumSubset.push(sum);

      if (countMap.has(sumSub)) {
        countMap.set(sumSub, countMap.get(sumSub) - 1);
      }

      includeNumSubset.push(sumSub);

      if (sumSub === 0) {
        includeNum = true;
      }
    }

    const recovered = recover(includeNum ? includeNumSubset : excludeNumSubset);

    recovered.push(includeNum ? -num : num);

    return recovered;
  };

  return recover(sums);
};
