/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const checkIfCanBreak = function (s1, s2) {
  const permutationS1 = s1.split('').toSorted();
  const permutationS2 = s2.split('').toSorted();

  const isCanBreak = (s1, s2) => {
    for (const [index, element] of s1.entries()) {
      if (element >= s2[index]) continue;
      return false;
    }
    return true;
  };

  return isCanBreak(permutationS1, permutationS2) || isCanBreak(permutationS2, permutationS1);
};
