/**
 * @param {number[][]} cuboids
 * @return {number}
 */
const maxHeight = function (cuboids) {
  const n = cuboids.length;
  const dp = Array.from({ length: n }, () => new Array(n + 1).fill(-1));

  for (const cuboid of cuboids) {
    cuboid.sort((a, b) => a - b);
  }

  cuboids.sort((a, b) => {
    const [widthA, lengthA, heightA] = a;
    const [widthB, lengthB, heightB] = b;

    return widthB - widthA || lengthB - lengthA || heightB - heightA;
  });

  const stackCuboid = (index, prev) => {
    if (index >= n) return 0;
    if (dp[index][prev + 1] !== -1) return dp[index][prev + 1];
    const [width, length, height] = cuboids[index];
    const prevCuboid = cuboids[prev];
    let result = stackCuboid(index + 1, prev);

    if (prevCuboid) {
      const [prevWidth, prevLength, prevHeight] = prevCuboid;

      if (width <= prevWidth && length <= prevLength && height <= prevHeight) {
        const stackHeight = stackCuboid(index + 1, index);

        result = Math.max(height + stackHeight, result);
      }
    } else {
      const stackHeight = stackCuboid(index + 1, index);

      result = Math.max(height + stackHeight, result);
    }

    dp[index][prev + 1] = result;

    return result;
  };

  return stackCuboid(0, -1);
};
