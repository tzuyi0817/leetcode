/**
 * @param {number[]} apples
 * @param {number[]} days
 * @return {number}
 */
const eatenApples = function (apples, days) {
  const applesTime = Array.from({ length: 4 * 10 ** 4 + 1 }).fill(0);
  let result = 0;
  let currentTime = Number.MAX_SAFE_INTEGER;
  let last = apples.length;

  for (let index = 0; index <= last; index++) {
    const count = apples[index];

    currentTime = Math.max(index, currentTime);
    if (count) {
      const rottenTime = index + days[index] - 1;

      applesTime[rottenTime] += count;
      currentTime = Math.min(currentTime, rottenTime);
      last = Math.max(last, rottenTime);
    }
    while (!applesTime[currentTime] && currentTime < last) currentTime += 1;
    if (!applesTime[currentTime]) continue;
    result += 1;
    applesTime[currentTime] -= 1;
  }
  return result;
};
