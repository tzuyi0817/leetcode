/**
 * @param {string} answerKey
 * @param {number} k
 * @return {number}
 */
const maxConsecutiveAnswers = function (answerKey, k) {
  const maxConsecutive = key => {
    let left = 0;
    let result = 0;
    let remain = k;

    for (let index = 0; index < answerKey.length; index++) {
      if (answerKey[index] !== key) remain -= 1;

      while (remain < 0) {
        if (answerKey[left] !== key) remain += 1;
        left += 1;
      }
      result = Math.max(index - left + 1, result);
    }
    return result;
  };
  return Math.max(maxConsecutive('T'), maxConsecutive('F'));
};
