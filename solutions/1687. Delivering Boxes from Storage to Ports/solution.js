/**
 * @param {number[][]} boxes
 * @param {number} maxBoxes
 * @param {number} maxWeight
 * @return {number}
 */
const boxDelivering = function (boxes, maxBoxes, maxWeight) {
  const n = boxes.length;
  const dp = Array.from({ length: n + 1 }, () => 0);
  let left = 0;
  let diffPort = 0;

  for (let index = 0; index < n; index++) {
    const [port, weight] = boxes[index];

    maxBoxes -= 1;
    maxWeight -= weight;

    if (index > 0 && port !== boxes[index - 1][0]) {
      diffPort += 1;
    }

    while (maxBoxes < 0 || maxWeight < 0 || (left < index && dp[left + 1] === dp[left])) {
      const [leftPort, leftWeight] = boxes[left];

      maxBoxes += 1;
      maxWeight += leftWeight;
      left += 1;

      if (leftPort !== boxes[left][0]) {
        diffPort -= 1;
      }
    }

    dp[index + 1] = diffPort + 2 + dp[left];
  }

  return dp[n];
};
