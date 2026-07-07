/**
 * @param {number} n
 * @param {number} x
 * @param {number} y
 * @return {number[]}
 */
const countOfPairs = function (n, x, y) {
  if (x > y) {
    return countOfPairs(n, y, x);
  }

  const result = Array.from({ length: n }, () => 0);
  const leftDis = x - 1;
  const rightDis = n - y;
  const ringDis = y - x + 1;

  combineVectors(result, bothInRing(n, ringDis));
  combineVectors(result, bothInSameLine(n, leftDis));
  combineVectors(result, bothInSameLine(n, rightDis));
  combineVectors(result, lineToRing(n, leftDis, ringDis));
  combineVectors(result, lineToRing(n, rightDis, ringDis));
  combineVectors(result, lineToLine(n, x, y, leftDis, rightDis));

  return result.map(val => val * 2);
};

function bothInRing(n, ringDis) {
  const result = Array.from({ length: n }, () => 0);
  const center = Math.floor((ringDis - 1) / 2);

  for (let k = 1; k <= center; k++) {
    result[k - 1] += ringDis;
  }

  if (ringDis % 2 === 0) {
    const halfRing = ringDis / 2;

    result[halfRing - 1] += halfRing;
  }

  return result;
}

function bothInSameLine(n, dis) {
  const result = Array.from({ length: n }, () => 0);

  for (let k = 1; k <= dis; k++) {
    result[k - 1] += dis - k;
  }

  return result;
}

function lineToRing(n, dis, ringDis) {
  const result = Array.from({ length: n }, () => 0);
  const halfRing = Math.floor(ringDis / 2);

  for (let k = 1; k <= dis + ringDis; k++) {
    const maxRingDis = Math.min(k - 1, halfRing);
    const minRingDis = Math.max(0, k - dis);

    if (minRingDis > maxRingDis) continue;

    result[k - 1] += (maxRingDis - minRingDis + 1) * 2;

    if (minRingDis === 0) {
      result[k - 1] -= 1;
    }

    if (maxRingDis * 2 === ringDis) {
      result[k - 1] -= 1;
    }
  }

  return result;
}

function lineToLine(n, x, y, leftDis, ringDis) {
  const result = Array.from({ length: n }, () => 0);
  const hasBridge = x === y ? 0 : 1;

  for (let k = 1; k <= leftDis + ringDis + 2; k++) {
    const maxLeftDis = Math.min(leftDis, k - 1 - hasBridge);
    const minLeftDis = Math.max(1, k - ringDis - hasBridge);

    if (minLeftDis <= maxLeftDis) {
      result[k - 1] += maxLeftDis - minLeftDis + 1;
    }
  }

  return result;
}

function combineVectors(a, b) {
  const n = a.length;

  for (let index = 0; index < n; index++) {
    a[index] += b[index];
  }
}
