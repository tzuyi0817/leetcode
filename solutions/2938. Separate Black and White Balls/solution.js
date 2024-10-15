/**
 * @param {string} s
 * @return {number}
 */
const minimumSteps = function (s) {
  const BLACK_BALL = '1';
  let blackBalls = 0;
  let result = 0;

  for (const ball of s) {
    if (ball === BLACK_BALL) {
      blackBalls += 1;
    } else {
      result += blackBalls;
    }
  }
  return result;
};
