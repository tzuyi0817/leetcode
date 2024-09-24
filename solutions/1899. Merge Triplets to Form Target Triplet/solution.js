/**
 * @param {number[][]} triplets
 * @param {number[]} target
 * @return {boolean}
 */
const mergeTriplets = function (triplets, target) {
  const [targetA, targetB, targetC] = target;
  const result = triplets.reduce(
    (triplet, [a, b, c]) => {
      if (a > targetA || b > targetB || c > targetC) return triplet;
      const [currantA, currentB, currentC] = triplet;

      return [Math.max(a, currantA), Math.max(b, currentB), Math.max(c, currentC)];
    },
    [0, 0, 0],
  );

  return result.join('') === target.join('');
};
